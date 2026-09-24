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
Node: export_readiness__managed__pattern_deep_work__plan
Attempt: 1, iteration 1

Goal: Plan the execution work needed to satisfy the full deep-work task from the current state. Do not edit files in this planning phase.

Acceptance criteria:
- The plan addresses the task contract and any prior failed completion criteria.
- The plan identifies focused validation the execution agent should run when feasible.
- The plan does not edit the workspace.

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
- Packet: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/runtime/completion-packet.json
- af orient called: true
- af orient calls: 1
- af orient modes: startup_restore
- af orient timing: first=2026-09-24T10:43:09.349Z; last=2026-09-24T10:43:09.349Z
- Milestones: total=0; completed=0; active=0; blocked=0; validation_logs=0
- Declared artifact status:
  - plan: present; current_attempt=true; size=11490; content_type=text/markdown; media_kind=text; encoding=utf-8

## Workspace
Workspace path: .
Sandbox: read-only. You may read any file under the workspace, but never modify it.

## Workspace Diff
Workspace diffs are audit/provenance evidence. They are not the primary pass/fail oracle.
This diff is captured against the node-start baseline. Preexisting dirty workspace files are not node-local mutations and must not be treated as this node's contamination.
Use declared artifacts, milestone decision/validation logs, and deterministic command/tool evidence as the primary supervision surface.
Do not fail solely because the workspace diff is absent, degraded, ambiguous, or surprising. Fail on workspace evidence only when it provides strong, concrete, actionable proof of a contract violation and no stronger declared evidence resolves the contradiction.
- Status: captured
- Changed file count: 0
- Diff patch: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/workspace-changes/diff.patch
- Status text: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/workspace-changes/status.txt
- Changed files JSON: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/workspace-changes/changed-files.json

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
Path: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/artifacts/agent-response.md
Purpose: Agent's final captured response.
Size: 163 bytes

```
Published the `plan` artifact using the Agentflow operations workflow. `af complete check` reports `ready_for_verification`, and the repository remains unchanged.

```

## Declared Artifacts
### `plan`
Path: results/2026-09-24/run/nodes/001-deep-work-plan-9c25ab584330/executions/i001-a001-exec-d46bd0c10700079a/artifacts/plan.md
Purpose: Execution plan for satisfying the deep work task from the current state.
Size: 11490 bytes

