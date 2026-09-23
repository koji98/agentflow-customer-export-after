#!/usr/bin/env python3
"""Independent, fixture-based HTTP acceptance check for the customer export."""
import argparse
import csv
import hashlib
import io
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

ROOT = Path(__file__).resolve().parent
COLUMNS = ['id', 'name', 'company', 'email', 'status', 'segment', 'notes']
CASES = [
    ('all 137 customers', {}),
    ('page two does not limit export', {'page': '2', 'pageSize': '7'}),
    ('active customers across pages', {'status': 'active', 'page': '2'}),
    ('active growth descending', {'status': 'active', 'segment': 'growth', 'sort': 'id_desc', 'pageSize': '5'}),
    ('combined case-insensitive search', {'q': 'ACME', 'status': 'active', 'segment': 'starter'}),
    ('quoted field and LF', {'q': 'C001'}),
    ('Unicode and comma', {'q': 'C002'}),
    ('embedded quotes and CRLF', {'q': 'C003'}),
    ('non-Latin text', {'q': 'C004'}),
    ('ordinary record and empty note', {'q': 'C010'}),
    ('no matches produces header only', {'q': 'does-not-exist-xyz'}),
    ('inactive enterprise descending', {'status': 'inactive', 'segment': 'enterprise', 'sort': 'id_desc'})
]

def expected_customers(customers, params):
    search = params.get('q', '').strip().lower()
    matched = [row for row in customers if
               (not search or search in ' '.join(row[key] for key in COLUMNS[:4]).lower())
               and (params.get('status', 'all') == 'all' or row['status'] == params['status'])
               and (params.get('segment', 'all') == 'all' or row['segment'] == params['segment'])]
    return sorted(matched, key=lambda row: row['id'], reverse=params.get('sort') == 'id_desc')

def assert_export(raw, expected):
    parsed = list(csv.reader(io.StringIO(raw, newline=''), strict=True))
    if not parsed or parsed[0] != COLUMNS:
        raise AssertionError('CSV header differs from the seven-field contract')
    expected_rows = [[row[column] for column in COLUMNS] for row in expected]
    if parsed[1:] != expected_rows:
        if len(parsed) - 1 != len(expected_rows):
            raise AssertionError(f'Expected {len(expected_rows)} customer records; parsed {len(parsed) - 1}')
        for index, (actual, wanted) in enumerate(zip(parsed[1:], expected_rows)):
            if actual != wanted:
                raise AssertionError(f'Record {index + 1} differs: expected {len(wanted)} exact fields; got {len(actual)} fields')

def verify_protected_files(repo):
    manifest = json.loads((ROOT / 'protected-files.json').read_text())
    for relative, expected_hash in manifest.items():
        content = (repo / relative).read_bytes()
        if hashlib.sha256(content).hexdigest() != expected_hash:
            raise AssertionError(f'Protected file changed: {relative}')

def run(args):
    repo = args.repo.resolve()
    verify_protected_files(repo)
    customers = json.loads((ROOT / 'customers.json').read_text())
    node = shutil.which('node')
    if not node:
        raise RuntimeError('Node must be on PATH')
    process = subprocess.Popen([node, 'src/server.mjs'], cwd=repo,
                               env={**os.environ, 'PORT': '0'}, stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE, text=True)
    results = []
    exports = {}
    try:
        selector = selectors.DefaultSelector()
        selector.register(process.stdout, selectors.EVENT_READ)
        if not selector.select(timeout=12):
            raise RuntimeError('Server did not become ready within 12 seconds')
        line = process.stdout.readline()
        selector.close()
        match = re.search(r'http://127\.0\.0\.1:(\d+)', line)
        if not match:
            raise RuntimeError(f'Server did not provide a local URL: {line.strip()}')
        base = match.group(0)
        for name, params in CASES:
            expected = expected_customers(customers, params)
            url = base + '/api/export?' + urlencode(params)
            try:
                with urlopen(url, timeout=5) as response:
                    if 'text/csv' not in response.headers.get('Content-Type', ''):
                        raise AssertionError('Export did not use text/csv')
                    if 'attachment' not in response.headers.get('Content-Disposition', ''):
                        raise AssertionError('Export was not offered as an attachment')
                    raw = response.read().decode('utf-8')
                exports[name] = raw
                assert_export(raw, expected)
                results.append(dict(case=name, passed=True, expected_records=len(expected)))
            except (AssertionError, csv.Error) as error:
                results.append(dict(case=name, passed=False, expected_records=len(expected), failure=str(error)))
        for name, params in CASES:
            expected = expected_customers(customers, params)
            page, size = int(params.get('page', '1')), int(params.get('pageSize', '25'))
            with urlopen(base + '/api/customers?' + urlencode(params), timeout=5) as response:
                listing = json.load(response)
            expected_page = expected[(page - 1) * size:page * size]
            passed = listing['total'] == len(expected) and listing['rows'] == expected_page
            results.append(dict(case='listing: ' + name, passed=passed, expected_records=len(expected_page),
                                **({} if passed else {'failure': 'Listing/filter/pagination changed'})))
        verify_protected_files(repo)
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    report = dict(passed=all(item['passed'] for item in results), checks=len(results),
                  passed_checks=sum(item['passed'] for item in results), repo=str(repo), results=results)
    if args.output:
        args.output.mkdir(parents=True, exist_ok=True)
        (args.output / 'acceptance.json').write_text(json.dumps(report, indent=2) + '\n')
        for name, raw in exports.items():
            filename = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-') + '.csv'
            with (args.output / filename).open('w', newline='') as stream:
                stream.write(raw)
    print(json.dumps(report, indent=2))
    return 0 if report['passed'] else 1

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, default=Path.cwd())
    parser.add_argument('--output', type=Path)
    try:
        sys.exit(run(parser.parse_args()))
    except Exception as error:
        print(json.dumps({'passed': False, 'error': str(error)}))
        sys.exit(2)
