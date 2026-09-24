## Role
You are an external outcome verifier. You did not write this code.
Audit the agent's just-finished work against the graph goal, the node's authored intent, the declared artifacts, and the milestone evidence.
You must respond with a single fenced JSON object that follows the schema below. No prose outside the fence.

## Decision Rule
### Mechanical Readiness
- Treat the Completion Packet section as primary structured evidence for mechanical readiness.
- Do not pass when completion_status is incomplete. Treat blocked as a terminal attempt state only when it includes a typed authority request from runtime; blocked is not node success.
- Pass when the declared artifacts, final response, milestone evidence, and available deterministic evidence reasonably satisfy the authored acceptance criteria.
- Treat graph and node acceptance criteria as authoritative over task text that describes an intentionally failing fallback, blocker report, or retry trigger.
- A final response explicitly marked as an intentional failure, retry request, missing-context fallback, or not-done state is blocker evidence unless the acceptance criteria explicitly allow that terminal fallback.

### Artifact Judgment
- Declared artifact snippets are authoritative for artifact presence.
- A required artifact that is empty, placeholder-only, missing requested content, or inconsistent with the final response is blocker evidence even when the final response claims success.
- Only fail for a missing declared artifact when it is absent from the Declared Artifacts section, has a read error, or the visible content/metadata proves it does not satisfy the artifact contract.
- Non-text artifacts are valid when they have a path, content type, byte size, hash, and no read error. Judge their meaning from metadata plus milestone/final-response validation evidence; do not fail only because binary bytes are not inlined.
- For exact labels or literal phrase requirements, defer to ready Completion Packet artifact findings. Do not invent a missing-literal blocker when the packet reports the artifact present with no placeholder, forbidden-content, or missing-required-content finding and the inlined artifact text contains the literal.
- If an artifact quotes an earlier incomplete `af complete check` result, treat that as stale embedded diagnostic text when the final Completion Packet is ready and has no matching artifact finding.
- If an artifact is truncated, read the full artifact path before making a blocker judgment that depends on omitted content.

### Evidence Precedence
- Captured execution evidence is the primary source for commands the agent actually ran.
- Do not turn a verifier-side command rerun failure into a blocker when the captured node transcript already shows the required command succeeded.
- For command/tool output evidence, judge material observed values rather than line breaks, bullets, punctuation, or prose wrapping differences.

### Workspace Diff
- Workspace diff evidence is supporting audit evidence, not the default source of truth.
- Do not use workspace diff as the sole reason for passed=false unless it is the only authoritative evidence for the node's required change and shows a concrete violation.

### Blocker Standard
- Set passed=false only when there is strong, concrete, actionable blocker evidence that the node violated the graph or node contract.
- Ambiguous, incomplete, or lower-confidence evidence should become a non-blocker finding unless it directly contradicts a required contract point.
- Prefer investigative recommendations over restating blockers. Tell the retrying agent what evidence to gather, what command/tool/doc to inspect, and what validation would prove recovery.
- Distinguish an ambiguous configuration mismatch from an irreducible external blocker. Reserve external-blocker language for missing credentials, forbidden approval, unavailable required inputs, or failures the node cannot investigate with its tools.
- One blocker finding means passed=false; passed=true may still include low, medium, or high non-blocker findings.
- Cite exact artifact paths, milestone evidence, commands, or response excerpts in evidence so the retrying agent can act without re-discovering the failure.

## Graph Intent
Goal: Give Northstar operators a correct customer export and a clear preview of exactly what they will download.

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
- Do not edit agentflow.graph.json, APP_GUIDE.md, or any file under showcase/.

## Node Intent
Node: export_readiness__managed__pattern_deep_work__generate_validate
Attempt: 1, iteration 1

Goal: Satisfy the full deep-work task from the current state, using plan.md as guidance and validating the result with concrete evidence.

Acceptance criteria:
- The work satisfies the task contract or records a precise remaining gap.
- Focused validation is run when feasible, with exact results recorded in work notes and draft artifacts.
- Draft user-authored final artifacts exist so completion criteria can grade the result.

Constraints:
- Do not edit data/customers.json, TICKET.md, or AGENTS.md.
- Do not weaken, remove, or skip existing tests.
- Do not edit files outside this repository or change independent acceptance tools.
- Do not add dependencies, call remote services, or include unrelated refactors.
- Do not edit EXPORT_PREVIEW.md or introduce unrelated interface redesign.
- Do not edit agentflow.graph.json, APP_GUIDE.md, or any file under showcase/.

