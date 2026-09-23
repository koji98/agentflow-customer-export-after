import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const doctor = fileURLToPath(new URL('./doctor.mjs', import.meta.url));

function environment(t, commands = {}) {
  const bin = mkdtempSync(join(tmpdir(), 'showcase-doctor-'));
  t.after(() => rmSync(bin, { recursive: true, force: true }));
  for (const [name, source] of Object.entries(commands)) {
    writeFileSync(join(bin, name), `#!${process.execPath}\n${source}\n`, { mode: 0o755 });
  }
  return bin;
}

function run(bin, args = []) {
  return spawnSync(process.execPath, [doctor, ...args], {
    env: { ...process.env, PATH: bin }, encoding: 'utf8', timeout: 20000
  });
}

const git = 'console.log("git version 2.50.0")';
const python = 'console.log("3.12.12")';

test('dashboard setup succeeds without requiring either agent CLI', t => {
  const result = run(environment(t, { git, python3: python }));
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /PASS.*localhost/i);
  assert.doesNotMatch(result.stdout, /FAIL/);
});

test('missing Git and Python produce actionable failures', t => {
  const result = run(environment(t));
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL.*Git/);
  assert.match(result.stdout, /FAIL.*Python/);
  assert.match(result.stdout, /python3/);
});

test('an older Python version fails even when the executable exists', t => {
  const result = run(environment(t, { git, python3: 'console.log("3.8.20")' }));
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL.*Python.*3\.10/);
});

test('workflow setup rejects signed-out Codex without echoing auth output', t => {
  const codex = 'if (process.argv.includes("--version")) console.log("codex-cli 0.144.5"); else { console.error("PRIVATE_AUTH_SENTINEL"); process.exit(1); }';
  const result = run(environment(t, { git, python3: python, codex, agentflow: 'console.log("Agentflow help")' }), ['--workflow']);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /FAIL.*Codex login.*codex login/);
  assert.doesNotMatch(result.stdout + result.stderr, /PRIVATE_AUTH_SENTINEL/);
});
