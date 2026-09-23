# Delivery Source

This runtime-authored packet is the evidence source for the AI-curated human delivery files.

## Run

- Run: `2026-09-23t21-58-04-755z-northstar-export-readiness-preview-rehearsal`
- Graph: `northstar-export-readiness`
- Status: `passed`
- Evidence status: `clean`
- Duration: `10m 25s`

## Success Contract

Give Northstar operators a correct customer export and a clear preview of exactly what they will download.

Acceptance criteria:
- The existing CSV export contract and the export preview contract are satisfied.
- The implementation is focused and understandable, and the interface clearly distinguishes previewed samples from the full download.
- The delivery includes actual validation evidence and a reviewable explanation.

Constraints:
- Do not edit data/customers.json, TICKET.md, or AGENTS.md.
- Do not weaken, remove, or skip existing tests.
- Do not edit files outside this repository or change independent acceptance tools.
- Do not add dependencies, call remote services, or include unrelated refactors.
- Do not edit EXPORT_PREVIEW.md or introduce unrelated interface redesign.

## Final Declared Artifacts

| Artifact | Description | Type | Path |
| --- | --- | --- | --- |
| `export_readiness.packet` | Machine-readable final evidence packet. | `application/json` | [packet.json](../nodes/007-finalize-deep-work-fe537ae7d679/executions/001-exec-4ed80f3db0c7ea5a/artifacts/packet.json) |
| `export_readiness.summary` | Review handoff explaining the export repair and preview, changed files, actual validation results, user-visible state text with source references, and remaining limitations. | `text/markdown` | [summary.md](../nodes/007-finalize-deep-work-fe537ae7d679/executions/001-exec-4ed80f3db0c7ea5a/artifacts/summary.md) |
| `export_readiness__managed__pattern_deep_work__completion_gate.completion_scorecard` | Weighted completion scorecard for the latest deep work result. | `application/json` | [scorecard.json](../nodes/006-completion-gate-75e1c6516166/executions/i001-a001-exec-306cb45daffd89af/artifacts/scorecard.json) |
| `export_readiness__managed__pattern_deep_work__generate_validate.work_notes` | Notes and validation evidence from the current deep work result. | `text/markdown` | [work-notes.md](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/work-notes.md) |
| `export_readiness__managed__pattern_deep_work__generate_validate.draft_summary` | Draft content for final artifact summary. | `text/markdown` | [draft-summary.md](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/draft-summary.md) |
| `export_readiness__managed__pattern_deep_work__plan.plan` | Execution plan for satisfying the deep work task from the current state. | `text/markdown` | [plan.md](../nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/artifacts/plan.md) |

## Changed Files

### main

- `EXPORT_PREVIEW.md`
- `public/app.js`
- `public/index.html`
- `public/styles.css`
- `src/customers.mjs`
- `src/export.mjs`
- `src/server.mjs`
- `test/query.test.mjs`
- `test/server.test.mjs`


### Node Change Evidence

- `export_readiness` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__attempt_1): 0 changed file(s). Diff: [patch](../nodes/007-finalize-deep-work-fe537ae7d679/executions/001-exec-4ed80f3db0c7ea5a/workspace-changes/diff.patch); files: [json](../nodes/007-finalize-deep-work-fe537ae7d679/executions/001-exec-4ed80f3db0c7ea5a/workspace-changes/changed-files.json).
- `export_readiness__managed__pattern_deep_work__completion_gate` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__completion_gate__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 0 changed file(s). Diff: [patch](../nodes/006-completion-gate-75e1c6516166/executions/i001-a001-exec-306cb45daffd89af/workspace-changes/diff.patch); files: [json](../nodes/006-completion-gate-75e1c6516166/executions/i001-a001-exec-306cb45daffd89af/workspace-changes/changed-files.json).
- `export_readiness__managed__pattern_deep_work__criterion_01_behavior` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_01_behavior__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 8 changed file(s). Diff: [patch](../nodes/003-completion-criterion-behavior-38af039dce36/executions/i001-a001-exec-1dce0da035259202/workspace-changes/diff.patch); files: [json](../nodes/003-completion-criterion-behavior-38af039dce36/executions/i001-a001-exec-1dce0da035259202/workspace-changes/changed-files.json).
  - `public/app.js` (tracked)
  - `public/index.html` (tracked)
  - `public/styles.css` (tracked)
  - `src/customers.mjs` (tracked)
  - `src/export.mjs` (tracked)
  - `src/server.mjs` (tracked)
  - `test/query.test.mjs` (tracked)
  - `test/server.test.mjs` (tracked)
