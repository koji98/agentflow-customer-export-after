# Agentflow customer export — before

Start here to run Agentflow against an intentionally broken customer dashboard. The workflow graph, task contracts, and independent acceptance checks are committed. For the completed example and real scorecards, open the [after repository](https://github.com/koji98/agentflow-customer-export-after).

**Two paths:** run the dashboard with Node/Python only, or follow the additional Agentflow setup below to execute the AI workflow. Reading the saved results on GitHub needs no installation.

## Prerequisites

These commands use bash/zsh on macOS or Linux. On Windows, use WSL2; native PowerShell setup is not covered.

| Tool | Version / purpose | Install help |
| --- | --- | --- |
| Git | Clone the repositories | [Git downloads](https://git-scm.com/downloads) |
| Node.js + npm | Node **24.18.0**, pinned in `.nvmrc`; npm is bundled | [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating), then use the commands below |
| Python | **3.10+**, available as `python3`, for acceptance checks | [Python downloads](https://www.python.org/downloads/) |

The app has no npm or pip dependencies, build step, database, Docker requirement, or `.env` file. `npm ci` verifies the committed package metadata and Node requirement. `.npmrc` rejects unsupported Node versions; Node 24.x is supported, with 24.18.0 used for the recorded run. Python 3.12 was used for that run.

## 1. Clone and start the dashboard

Install the prerequisites above first. Then run:

```sh
git clone https://github.com/koji98/agentflow-customer-export-before.git
cd agentflow-customer-export-before
nvm install
nvm use
npm ci
npm run doctor
npm start
```

The doctor should end with `Environment checks passed`. The server should print `Northstar ready at http://127.0.0.1:4317`. Open that URL. Press Ctrl+C to stop the server; use another terminal for the following commands, running `nvm use` there too.

There are 137 synthetic customers. Select Active and page two: there are 103 matching customers, but the broken CSV exports only one page. Special characters expose additional CSV defects. The requested preview is absent.

## 2. Confirm the intended starting state

From this repository root:

```sh
npm test
npm run check:acceptance
```

| Command | Expected result before Agentflow |
| --- | --- |
| `npm run doctor` | Passes: the environment works |
| `npm test` | Six existing product tests pass |
| `npm run check:acceptance` | **Exits 1 intentionally:** 16 of 29 checks pass; eight export checks and five missing-preview checks fail |

An acceptance failure with those counts is the demo's starting defect. A missing executable, permission error, or failed doctor is an environment issue to resolve first. The five preview cases should report HTTP 404.

## 3. Install Agentflow and Codex for an AI run

Skip this section if you only want to inspect the dashboard. A live run requires internet access and a signed-in Codex account with model access and available quota. The recorded run used **Codex CLI 0.144.5** and Agentflow commit **bf7399955a45ea9e8fe0959c64be7a06649d997f**.

Keep Node 24 active. From the before repo root, clone the public runtime into a separate sibling directory and build its pinned revision:

```sh
git clone https://github.com/koji98/agentflow.git ../agentflow-showcase-runtime
git -C ../agentflow-showcase-runtime checkout --detach bf7399955a45ea9e8fe0959c64be7a06649d997f
(
  cd ../agentflow-showcase-runtime
  npm ci
  npm run build
  npm run setup:link
)
agentflow --help
```

The parentheses return you to the demo directory automatically. Keep the sibling runtime checkout: the linked command points to it. If that directory already exists, use a new sibling directory name consistently rather than overwriting an unrelated checkout. Use the pinned revision for this showcase instead of an unpinned `npm install -g agentflow` package.

Install and sign in to Codex under the same active Node version:

```sh
npm install --global @openai/codex@0.144.5
codex --version
codex login
codex login status
```

Complete the browser sign-in yourself. If already signed in, `codex login status` confirms the existing session. This recipe uses the normal Codex login; no demo `.env` or API key is required. See the [official CLI guide](https://learn.chatgpt.com/docs/codex/cli) and [authentication guide](https://learn.chatgpt.com/docs/auth) for account setup or headless login options. Global npm commands under nvm should not require sudo.

## 4. Check and execute the workflow

From the **before repository root**, with a fresh unchanged application:

```sh
npm run doctor:workflow
npm run workflow:validate
npm run workflow:run
```

The workflow doctor checks CLI availability and stored login status without consuming a model run. Validation must pass before execution. The pinned runtime reports ten warnings about its generated artifact handoffs; those are recorded warnings, not missing environment prerequisites. Resolve any blockers first.

`workflow:run` executes the committed [agentflow.graph.json](agentflow.graph.json) in place and changes this checkout. It runs the implementation, deterministic checks, and two read-only LLM rubric judges. Each required rubric must score at least 0.85, and the deterministic command must pass. Up to three cycles are allowed. Source-based clarity review does not establish rendered UI usability.

The original run took **13m 13s including delivery**. Allow extra time; model output and duration can vary. It uses your Codex access and quota.

Run files normally appear under `.task-runtime/runs/` in this repo. The CLI prints the actual run root (an existing `AGENTFLOW_RUNS_ROOT` environment variable overrides the default). Start with `delivery/01-review-brief.md` inside that run directory, then its scorecard and evidence. After execution:

```sh
npm test
npm run check:acceptance
git diff -- src public test
```

Both test commands should now pass. Use a **new clone in a new directory** for another live run so you keep the previous result intact.

## Setup troubleshooting

| Symptom | Fix |
| --- | --- |
| `nvm: command not found` | Install nvm using the link above, reopen the terminal, then run `nvm install` and `nvm use` in this repo. |
| `EBADENGINE`, or the doctor reports Node 20/22 | Run `nvm use` in this shell. Run it again in each new terminal. |
| `python3` missing or too old | Install Python 3.10+ and verify `python3 --version`. No `pip install` step is needed. |
| `EADDRINUSE` | Another app owns the port. Stop it, or use `PORT=4321 npm start` and open the URL printed by the server. |
| `EPERM` / `EACCES` binding `127.0.0.1` | Use a local terminal or runner that allows localhost servers. The doctor checks this without running a model. |

`npm run test:setup` tests the doctor's missing-tool, old-Python, and signed-out cases. GitHub Actions checks setup and product behavior on Linux and macOS without an AI account or secrets.

Additional workflow fixes:

| Symptom | Fix |
| --- | --- |
| `agentflow` not found | Run `nvm use`, then `npm run setup:link` from the built runtime checkout. |
| `codex` not found after switching Node | Install the pinned Codex package under Node 24; nvm versions have separate global packages. |
| Codex authentication fails | Run `codex login`, complete sign-in, and rerun `npm run doctor:workflow`. A cached login does not prove current quota/model access. |
| npm audit or install-script warnings in the runtime | The pinned runtime currently reports development-tool advisories and optional script warnings; its install, TypeScript build, and CLI validation were tested successfully. These are upstream runtime warnings, not dashboard dependencies. Avoid changing its lockfile just to reproduce this run. |

## Files and provenance

- [Graph](agentflow.graph.json), [authoring rationale](showcase/AUTHORING.md), and [runtime provenance](showcase/PROVENANCE.md).
- [Repair ticket](TICKET.md), [preview contract](EXPORT_PREVIEW.md), and [original application guide](APP_GUIDE.md).
- `showcase/acceptance/`: independent oracle and fixture; `showcase/setup/`: environment doctor and its tests.
- `src/`, `public/`, `data/`, `test/`: the unchanged broken application and its product tests.

The `before-agentflow` tag preserves the original packaged baseline shared with the after repository. Later main-branch commits add setup documentation and tooling; they do not repair the application. CI in this repository deliberately verifies the broken baseline. The [after repository](https://github.com/koji98/agentflow-customer-export-after) retains the scored result and its known browser issue.
