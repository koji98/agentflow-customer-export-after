**Task target**

Repair customer exports and add an export preview for the existing Northstar Customers dashboard. The execution must satisfy OPS-214 in `TICKET.md` and OPS-215 in `EXPORT_PREVIEW.md` while preserving the public routes and query semantics from `README.md`: `GET /api/customers` remains paginated, and `GET /api/export` plus new `GET /api/export-preview` honor `q`, `status`, `segment`, and `sort` while ignoring `page` and `pageSize` for export/preview scope.

The finished change must prove:
- CSV exports preserve all matching records and all seven field values: `id`, `name`, `company`, `email`, `status`, `segment`, `notes`.
- `GET /api/export-preview` returns JSON with `total`, `columns`, and the first-five matching `sample` records.
- The dashboard exposes a preview with active filter scope, sample labeling, download and cancel actions, and a useful no-match state.
- The preview and download use the same query, and stale preview information cannot silently describe a different download.
- Focused regression tests and the full product test suite pass.

**Current state**

Read evidence:
- `README.md` defines source layout and current API query semantics. It explicitly says `/api/export` ignores pagination but preserves all other query semantics.
- `TICKET.md` describes OPS-214: current exports lose records and corrupt fields containing commas, quotes, LF, CRLF, empty text, or Unicode.
- `EXPORT_PREVIEW.md` describes OPS-215: add `GET /api/export-preview`, first-five sample records, full matching count, exported columns, active filter summary, download/cancel actions, no-match state, and stale-preview protection.
- Current `src/customers.mjs` has one `queryCustomers(customers, params)` helper that filters, sorts, then slices by `page` and `pageSize`.
- Current `src/export.mjs` calls `queryCustomers` and writes CSV by raw `join(',')`, so export is currently paginated and CSV-unsafe.
- Current `src/server.mjs` serves `/api/customers`, `/api/export`, and `/api/stats`; `/api/export-preview` is absent.
- Current `public/index.html` has a direct `<a id="export" href="/api/export">Export customers</a>` and no preview UI.
- Current `public/app.js` keeps listing pagination working and updates the direct export link with the same params including `page` and `pageSize`.
- Current `test/server.test.mjs` and `test/query.test.mjs` cover listing and smoke export only; there are no focused regression tests for full export scope, CSV escaping, or preview.
- `git status --short` showed `?? EXPORT_PREVIEW.md`. Treat this as an existing task-contract file, not a file to edit.

Baseline validation run from current state:
- `npm test` passed: 6 tests, 6 pass, 0 fail.
- `python3 showcase/acceptance/check_preview.py` failed. Export failures include expected 137 records but parsed 27, page two expected 137 but parsed 7, active expected 103 but parsed 25, active growth descending expected 35 but parsed 5, and CSV parsing failures for quoted fields, commas, LF, and CRLF. Preview failures are all `HTTP Error 404: Not Found` for `/api/export-preview` cases.

**Gap**

The concrete gaps from current state to the task contract are:
- Export uses paginated `rows` from `queryCustomers`, so it does not export every matching customer across pages.
- Export serializes CSV without quoting/escaping, so notes or company values containing commas, quotes, LF, or CRLF split records or columns.
- There is no shared unpaginated matching path for export and preview, creating risk that listing/export/preview semantics drift.
- There is no `/api/export-preview` route returning `total`, `columns`, and `sample` as specified by `EXPORT_PREVIEW.md`.
- The dashboard export action downloads immediately instead of opening a preview, and it lacks active filter scope, exported columns, first-five sample labeling, no-match copy, cancel/close, and stale-preview protection.
- Existing tests do not guard the defect or the new preview contract.
- The final summary still needs changed files, actual validation evidence, user-visible states with source references, and limitations.

**Execution plan**

1. Preserve listing behavior while adding shared query scope.
   - In `src/customers.mjs`, keep `queryCustomers(customers, params)` returning paginated `{ rows, total, page, pageSize }` for `/api/customers`.
   - Add or refactor around small named helpers that express the existing semantics once: normalize/search/filter by `q`, `status`, `segment`, and sort by `sort` (`id_asc` default, `id_desc` supported).
   - Add an unpaginated helper, for example `matchingCustomers(customers, params)`, that returns every matching customer in the requested order while ignoring `page` and `pageSize`.
   - Use that helper inside `queryCustomers` before slicing, so listing, export, and preview share filter/order behavior without duplicating business rules.

2. Repair CSV export.
   - In `src/export.mjs`, keep `columns = ['id', 'name', 'company', 'email', 'status', 'segment', 'notes']` as the authoritative column order.
   - Change `exportCustomers(customers, params)` to use the unpaginated matching helper, not paginated `rows`.
   - Add a small CSV field escaping function that preserves exact values and produces valid CSV for commas, quotes, LF, CRLF, empty text, and Unicode. Escape quotes by doubling them and quote fields when needed; preserve line endings inside field values.
   - Ensure zero matches returns header-only CSV with the expected trailing line ending.

3. Add preview data and route.
   - Add a small preview function in an appropriate existing module, likely `src/export.mjs`, returning `{ total, columns, sample }` where `total` is the full unpaginated match count and `sample` is the first `min(5, total)` full customer objects in requested order.
   - In `src/server.mjs`, add `GET /api/export-preview` with `Content-Type: application/json` and return that JSON. Keep `/api/customers`, `/api/export`, `/api/stats`, static assets, 404, and 405 behavior intact.

