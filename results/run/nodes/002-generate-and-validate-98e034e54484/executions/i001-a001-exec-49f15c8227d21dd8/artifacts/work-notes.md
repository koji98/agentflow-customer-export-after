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
