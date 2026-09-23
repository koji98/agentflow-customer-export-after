import { spawnSync } from 'node:child_process';
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { userInfo } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(root, 'credential-config.json'), 'utf8'));
const toolName = process.argv[2];
const tool = config.tools[toolName];
if (!tool) {
  console.error(`Unknown managed tool: ${toolName}`);
  process.exit(127);
}

function envSegment(value) {
  return String(value).toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function credentialEnvName(scope, key) {
  return `AGENTFLOW_CREDENTIAL_${envSegment(scope)}_${envSegment(key)}`;
}

function toolConfigEnvName(toolName, key) {
  return `AGENTFLOW_TOOL_${envSegment(toolName)}_${envSegment(key)}`;
}

function secretLooking(value) {
  return /(^|[_-])(token|secret|password|passwd|api[_-]?key|credential|authorization|bearer)([_-]|$)/i.test(String(value));
}

function redactArgv(argv) {
  const redacted = [];
  let redactNext = false;
  for (const arg of argv) {
    if (redactNext) {
      redacted.push('<redacted>');
      redactNext = false;
      continue;
    }
    const [key] = String(arg).split('=', 1);
    if (secretLooking(key)) {
      redacted.push(String(arg).includes('=') ? `${key}=<redacted>` : String(arg));
      redactNext = !String(arg).includes('=');
      continue;
    }
    redacted.push(arg);
  }
  return redacted;
}

function appendInvocation(record) {
  if (!config.tool_invocations_path) {
    return;
  }
  mkdirSync(dirname(config.tool_invocations_path), { recursive: true });
  appendFileSync(config.tool_invocations_path, `${JSON.stringify(record)}\n`, 'utf8');
}

function nextInvocationPrefix() {
  const dir = dirname(config.tool_invocations_path);
  mkdirSync(dir, { recursive: true });
  let count = 0;
  try {
    const contents = readFileSync(config.tool_invocations_path, 'utf8');
    count = contents.split(/\r?\n/u).filter((line) => line.trim().length > 0).length;
  } catch {}
  return join(dir, String(count + 1).padStart(4, '0'));
}

const swiftGetGenericPasswordScript = `
import Darwin
import Foundation
import Security

let service = CommandLine.arguments[1]
let account = CommandLine.arguments[2]

let query: [String: Any] = [
  kSecClass as String: kSecClassGenericPassword,
  kSecAttrService as String: service,
  kSecAttrAccount as String: account,
  kSecReturnData as String: true,
  kSecMatchLimit as String: kSecMatchLimitOne
]

var item: CFTypeRef?
let status = SecItemCopyMatching(query as CFDictionary, &item)
if status == errSecItemNotFound {
  exit(44)
}
if status != errSecSuccess {
  FileHandle.standardError.write("SecItemCopyMatching failed with status \\(status)\\n".data(using: .utf8)!)
  exit(1)
}
if let data = item as? Data {
  FileHandle.standardOutput.write(data)
}
`;

function readIndex() {
  try {
    return JSON.parse(readFileSync(config.credential_index_path, 'utf8'));
  } catch {
    return { version: '1', scopes: {} };
  }
}

function readSecret(scope, key) {
  if (process.platform !== 'darwin') {
    return undefined;
  }
  const account = config.keychain_account || userInfo().username;
  const result = spawnSync('swift', [
    '-e',
    swiftGetGenericPasswordScript,
    `agentflow.${scope}.${key}`,
    account
  ], { encoding: 'utf8' });
  if (result.status !== 0) {
    return undefined;
  }
  return result.stdout.length > 0 ? result.stdout : undefined;
}

function resolveScope(index, scope, spec) {
  const values = {};
  for (const [key, field] of Object.entries(spec.fields || {})) {
    let value = field.secret
      ? readSecret(scope, key)
      : index.scopes?.[scope]?.fields?.[key]?.value;
    if ((!value || value.length === 0) && field.default !== undefined) {
      value = field.default;
    }
    if ((!value || value.length === 0) && field.required) {
      throw new Error(`Missing required credential "${scope}.${key}".`);
    }
    if (value && value.length > 0) {
      values[key] = value;
    }
  }
  return values;
}

const childEnv = { ...process.env };
for (const key of Object.keys(childEnv)) {
  if (key.startsWith('AGENTFLOW_CREDENTIAL_') || (key.startsWith('AGENTFLOW_TOOL_') && key !== 'AGENTFLOW_TOOL_STATE')) {
    delete childEnv[key];
  }
}
const passthroughArgs = process.argv.slice(3);
const wantsHelp = passthroughArgs.includes('--help') || passthroughArgs.includes('-h');

if (wantsHelp) {
  for (const [key, value] of Object.entries(tool.config || {})) {
    childEnv[toolConfigEnvName(toolName, key)] = String(value);
  }
  const helpArgs = passthroughArgs;
  const startedAt = Date.now();
  const helpLogBase = nextInvocationPrefix();
  writeFileSync(`${helpLogBase}-input.json`, `${JSON.stringify({ kind: 'plugin_tool', tool: toolName, argv: redactArgv(helpArgs), cwd: process.cwd(), help: true }, null, 2)}\n`, 'utf8');
  const result = spawnSync(tool.executable_path, helpArgs, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: childEnv
  });
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  process.stdout.write('\nRuntime configured defaults:\n');
  const configEntries = Object.entries(tool.config || {});
  if (configEntries.length === 0) {
    process.stdout.write('  (none)\n');
  } else {
    for (const [key, value] of configEntries) {
      const rendered = secretLooking(key) ? '<redacted>' : String(value);
      process.stdout.write(`  ${key}: ${rendered}\n`);
    }
  }
  appendInvocation({
    ts: new Date().toISOString(),
    run_id: config.run_id,
    graph_id: config.graph_id,
    agent_id: config.agent_id,
    execution_id: config.execution_id,
    node_id: config.node_id,
    compiled_id: config.compiled_id,
    kind: 'plugin_tool',
    tool: toolName,
    source: tool.source,
    argv: redactArgv(helpArgs),
    cwd: process.cwd(),
    exit_code: result.status ?? (result.error ? 127 : 1),
    duration_ms: Date.now() - startedAt,
    input_path: `${helpLogBase}-input.json`,
    output_path: `${helpLogBase}-output.json`,
    redaction: 'secret-looking argv values redacted; credential env omitted for help'
  });
  writeFileSync(`${helpLogBase}-output.json`, `${JSON.stringify({ exit_code: result.status ?? (result.error ? 127 : 1), stdout: result.stdout || '', stderr: result.stderr || '', error: result.error ? result.error.message : undefined }, null, 2)}\n`, 'utf8');
  if (result.error) {
    console.error(result.error.message);
    process.exit(127);
  }
  process.exit(result.status ?? 0);
}

