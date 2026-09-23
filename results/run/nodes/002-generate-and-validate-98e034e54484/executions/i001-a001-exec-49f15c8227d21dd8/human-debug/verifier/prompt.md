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

## Completion Packet
Runtime mechanical completion facts are primary structured evidence. Do not pass an incomplete packet; judge semantic correctness only when the packet is ready for verification.
- Status: ready_for_verification
- Ready for verification: true
- Packet: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/runtime/completion-packet.json
- af orient called: true
- af orient calls: 1
- af orient modes: startup_restore
- af orient timing: first=2026-09-23T22:00:27.859Z; last=2026-09-23T22:00:27.859Z
- Milestones: total=1; completed=1; active=0; blocked=0; validation_logs=2
  - m1 [completed] Implement export repair and preview
    - completion evidence: Implemented scoped export repair and preview; published work_notes and draft_summary; required combined validation passed with npm test 12/12 and independent checker passed=true with 24/24 export/listing checks plus all preview checks.
    - validation: Focused regression tests passed after implementing shared matching, CSV escaping, and preview API/UI source coverage: 12 tests passed.; command=node --test test/query.test.mjs test/server.test.mjs; result=pass
    - validation: Required combined validation passed: npm test reported 12/12 tests passing; independent checker reported passed=true, 24/24 export/listing checks, and all 5 preview checks passing.; command=npm test && python3 showcase/acceptance/check_preview.py; result=pass
- Declared artifact status:
  - work_notes: present; current_attempt=true; size=5122; content_type=text/markdown; media_kind=text; encoding=utf-8
  - draft_summary: present; current_attempt=true; size=3174; content_type=text/markdown; media_kind=text; encoding=utf-8

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
- Diff patch: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/diff.patch
- Status text: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/status.txt
- Changed files JSON: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/workspace-changes/changed-files.json

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
Path: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/agent-response.md
Purpose: Agent's final captured response.
Size: 1044 bytes

```
Implemented and validated the customer export repair plus preview.

Changed:
- Shared unpaginated matching in `src/customers.mjs`, while `/api/customers` remains paginated.
- CSV export now includes all matching records and safely preserves commas, quotes, LF/CRLF, empty text, and Unicode.
- Added `/api/export-preview`.
- Added dashboard preview with count, filter scope, exported columns, first-five full-field sample, no-match state, cancel/close, and stored-query download protection.
- Added focused regression tests.

Validation passed:
- `npm test`: 12/12 passing.
- `npm test && python3 showcase/acceptance/check_preview.py`: passed; checker reported 24/24 export/listing checks and all preview checks passing.
- `af complete check`: `ready_for_verification`.

Published artifacts:
- `work_notes`
- `draft_summary`

Limitation recorded: I did not run a browser rendering/manual interaction check; UI claims are based on source inspection and automated validation.

```

## Declared Artifacts
### `work_notes`
Path: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/work-notes.md
Purpose: Notes and validation evidence from the current deep work result.
Size: 5122 bytes

```
# Work Notes

## What changed
- `src/customers.mjs:6-36`: added shared `matchingCustomers` query path for search/status/segment/sort, and kept `queryCustomers` paginated only after matching. This preserves `/api/customers` listing pagination while giving export/preview the full matching set.
- `src/export.mjs:3-21`: kept the seven export columns as the single column list; changed CSV export to use all matching customers; added RFC-style CSV field escaping for commas, quotes, LF, CRLF, empty text, and Unicode; added `previewExport` returning `{ total, columns, sample }` with the first five full customer objects.
- `src/server.mjs:27-35`: kept `/api/export` and added `GET /api/export-preview` JSON using the same `url.searchParams` query semantics.
- `public/index.html:8,16-22` and `public/app.js:15-165`: changed the export action to open a preview, added active filter scope, total count, exported columns, first-five sample table with all seven fields, no-match copy, cancel/close actions, and download action.
- `public/app.js:22-23,66-95,153-165`: listing uses `listingParams()` with page/pageSize; preview and download use `exportParams()` without pagination. The download uses `previewQuery`, the exact stored query that produced the preview, and closes rather than downloading if current filters differ.
- `public/styles.css`: added focused preview panel/button styles only.
- `test/query.test.mjs:22-26`: added regression coverage that unpaginated matching ignores page/pageSize while preserving filter and sort.
- `test/server.test.mjs:77-128`: added regression coverage for unpaginated export counts/order, CSV escaping/round-trip, header-only no-match export, preview API shape/sample, and no-match preview.

## Plan deviations
- No material deviation from `plan.md`. One late clarity adjustment was added after source review: the preview sample table now displays all seven exported columns (`public/index.html:21`, `public/app.js:53-60`) rather than a reduced five-column table, so the sample better represents the complete CSV.

## Validation evidence
- Focused red evidence before implementation: `node --test test/query.test.mjs test/server.test.mjs` failed because `matchingCustomers` was missing, exports were paginated, CSV values were not preserved, and `/api/export-preview` returned 404.
- Focused post-change validation: `node --test test/query.test.mjs test/server.test.mjs` passed with 12 tests, 12 pass, 0 fail.
- Required full validation command: `npm test && python3 showcase/acceptance/check_preview.py` passed.
  - `npm test`: 12 tests, 12 pass, 0 fail.
  - Independent checker: `passed: true`, 24/24 export/listing checks passed, preview checks passed for all matching customers, active customers from page two, combined filters descending, search with commas and line breaks, and no results.

## Source evidence for operator clarity
- Preview entry point is labeled `Preview export` in `public/index.html:8`.
- Preview title and actions are explicit: `Review customer export`, `Cancel`, `Download this CSV`, and `Close preview` in `public/index.html:17-22`.
- Count text distinguishes full download scope: `${result.total} matching customers will be included in the full CSV download.` in `public/app.js:68`.
- Active filter scope is generated from current search/status/segment/sort in `public/app.js:31-39` and rendered at `public/app.js:69`.
- Exported columns are shown from the API response in `public/app.js:70`.
- Sample is labeled `First 5 matching customers sample` and shows ID, name, company, email, status, segment, and notes in `public/index.html:21`; rows are populated from full preview sample objects in `public/app.js:48-63`.
- No-match state says `No customers match these filters. Downloading now will create a CSV with column headers only.` in `public/index.html:20`.
- Stale preview protection closes/clears previews on filter input (`public/app.js:153-154`), discards async preview responses when filters changed (`public/app.js:89-95`), and refuses download if the stored preview query differs from the current export query (`public/app.js:160-165`).

## Simplicity and maintainability review
- Query/filter/order behavior has one source of truth in `src/customers.mjs:6-28`; listing, export, and preview consume it instead of duplicating business rules.
- CSV and preview responsibilities stay in `src/export.mjs:3-21`; the server only routes requests in `src/server.mjs:24-35`.
- No dependencies, remote services, fixture edits, contract edits, route removals, or unrelated rewrites were added.
- Existing tests were kept and strengthened; none were skipped or weakened.

## Remaining risks and limitations
- I did not run a browser rendering/manual UI interaction check. UI claims above are based on implemented source and automated API/product validation, not observed browser layout.
- `EXPORT_PREVIEW.md` remains untracked in `git status --short`, as it was supplied as task context and was not edited.
- No known product gap remains after the passing required validation command.

```