## Completion Packet
Runtime mechanical completion facts are primary structured evidence. Do not pass an incomplete packet; judge semantic correctness only when the packet is ready for verification.
- Status: ready_for_verification
- Ready for verification: true
- Packet: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/runtime/completion-packet.json
- af orient called: true
- af orient calls: 1
- af orient modes: startup_restore
- af orient timing: first=2026-09-24T10:47:50.050Z; last=2026-09-24T10:47:50.050Z
- Milestones: total=1; completed=1; active=0; blocked=0; validation_logs=4
  - m1 [completed] Repair exports and add safe preview
    - completion evidence: Implementation complete; required artifacts published; exact gate passed with 13/13 Node tests, 24/24 export/listing checks, and 5/5 preview checks; no known remaining task gap.
    - validation: Expected RED: test modules fail because matchingCustomers and previewCustomers are not yet exported; command=node --test test/query.test.mjs test/server.test.mjs; result=fail
    - validation: Backend slice passes 12 tests; only the expected missing UI preview test remains red; command=node --test test/query.test.mjs test/server.test.mjs; result=fail
    - validation: All changed JavaScript parsed and the diff passed whitespace validation; command=node --check public/app.js; node --check src/customers.mjs; node --check src/export.mjs; node --check src/server.mjs; git diff --check; result=pass
    - validation: 13/13 Node tests, 24/24 export/listing acceptance checks, and 5/5 preview checks passed; exit 0; command=npm test && python3 showcase/acceptance/check_preview.py; result=pass
    - finding: Five-axis review found no required issues; evidence=Shared matchingCustomers keeps filter/order semantics centralized; listing alone paginates; CSV encoding uses the stable columns array; preview download reuses the successful request query and late responses are discarded; DOM values use textContent; changed files are limited to src, public, and focused tests with no dependency or protected-file changes.
- Declared artifact status:
  - work_notes: present; current_attempt=true; size=5324; content_type=text/markdown; media_kind=text; encoding=utf-8
  - draft_summary: present; current_attempt=true; size=2697; content_type=text/markdown; media_kind=text; encoding=utf-8

## Workspace
Workspace path: .
Sandbox: read-only. You may read any file under the workspace, but never modify it.

## Workspace Diff
Workspace diffs are audit/provenance evidence. They are not the primary pass/fail oracle.
This diff is captured against the node-start baseline. Preexisting dirty workspace files are not node-local mutations and must not be treated as this node's contamination.
Use declared artifacts, milestone decision/validation logs, and deterministic command/tool evidence as the primary supervision surface.
Do not fail solely because the workspace diff is absent, degraded, ambiguous, or surprising. Fail on workspace evidence only when it provides strong, concrete, actionable proof of a contract violation and no stronger declared evidence resolves the contradiction.
- Status: captured
- Changed file count: 8
- Diff patch: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/diff.patch
- Status text: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/status.txt
- Changed files JSON: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/changed-files.json

Diff excerpt: (not inlined by default; read the patch path above only when it is needed to investigate a concrete contradiction.)

## Captured Execution Evidence
Captured command transcript is deterministic evidence from the completed node attempt. Prefer it over rerunning commands from this read-only audit sandbox.
Rerun a command only when captured evidence is absent, contradictory, or too incomplete to judge. If a verifier-side rerun is blocked by sandbox or temp-file permissions, treat that as verifier-environment evidence, not as a node failure by itself.

(no execution transcript captured)

## Runtime Decision Evidence
Runtime decision entries are node-authored records of major decisions, rationale, and supporting evidence.
Use them to understand intentional scope choices and to cross-check final artifacts. Missing or sparse decision evidence should usually be a warning, not a blocker, unless the node contract specifically required it.

(no runtime decision entries captured)

## Agent Response
### `agent_response`
Path: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/agent-response.md
Purpose: Agent's final captured response.
Size: 1212 bytes