try {
  const index = readIndex();
  for (const [key, value] of Object.entries(tool.config || {})) {
    childEnv[toolConfigEnvName(toolName, key)] = String(value);
  }
  for (const scope of tool.credentials || []) {
    const spec = config.credential_specs[scope];
    if (!spec) {
      throw new Error(`Tool ${toolName} requires unavailable credential scope "${scope}".`);
    }
    const values = resolveScope(index, scope, spec);
    for (const [key, value] of Object.entries(values)) {
      childEnv[credentialEnvName(scope, key)] = value;
    }
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const failureLogBase = nextInvocationPrefix();
  const failureOutputPath = `${failureLogBase}-output.json`;
  writeFileSync(`${failureLogBase}-input.json`, `${JSON.stringify({ kind: 'plugin_tool', tool: toolName, argv: redactArgv(passthroughArgs), cwd: process.cwd(), credential_resolution: true }, null, 2)}\n`, 'utf8');
  writeFileSync(failureOutputPath, `${JSON.stringify({ exit_code: 1, stdout: '', stderr: `${errorMessage}\n`, error: errorMessage, credential_resolution_failed: true }, null, 2)}\n`, 'utf8');
  appendInvocation({
    ts: new Date().toISOString(),
    run_id: config.run_id,
    graph_id: config.graph_id,
    agent_id: config.agent_id,
    execution_id: config.execution_id,
    node_id: config.node_id,
    compiled_id: config.compiled_id,
    kind: 'plugin_tool',
    tool: toolName,
    source: tool.source,
    argv: redactArgv(passthroughArgs),
    cwd: process.cwd(),
    exit_code: 1,
    duration_ms: 0,
    input_path: `${failureLogBase}-input.json`,
    output_path: failureOutputPath,
    redaction: 'secret-looking argv values redacted; credential env omitted'
  });
  console.error(errorMessage);
  process.exit(1);
}

const invocationArgs = passthroughArgs;
const startedAt = Date.now();
const logBase = nextInvocationPrefix();
writeFileSync(`${logBase}-input.json`, `${JSON.stringify({ kind: 'plugin_tool', tool: toolName, argv: redactArgv(invocationArgs), cwd: process.cwd() }, null, 2)}\n`, 'utf8');
const result = spawnSync(tool.executable_path, invocationArgs, {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  env: childEnv
});

if (result.stdout) {
  process.stdout.write(result.stdout);
}
if (result.stderr) {
  process.stderr.write(result.stderr);
}
const outputPath = `${logBase}-output.json`;
writeFileSync(outputPath, `${JSON.stringify({ exit_code: result.status ?? (result.error ? 127 : 1), stdout: result.stdout || '', stderr: result.stderr || '', error: result.error ? result.error.message : undefined }, null, 2)}\n`, 'utf8');
appendInvocation({
  ts: new Date().toISOString(),
  run_id: config.run_id,
  graph_id: config.graph_id,
  agent_id: config.agent_id,
  execution_id: config.execution_id,
  node_id: config.node_id,
  compiled_id: config.compiled_id,
  kind: 'plugin_tool',
  tool: toolName,
  source: tool.source,
  argv: redactArgv(invocationArgs),
  cwd: process.cwd(),
  exit_code: result.status ?? (result.error ? 127 : 1),
  duration_ms: Date.now() - startedAt,
  input_path: `${logBase}-input.json`,
  output_path: outputPath,
  redaction: 'secret-looking argv values redacted; credential env omitted'
});

if (result.error) {
  console.error(result.error.message);
  process.exit(127);
}

if (result.signal) {
  process.kill(process.pid, result.signal);
}

process.exit(result.status ?? 0);
