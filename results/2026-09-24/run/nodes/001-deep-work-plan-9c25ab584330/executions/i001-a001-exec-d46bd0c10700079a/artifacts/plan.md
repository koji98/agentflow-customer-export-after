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