```
Implemented and validated the complete customer export repair and preview.

- Exports now include every matching customer, safely encode all CSV fields, and return header-only CSVs for no matches.
- `/api/export-preview` returns the full count, stable columns, and first five ordered matches.
- Dashboard preview shows filter scope, columns, sample/full-download distinction, no-match guidance, and explicit download/cancel actions.
- Preview/download share an immutable query snapshot; stale responses are discarded and filter changes invalidate the preview.
- Added focused regression coverage using test-first, incremental backend/UI slices.

Validation:

- `npm test && python3 showcase/acceptance/check_preview.py` — passed
- Node tests: 13/13
- Export/listing acceptance: 24/24
- Preview acceptance: 5/5
- JavaScript syntax checks and `git diff --check` passed
- No protected files or dependencies changed

Published `work_notes` and `draft_summary`; `af complete check` reports `ready_for_verification`.

Limitation: no browser executable was available, so rendered layout and keyboard behavior were not manually observed. UI verification used source assertions, syntax checks, and live HTTP/API tests.

```

## Declared Artifacts
### `work_notes`
Path: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/work-notes.md
Purpose: Notes and validation evidence from the current deep work result.
Size: 5324 bytes

```
# Work notes

## Result

Completed the customer export repair and export preview. There is no known remaining task gap.

## What changed

- `src/customers.mjs:6-25` now centralizes filter/search/segment/ID-order behavior in `matchingCustomers`. `queryCustomers` applies pagination only after obtaining those matches, so `/api/customers` remains paginated while export and preview share the same unpaginated ordering rules.
- `src/export.mjs:3-18` keeps one seven-column contract, CSV-encodes commas, quotes, LF, and CRLF, exports every match, preserves empty and Unicode strings, emits a header-only CSV for no matches, and constructs the preview count/first-five sample from the same match helper.
- `src/server.mjs:24-35` preserves existing routes and adds `GET /api/export-preview` with JSON output.
- `public/index.html:8,17-30` changes the direct export into a preview action and adds the focused preview dialog with explicit `Cancel`, close, and `Download complete CSV` actions.
- `public/app.js:15-87` snapshots only search/status/segment/sort from the form, uses the exact serialized query for both preview and download, hides the download until preview succeeds, and discards late preview responses. `public/app.js:41-44,141-147` invalidates pending/stale preview state when the dialog closes or any filter changes.
- `public/app.js:65-76` provides full-count, active-filter, exported-column, sample/full-download, and header-only no-match copy. Sample values are rendered with `textContent` at `public/app.js:27-39`.
- `public/styles.css:1` adds only dialog/table/action styling consistent with the existing interface.
- `test/query.test.mjs:30-33` and `test/server.test.mjs:41-103` add focused regressions for unpaginated shared matching, exact CSV preservation, header-only output, preview API semantics, and required preview states while retaining all existing tests.

## Plan alignment

No task-level deviation from `plan.md` was needed. The preview result function was placed beside CSV export in `src/export.mjs` because both consume the same stable columns and unpaginated matches; this is the cohesive option anticipated by plan step 3 and avoids another module.

## Validation evidence

- TDD red: `node --test test/query.test.mjs test/server.test.mjs` initially exited 1 because `matchingCustomers` and `previewCustomers` did not exist.
- Backend increment: the same focused command reached 12 passing tests with only the deliberately missing UI test failing.
- Completed focused suite: `node --test test/query.test.mjs test/server.test.mjs` exited 0 with 13 passed, 0 failed, 0 skipped.
- Required exact gate: `npm test && python3 showcase/acceptance/check_preview.py` exited 0. Node reported 13 passed, 0 failed, 0 skipped. The independent checker reported 24/24 export/listing checks passed and all 5 preview cases passed, including page-two active customers, combined descending filters, commas/line breaks, and no results.
- Syntax/quality: `node --check` passed for `public/app.js`, `src/customers.mjs`, `src/export.mjs`, and `src/server.mjs`; `git diff --check` passed.
- Scope: `git status --short` lists only the eight task files above. No dependency manifest, canonical data, contract, graph, guide, acceptance checker, or `showcase/` file changed.

## Review findings

The five-axis review found no required issue. The maintenance-critical decisions are small and direct: `src/customers.mjs` is the sole filter/order implementation, listing pagination remains at its existing boundary, and `src/export.mjs` owns the single columns/CSV/preview contract. `public/app.js` carries one captured query string from preview request to download URL and uses a monotonic request number to reject stale responses. User-derived values enter the DOM only through `textContent`. Full dataset work is limited to explicit export/preview operations; listing remains bounded.

## User-visible states

- Entry action: `Preview export` (`public/index.html:8`).
- Loading/title/actions: `Export preview`, `Preparing preview…`, `Cancel`, `Download complete CSV`, and the close control (`public/index.html:17-30`).
- Normal scope/count: `This download contains … matching customers.`, `Filters: …`, and `Exported columns: …` (`public/app.js:65-72`).
- Sample distinction: `Sample: first five matching records. The complete CSV download contains all …` for more than five matches; smaller result sets say all matching records are shown (`public/app.js:70-72`).
- No match: `No customers match these filters. The CSV download will contain only the column headers.` (`public/app.js:73-76`).
- Freshness: the download `href` is absent while loading and is populated from the exact successful preview query (`public/app.js:47-64,78-79`); filter changes close and invalidate the preview (`public/app.js:141`).

## Remaining risks and limitations

No Chromium/Chrome/Playwright executable was available, so rendered layout, keyboard interaction, and real-browser behavior were not directly observed. UI evidence is limited to source inspection, static dashboard assertions, JavaScript syntax validation, and live server/API tests. The implementation intentionally remains an in-memory local demo and builds full export/preview matches in memory, consistent with the existing 137-record fixture and project scope.

```

