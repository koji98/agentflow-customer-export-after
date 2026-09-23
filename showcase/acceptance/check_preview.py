#!/usr/bin/env python3
"""Run the original export gate, then independently check preview API semantics."""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import selectors
import shutil
import subprocess
import sys
from urllib.parse import urlencode
from urllib.request import urlopen

DIRECTORY = Path(__file__).resolve().parent
ORIGINAL = DIRECTORY / 'check_export.py'

def main():
    workspace = Path.cwd()
    expected_hash = (DIRECTORY / 'preview-contract.sha256').read_text().strip()
    if hashlib.sha256((workspace / 'EXPORT_PREVIEW.md').read_bytes()).hexdigest() != expected_hash:
        raise AssertionError('The preview contract was modified')
    original = subprocess.run([sys.executable, str(ORIGINAL), '--repo', str(workspace)], text=True, capture_output=True)
    print(original.stdout, end='')
    if original.stderr:
        print(original.stderr, file=sys.stderr, end='')
    spec = importlib.util.spec_from_file_location('original_acceptance', ORIGINAL)
    oracle = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(oracle)
    customers = json.loads((oracle.ROOT / 'customers.json').read_text())
    cases = [
        ('all matching customers', {}),
        ('active customers from page two', {'status': 'active', 'page': '2', 'pageSize': '7'}),
        ('combined filters descending', {'status': 'active', 'segment': 'growth', 'sort': 'id_desc'}),
        ('search with commas and line breaks', {'q': 'C001'}),
        ('no results', {'q': 'does-not-exist-xyz'})
    ]
    process = subprocess.Popen([shutil.which('node'), 'src/server.mjs'], cwd=workspace,
                               env={**os.environ, 'PORT': '0'}, text=True,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    results = []
    try:
        selector = selectors.DefaultSelector()
        selector.register(process.stdout, selectors.EVENT_READ)
        if not selector.select(timeout=12):
            raise RuntimeError('Preview server was not ready within 12 seconds')
        line = process.stdout.readline()
        selector.close()
        match = re.search(r'http://127\.0\.0\.1:\d+', line)
        if not match:
            raise RuntimeError('Server did not report its loopback URL')
        for name, params in cases:
            try:
                expected = oracle.expected_customers(customers, params)
                with urlopen(match.group(0) + '/api/export-preview?' + urlencode(params), timeout=5) as response:
                    if 'application/json' not in response.headers.get('Content-Type', ''):
                        raise AssertionError('Preview response must be JSON')
                    actual = json.load(response)
                if actual.get('total') != len(expected):
                    raise AssertionError('Preview total does not match all filtered records')
                if actual.get('columns') != oracle.COLUMNS:
                    raise AssertionError('Preview columns do not match the CSV contract')
                if actual.get('sample') != expected[:5]:
                    raise AssertionError('Preview sample does not match the first five filtered/sorted records')
                results.append({'case': name, 'passed': True})
            except Exception as error:
                results.append({'case': name, 'passed': False, 'failure': str(error)})
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    passed = original.returncode == 0 and all(case['passed'] for case in results)
    print(json.dumps({'passed': passed, 'preview_checks': results}, indent=2))
    return 0 if passed else 1

if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as error:
        print(json.dumps({'passed': False, 'error': str(error)}))
        sys.exit(2)
