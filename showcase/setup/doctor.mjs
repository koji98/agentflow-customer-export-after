import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:net';

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--workflow')) {
  console.error('Usage: npm run doctor [-- --workflow]');
  process.exit(2);
}

let failures = 0;
function report(name, passed, detail) {
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}: ${detail}`);
  if (!passed) failures += 1;
}

function probe(command, args) {
  return spawnSync(command, args, { encoding: 'utf8', timeout: 10000, maxBuffer: 256 * 1024 });
}

const pinnedNode = readFileSync(new URL('../../.nvmrc', import.meta.url), 'utf8').trim();
report('Node', process.versions.node.split('.')[0] === '24',
  `running ${process.versions.node}; use Node 24.x (recorded ${pinnedNode}). Run nvm install && nvm use.`);

const git = probe('git', ['--version']);
report('Git', git.status === 0, git.status === 0 ? 'available' : 'install Git and put git on PATH.');

const python = probe('python3', ['-c', 'import sys; print(".".join(map(str, sys.version_info[:3])))']);
const pythonVersion = python.stdout?.trim() || '';
const [pythonMajor, pythonMinor] = pythonVersion.split('.').map(Number);
const pythonReady = python.status === 0 && /^\d+\.\d+\.\d+$/.test(pythonVersion) && pythonMajor === 3 && pythonMinor >= 10;
report('Python', pythonReady, pythonReady ? pythonVersion : 'Python 3.10+ is required as python3 on PATH; install Python and reopen the terminal.');

const binding = await new Promise(resolve => {
  const server = createServer();
  server.once('error', error => resolve(error.code || 'listen failed'));
  server.listen(0, '127.0.0.1', () => server.close(() => resolve(null)));
});
report('localhost', binding === null, binding === null ? '127.0.0.1 can accept local test connections' : `${binding}; run from a terminal that permits local HTTP servers.`);

if (args.includes('--workflow')) {
  const agentflow = probe('agentflow', ['--help']);
  report('Agentflow', agentflow.status === 0, agentflow.status === 0 ? 'CLI available; use workflow:validate to check the graph' : 'follow the pinned Agentflow build/link instructions in README.md, then run nvm use in this shell.');
  const codex = probe('codex', ['--version']);
  report('Codex CLI', codex.status === 0, codex.status === 0 ? 'available' : 'install the documented Codex CLI version under the active Node version.');
  if (codex.status === 0) {
    const auth = probe('codex', ['login', 'status']);
    report('Codex login', auth.status === 0, auth.status === 0 ? 'stored authentication is available' : 'run codex login, complete sign-in, then retry.');
  }
}

console.log(failures ? `${failures} setup check(s) failed. Fix these before proceeding.` : 'Environment checks passed. No model run was started.');
process.exitCode = failures ? 1 : 0;