- `export_readiness__managed__pattern_deep_work__criterion_02_simplicity` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_02_simplicity__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 0 changed file(s). Diff: [patch](../nodes/004-completion-criterion-simplicity-b6a79a212e3f/executions/i001-a001-exec-5f3d8df7e49b2f08/workspace-changes/diff.patch); files: [json](../nodes/004-completion-criterion-simplicity-b6a79a212e3f/executions/i001-a001-exec-5f3d8df7e49b2f08/workspace-changes/changed-files.json).
- `export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__criteria_panel__export_readiness__managed__pattern_deep_work__criterion_03_operator_clarity__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 8 changed file(s). Diff: [patch](../nodes/005-completion-criterion-operator-clarity-02d7462b7481/executions/i001-a001-exec-d3211ef81bbcfd45/workspace-changes/diff.patch); files: [json](../nodes/005-completion-criterion-operator-clarity-02d7462b7481/executions/i001-a001-exec-d3211ef81bbcfd45/workspace-changes/changed-files.json).
  - `public/app.js` (tracked)
  - `public/index.html` (tracked)
  - `public/styles.css` (tracked)
  - `src/customers.mjs` (tracked)
  - `src/export.mjs` (tracked)
  - `src/server.mjs` (tracked)
  - `test/query.test.mjs` (tracked)
  - `test/server.test.mjs` (tracked)
- `export_readiness__managed__pattern_deep_work__generate_validate` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__generate_validate__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 8 changed file(s). Diff: [patch](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/diff.patch); files: [json](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/changed-files.json).
  - `public/app.js` (tracked)
  - `public/index.html` (tracked)
  - `public/styles.css` (tracked)
  - `src/customers.mjs` (tracked)
  - `src/export.mjs` (tracked)
  - `src/server.mjs` (tracked)
  - `test/query.test.mjs` (tracked)
  - `test/server.test.mjs` (tracked)
- `export_readiness__managed__pattern_deep_work__plan` (exec__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__export_readiness__managed__pattern_deep_work__work_loop_body__export_readiness__managed__pattern_deep_work__plan__attempt_1__repeat_scope__export_readiness__managed__pattern_deep_work__workflow__export_readiness__managed__pattern_deep_work__work_loop__iter_1): 0 changed file(s). Diff: [patch](../nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/workspace-changes/diff.patch); files: [json](../nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/workspace-changes/changed-files.json).

## Validation

| Source | Attempt | Result | Command | Summary |
| --- | --- | --- | --- | --- |
| `m1` | [attempt](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8) | `pass` | `node --test test/query.test.mjs test/server.test.mjs` | Focused regression tests passed after implementing shared matching, CSV escaping, and preview API/UI source coverage: 12 tests passed. |
| `m1` | [attempt](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8) | `pass` | `npm test && python3 showcase/acceptance/check_preview.py` | Required combined validation passed: npm test reported 12/12 tests passing; independent checker reported passed=true, 24/24 export/listing checks, and all 5 preview checks passing. |

| Node | Attempt | Result | Evidence | Summary |
| --- | --- | --- | --- | --- |
| `export_readiness__managed__pattern_deep_work__generate_validate` | [attempt](../nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8) | `pass` | [validation ledger](evidence/validation-ledger.json) | The completion packet is ready for verification, declared artifacts are present and substantive, and the recorded validation evidence satisfies the export repair and preview contracts. |
| `export_readiness__managed__pattern_deep_work__plan` | [attempt](../nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a) | `pass` | [validation ledger](evidence/validation-ledger.json) | The planning node satisfied its contract: it produced a focused execution plan for the customer export repair, identified concrete validation the executor should run, captured current failure evidence, and did not edit the workspace. |

## Active Failures

- No active failures remain.

## Recovered Issues

- No recovered issues were recorded.

## Historical Attempts

- No historical attempts require reviewer action.

## Interventions

- No supervisor or human interventions were recorded.

## Workspace Improvements

| Area | Recommendation | Evidence | Priority | Confidence | Done When |
| --- | --- | --- | --- | --- | --- |
| none | No concrete workspace improvement was inferred from this run. | Run reached terminal state without active failures, recovered failures, active blockers, or missing milestone validation. | low | medium | No action required unless human review identifies missing context, docs, tests, or tooling. |

## Evidence Links

- [artifact index](evidence/artifact-index.json)
- [change map](evidence/change-map.json)
- [validation ledger](evidence/validation-ledger.json)
- [decision log](evidence/decision-log.md)
- [intervention trace](evidence/intervention-trace.json)
- [milestones](evidence/milestones.json)
- [workspace improvements](evidence/workspace-improvements.json)
- [audit index](03-audit-index.md)