4. Add focused regression tests without weakening existing tests.
   - Extend `test/query.test.mjs` or add similarly focused tests for the shared unpaginated matching helper to show it ignores `page`/`pageSize` while preserving filters and sort.
   - Extend `test/server.test.mjs` and/or add export tests for: full all-customer export not limited to 25 records; page two not limiting export; filtered/sorted export count/order; header-only no-match export; exact CSV parsing/round-trip for commas, quotes, LF, CRLF, empty text, and Unicode.
   - Add preview API tests for the exact stable HTTP contract: same query parameters as `/api/export`, ignores `page`/`pageSize`, `total`, exact `columns`, `sample.length <= 5`, sample order, no-match `{ total: 0, sample: [] }`, and sample records retaining all fields/values.
   - Do not remove, skip, weaken, or loosen current tests.

5. Implement the dashboard preview with a small UI change.
   - In `public/index.html`, change the export trigger from immediate download to a preview-opening control while preserving a clear export affordance. Add a lightweight preview surface such as a dialog or compact panel near the existing dashboard, with elements for count, active filter scope, columns, sample records, no-match text, download action, cancel/close action, loading, and error states.
   - In `public/app.js`, centralize query construction so listing uses `page`/`pageSize`, while preview/download use the same current filter/sort query excluding pagination.
   - On export click, fetch `/api/export-preview` with the current preview/download query. Store a stable query token/string with the preview response.
   - Render user-facing text that clearly distinguishes the sample from the full download, for example count text, `First 5 matching customers`, exported columns, and no-match text explaining the download will contain only column headers.
   - The preview download action must use the same stored query string that produced the preview. If filters/sort change while the preview is open, close/clear the preview or mark it stale and require a new preview before download, so stale preview information cannot silently describe a different download.
   - The cancel/close action should close the preview and not download anything.
   - Keep the existing dashboard design and listing behavior; add only focused CSS in `public/styles.css` for the new preview states.

6. Inspect source for simplicity and operator clarity before finalizing.
   - Confirm the implementation has one source of truth for filter/order semantics, a small CSV escaping helper, and no dependencies or unrelated abstractions.
   - Confirm user-visible strings in `public/index.html` and `public/app.js` make the matching count, filter scope, exported columns, first-five sample, download action, cancel action, and no-match state understandable to an operations user.
   - Confirm the execution summary cites exact source paths for those user-visible states and does not claim rendered browser behavior unless the execution agent actually observes it.

The executor may adapt this plan when workspace evidence proves an assumption wrong, as long as the adaptation serves the full task contract and preserves the constraints.

**Validation plan**

Focused validation to run when feasible:
- `npm test`
- `python3 showcase/acceptance/check_preview.py`

Additional useful checks during implementation:
- Run targeted tests while developing, such as `node --test test/query.test.mjs test/server.test.mjs`, if the full suite is temporarily noisy.
- Manually inspect representative API responses with the local server or test helpers if needed:
  - `/api/export?page=2&pageSize=5` should still export all 137 customer records.
  - `/api/export?status=active&page=2&pageSize=5` should export all active matches, not the displayed page.
  - `/api/export-preview?status=active&page=2&pageSize=5` should return `total` for all active matches and a five-record `sample` from the beginning of the requested sort order.
  - `/api/export-preview?q=does-not-exist` should return `total: 0`, unchanged `columns`, and `sample: []`.
- If UI behavior is observed in a browser, record exactly what was checked; otherwise limit claims to implemented source and automated validation.

Criterion-to-evidence mapping:
- Behavior: `npm test && python3 showcase/acceptance/check_preview.py` should pass, with local regression tests covering export scope, CSV escaping, preview shape, preview sample, and no-match cases.
- Simplicity: source inspection should show shared filtering/ordering between listing, export, and preview; no added dependencies; no unrelated rewrites; small named helpers in existing modules.
- Operator clarity: source inspection should cite exact strings and paths showing full matching count, active filter scope, exported columns, sample label, download/cancel actions, no-match state, and stale-preview protection.

**Expected material change**

Expected changed files are likely:
- `src/customers.mjs`: shared matching/filter/sort helper plus existing paginated listing preserved.
- `src/export.mjs`: unpaginated export, CSV escaping, and preview payload helper using the same matching query.
- `src/server.mjs`: new `/api/export-preview` route.
- `public/index.html`: preview surface and export/cancel controls.
- `public/app.js`: preview fetch/render/download flow, shared query construction, stale-preview handling.
- `public/styles.css`: focused preview styling only.
- `test/query.test.mjs` and/or `test/server.test.mjs`: focused regression coverage.

Expected proof of progress:
- Independent checker no longer reports paginated export counts, CSV parsing errors, or `/api/export-preview` 404s.
- Local tests include meaningful regressions for the repaired failure modes rather than only smoke checks.
- Final summary documents cause, repaired behavior, changed files, actual command evidence, user-visible states with source references, and limitations.

**Remaining gap**

No intentional remaining product gap is expected after this execution if the implementation and validation above succeed. If browser rendering is not manually observed, the final summary should state that limitation explicitly and rely only on source and automated API/test evidence for UI claims.

**Risks or constraints**

- Do not edit `data/customers.json`, `TICKET.md`, `AGENTS.md`, or `EXPORT_PREVIEW.md`.
- Do not weaken, remove, or skip existing tests.
- Do not edit files outside this repository or change independent acceptance tools.
- Do not add dependencies, call remote services, secrets, or unrelated abstractions.
- Do not introduce unrelated interface redesign; keep the current dashboard design and listing behavior.
- Preserve the public routes and query semantics exactly: `/api/customers` remains paginated; `/api/export` and `/api/export-preview` preserve `q`, `status`, `segment`, and `sort` while ignoring pagination.
- Use plain JavaScript, two-space indentation, and small named functions matching current code.