```
## Task target

Repair the customer export and add the preview required by `TICKET.md` and `EXPORT_PREVIEW.md`, while preserving public routes, query semantics, the paginated listing, filter controls, and the existing dashboard design. Completion means:

- CSV exports preserve all matching records and all seven exact fields (`id`, `name`, `company`, `email`, `status`, `segment`, `notes`), including commas, quotes, LF, CRLF, empty text, and Unicode. Exports ignore pagination; zero matches produce a header-only CSV.
- `GET /api/export-preview` returns full matching `total`, the stable seven-item `columns` array, and the first `min(5, total)` full customer objects in requested order, ignoring `page` and `pageSize`.
- The dashboard preview shows active filter scope, sample labeling, download and cancel actions, and a useful no-match state.
- Preview and download use the same query, and stale preview information cannot silently describe a different download.
- Focused regression tests and the full product test suite pass.
- The summary documents changed files, actual validation evidence, user-visible states with source references, and limitations.

## Current state

This is a first-cycle starting state: `af orient` reports no recovery, blocker, or prior progress, and no prior scorecard, criterion record, work note, or repeat-history file was found. The Git worktree was clean before and after read-only inspection.

- `src/customers.mjs` owns filtering, ID ordering, pagination, and total calculation in `queryCustomers`.
- `src/export.mjs` consumes that paginated result, so `page` and `pageSize` truncate exports. It joins raw values with commas and CRLF, so delimiters, quotes, and embedded line endings are not safely encoded.
- `src/server.mjs` has `/api/customers`, `/api/export`, and `/api/stats`; `/api/export-preview` is absent.
- `public/index.html` and `public/app.js` expose a direct download link and scope sentence, but no preview, explicit sample, cancel action, header-only no-match explanation, or preview request/query freshness protection.
- Existing tests cover listing behavior and a simple one-record CSV response, but not complete unpaginated export, exact CSV escaping, preview semantics, or UI query consistency.
- Baseline `npm test && python3 showcase/acceptance/check_preview.py` exited 1 on 2026-09-24. All 6 Node tests passed. The export gate passed 16/24 checks and failed 8 export cases due to truncation/invalid CSV encoding. All 5 preview cases returned HTTP 404. All 12 independent listing cases passed, so current listing/filter/pagination behavior is evidence to preserve.

## Gap

1. Export uses paginated rows and unsafe delimiter joining instead of the full ordered match set with valid CSV field encoding.
2. The stable `GET /api/export-preview` contract is absent.
3. Listing, export, and preview need one understandable source of filtering/ordering semantics, with pagination applied only to listing; duplicating these rules would create drift.
4. The dashboard lacks full matching count, plain-language active filter scope, exported-column explanation, first-five sample labeling/data, unambiguous download and cancel/close actions, and a header-only no-match explanation.
5. There is no preview snapshot: a late response or filter change could otherwise pair stale count/sample information with a different download query.
6. Regression coverage and the eventual delivery summary do not yet prove the required behavior or operator clarity.

## Execution plan

1. Refine the query boundary in `src/customers.mjs` with the smallest clear separation between full filtered/sorted matches and listing pagination. Preserve current defaults and `/api/customers` output (`rows`, `total`, `page`, `pageSize`) exactly. Let export and preview consume unpaginated ordered matches without duplicating search/status/segment/sort rules.
2. Repair `src/export.mjs` to export the entire matching ordered set regardless of `page` or `pageSize`. Add a small named CSV field encoder using the existing seven-column order so commas, double quotes, LF, CRLF, empty strings, and Unicode round-trip exactly. Retain response headers and emit only the header row (with the existing line ending convention) for zero matches.
3. Add a small preview result function in the most cohesive existing source area. Reuse the same columns and full ordered matches as export; return `{ total, columns, sample }` with at most five sample records. Add `GET /api/export-preview` in `src/server.mjs` with JSON content type, leaving existing routes and error behavior unchanged.
4. Extend `test/query.test.mjs` and/or `test/server.test.mjs` with focused regressions. Prove listing stays paginated while export and preview ignore pagination; combined search/status/segment and descending ID order agree; CSV parses back to seven exact fields for comma, quote, LF, CRLF, empty, and Unicode values; zero matches are header-only; preview returns exact columns/count/first-five objects; and no-match preview returns `total: 0`, unchanged columns, and `sample: []`. Use built-in Node facilities only and preserve all six existing tests.
5. Replace the immediate download interaction in `public/index.html` and `public/app.js` with a small preview consistent with the existing dashboard. Show plain-language active search/status/segment/sort scope, full match count, seven exported columns, and data explicitly labeled as the first five matching records (or fewer when fewer exist). Make the sample/full-download distinction unmistakable.
6. Provide a download action whose URL comes from the exact query snapshot used for the accepted preview, plus a cancel/close action that only dismisses it. For zero matches, explicitly explain that the download contains only column headers.
7. Prevent stale UI state in `public/app.js`: snapshot `q`, `status`, `segment`, and `sort` on preview open; exclude or safely ignore listing-only pagination for preview/download; discard superseded preview responses; and close or invalidate the preview when filters change. Never silently rebind the download to a query different from the shown count/sample.
8. Add only minimal preview styles in `public/styles.css`; do not redesign the listing, pagination, filters, or unrelated interface.
9. Review the final diff for one source of query/filter/order truth, small named functions, no duplicate business rules, dependencies, dead code, or unrelated changes. The executor may adapt this plan when workspace evidence proves an assumption wrong, as long as the adaptation serves the full task contract and constraints.
10. Write the final summary with root cause, repaired behavior, exact changed-file references, actual command evidence, and exact user-visible strings/source references for normal, sampled, no-match, cancel, and download states. State whether a browser was actually used; do not claim rendered layout, keyboard accessibility, or actual browser behavior from source inspection alone.

## Validation plan

Run focused checks during implementation, followed by the required full gate:

1. `node --test test/query.test.mjs` after query changes.
2. `node --test test/server.test.mjs` after CSV and preview API work.
3. Add a focused UI/source test only if it can reliably prove query snapshot handling, stale-response invalidation, required labels, and no-match copy without dependencies; otherwise inspect those paths and perform a local browser check if feasible.
4. `npm test` with no failures or skips.
5. `python3 showcase/acceptance/check_preview.py` to verify all export/preview cases and protected files.
6. Run the exact completion command in one invocation: `npm test && python3 showcase/acceptance/check_preview.py`. Record exit status and actual pass counts.
7. Run `git diff --check`, `git status --short`, and inspect the final diff. Confirm no changes to `data/customers.json`, `TICKET.md`, `AGENTS.md`, `EXPORT_PREVIEW.md`, `agentflow.graph.json`, `APP_GUIDE.md`, any file under `showcase/`, dependency manifests, or files outside this repository. Confirm no test was removed, skipped, or weakened.
8. If feasible, exercise the local UI for: filtered page-two preview, combined descending filters, download from the shown preview, cancel without download, filter change during/after preview, fewer than five matches, and zero matches. Record only observed behavior; otherwise disclose the limitation.

Completion-criterion evidence:

- **behavior (required, weight 0.6):** passing `npm test && python3 showcase/acceptance/check_preview.py`, plus regression assertions for exact unpaginated CSV, unchanged paginated listing, and preview semantics.
- **simplicity (required, weight 0.25, target workspace):** final source/diff inspection showing a shared filter/order path, listing-only pagination, shared seven-column contract, small CSV/preview helpers, and no unrelated rewrites, dependencies, dead code, or duplicate rules. Cite paths and maintenance consequences.
- **operator_clarity (required, weight 0.15, target workspace):** exact strings and source references proving full count, active filters, columns, explicit first-five sample, download/cancel actions, header-only no-match state, and stale-query protection. Supplement with actual UI observations only if performed.

## Expected material change

A focused patch is expected in `src/customers.mjs`, `src/export.mjs`, `src/server.mjs`, `public/app.js`, `public/index.html`, `public/styles.css`, and justified focused files under `test/`.

Progress is materially proven when CSV responses parse to the complete expected records and seven exact values independent of page; `/api/export-preview` returns exact total/columns/first-five sample for all supplied query classes; the interface clearly presents one query snapshot and the sample/full-download distinction; listing remains unchanged; and all focused/full checks pass.

## Remaining gap

No implementation was made in this planning phase. Full completion appears feasible in one execution cycle using local source and tests. The execution phase must implement every required behavior, capture passing validation, and provide the evidence-backed summary. If browser access is unavailable, the residual limitation is lack of direct rendered/manual UI observation; disclose it rather than substituting a source-based claim.

## Risks or constraints

- Do not edit `data/customers.json`, `TICKET.md`, `AGENTS.md`, `EXPORT_PREVIEW.md`, `agentflow.graph.json`, `APP_GUIDE.md`, any file under `showcase/`, files outside this repository, or independent acceptance tools.
- Do not weaken, remove, or skip existing tests.
- Do not add dependencies, remote services, secrets, generic export abstractions, unrelated refactors, or an interface redesign.
- Preserve public routes, query defaults and semantics, listing pagination, filter controls, and all seven field values.
- Treat `page` and `pageSize` as listing-only for export/preview while preserving `q`, `status`, `segment`, and `sort`.
- CSV escaping is correctness-sensitive: double embedded quotes inside quoted fields and preserve embedded LF/CRLF as field content.
- Async races are correctness-sensitive: late preview responses and post-preview filter changes must not leave stale count/sample text paired with a different download.
- The independent checker is evidence, not a target to modify; passing visible checks does not replace review of operator wording, stale state, or maintainability.

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