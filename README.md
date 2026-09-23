# Agentflow customer export — before

A runnable, intentionally broken customer dashboard, with the Agentflow graph and all task inputs committed. This is the starting environment for the showcase. It contains no completed implementation or recorded judge answers.

## Try the dashboard

Requires Node 24 and Python 3. There are no npm dependencies to install.

```sh
npm start
```

Open http://127.0.0.1:4317. The fixture has 137 synthetic customers. Select Active and page two: there are 103 matching customers, but the broken CSV exports only the current page. Commas, quotes, and line breaks expose additional CSV defects. The requested preview is absent.

## Validate the starting state

Run from this repository root:

```sh
npm test
python3 showcase/acceptance/check_preview.py
```

Expected: the six existing product tests pass; the independent checker exits 1, with 16/24 export/listing cases passing and all five preview cases failing. These failures are intentional.

## Run Agentflow

Use an authenticated Codex CLI and the Agentflow CLI described in [runtime provenance](showcase/PROVENANCE.md). Start from a fresh clone so repeated demonstrations have the same baseline.

```sh
agentflow validate --graph agentflow.graph.json --strict
agentflow run --graph agentflow.graph.json --label customer-export-demo
```

The graph uses an inplace workspace: it will edit this checkout. Its managed work loop implements the task, runs a deterministic criterion and two read-only LLM judges in parallel, and evaluates their scorecard. All three criteria are required; each rubric must reach 0.85. Up to three cycles are allowed. The preview rubric reviews source and wording; it does not establish rendered browser usability.

## What is committed

- [Graph](agentflow.graph.json) and [authoring rationale](showcase/AUTHORING.md).
- [Export repair ticket](TICKET.md), [preview contract](EXPORT_PREVIEW.md), and [application guide](APP_GUIDE.md).
- Independent checks and canonical fixture in showcase/acceptance/.
- Broken app in src/, public/, and data/; baseline tests in test/.

The separate `agentflow-customer-export-after` repository preserves the actual first expanded run, its application changes, scores, and trace. Both repositories share the `before-agentflow` commit so the generated result can be compared directly.