### `draft_summary`
Path: results/2026-09-24/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/draft-summary.md
Purpose: Draft content for final artifact summary.
Size: 2697 bytes

```
# Customer export and preview repair

Repaired the customer export and added a query-safe preview without changing listing pagination or the existing public route semantics.

## Cause and repair

The export previously consumed the paginated `rows` from `queryCustomers` and joined raw values with commas. `src/customers.mjs:6-25` now separates shared filter/order matching from listing-only pagination. `src/export.mjs:3-18` uses those full matches, one stable seven-column definition, and CSV escaping for commas, quotes, LF, and CRLF. Empty strings and Unicode remain intact, and zero matches produce only the header row. `src/server.mjs:33-35` adds the specified `GET /api/export-preview` response with total count, columns, and up to five full sample records.

## Operator experience

`public/index.html:8,17-30` now opens an `Export preview` with explicit `Cancel`, close, and `Download complete CSV` actions. `public/app.js:65-76` shows the full matching count, active search/status/segment/order scope, exported columns, and clearly labels either the first-five sample or a smaller complete sample. With no matches it says: `No customers match these filters. The CSV download will contain only the column headers.`

Preview and download cannot silently diverge: `public/app.js:47-79` captures one query string, requests its preview, rejects superseded responses, and assigns that exact string to the download only after preview success. `public/app.js:41-44,141-147` closes/invalidates the preview on filter changes, cancel, close, or Escape.

## Changed files

- `src/customers.mjs`, `src/export.mjs`, `src/server.mjs`
- `public/app.js`, `public/index.html`, `public/styles.css`
- `test/query.test.mjs`, `test/server.test.mjs`

No dependency, fixture, task contract, graph, guide, acceptance checker, or `showcase/` file changed.

## Validation

- `npm test && python3 showcase/acceptance/check_preview.py` — exit 0; 13/13 Node tests, 24/24 export/listing checks, and 5/5 preview checks passed, with no skips.
- `node --check public/app.js`, `src/customers.mjs`, `src/export.mjs`, and `src/server.mjs` — all passed.
- `git diff --check` — passed.

Focused regressions cover listing pagination versus unpaginated export/preview, exact special-character CSV output, header-only no-match output, stable preview columns/count/sample, filter/order agreement, and required dashboard copy/actions (`test/query.test.mjs:30-33`, `test/server.test.mjs:41-103`).

## Limitation

No browser executable was available, so rendered layout, keyboard interaction, and browser behavior were not manually observed. The UI was verified through source assertions, syntax checks, and live HTTP/API tests.

```

## Output
Respond with exactly one fenced ```json``` block matching this schema:
{
  "passed": boolean,
  "summary": string,
  "findings": [
    {
      "severity": "blocker" | "high" | "medium" | "low",
      "category": string, // examples: "incorrect_output", "missing_validation", "ambiguous_configuration_mismatch", "irreducible_external_blocker"
      "evidence": string,
      "recommendation": string, // concrete next investigation/fix/validation steps for the retrying worker
      "references": [string] // optional
    }
  ]
}
Do not include any other text. The fenced JSON block is the entire response.

Example of a failing verdict:
```json
{
  "passed": false,
  "summary": "Agent claims success but the new function returns the wrong value for negative inputs.",
  "findings": [
    {
      "severity": "blocker",
      "category": "incorrect_output",
      "evidence": "agent-response.md says \"returns 0 for negative inputs\" but the implementation returns -1.",
      "recommendation": "Update the implementation so the function returns 0 for any negative input and add a regression test."
    }
  ]
}
```