### `draft_summary`
Path: results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/artifacts/draft-summary.md
Purpose: Draft content for final artifact summary.
Size: 3174 bytes

```
# Draft Summary

## Summary
Repaired the customer CSV export and added an export preview for operators. The root cause was that `src/export.mjs` reused paginated listing rows from `queryCustomers` and serialized CSV by raw comma joins. The fix adds shared unpaginated matching in `src/customers.mjs:6-28`, keeps listing pagination in `src/customers.mjs:31-36`, uses the full matching set plus CSV escaping in `src/export.mjs:5-17`, and exposes the stable preview payload from `src/export.mjs:19-21` through `/api/export-preview` in `src/server.mjs:33-35`.

## Changed Files
- `src/customers.mjs`: shared search/status/segment/sort matching helper; paginated listing preserved.
- `src/export.mjs`: unpaginated export, seven-column CSV escaping, and preview payload helper.
- `src/server.mjs`: new `GET /api/export-preview` route.
- `public/index.html`: preview panel, sample table, no-match copy, download and cancel/close controls.
- `public/app.js`: separate listing vs export queries, preview fetch/render flow, stored-query download, stale preview protection.
- `public/styles.css`: focused preview styles.
- `test/query.test.mjs`: unpaginated matching regression test.
- `test/server.test.mjs`: full export scope, CSV escaping, header-only export, and preview API regression tests.

## Validation Evidence
- `node --test test/query.test.mjs test/server.test.mjs`: passed, 12 tests / 12 pass / 0 fail.
- `npm test && python3 showcase/acceptance/check_preview.py`: passed.
  - `npm test`: 12 tests / 12 pass / 0 fail.
  - Independent checker: `passed: true`, 24/24 export and listing checks passed, plus all preview checks passed.

## User-Visible States
- Export entry point: `Preview export` (`public/index.html:8`).
- Preview heading and actions: `Review customer export`, `Cancel`, `Download this CSV`, `Close preview` (`public/index.html:17-22`).
- Full download count: `${result.total} matching customers will be included in the full CSV download.` (`public/app.js:68`).
- Active filter scope: `Matching ...` built from current search/status/segment/sort (`public/app.js:31-39`) and rendered in the preview (`public/app.js:69`).
- Exported columns: `Exported columns: ...` from the preview API response (`public/app.js:70`).
- Sample label and fields: `First 5 matching customers sample` with ID, name, company, email, status, segment, notes (`public/index.html:21`; rows rendered in `public/app.js:48-63`).
- No-match state: `No customers match these filters. Downloading now will create a CSV with column headers only.` (`public/index.html:20`).
- Stale preview protection: closes on filter changes (`public/app.js:153-154`), discards preview responses for changed queries (`public/app.js:89-95`), and blocks download if the stored preview query differs from the current export query (`public/app.js:160-165`).

## Limitations
- Browser rendering and manual interaction were not observed; UI claims are based on source inspection and automated validation.
- `EXPORT_PREVIEW.md` is still untracked task context and was not edited.
- No known remaining gap after the required validation passed.

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