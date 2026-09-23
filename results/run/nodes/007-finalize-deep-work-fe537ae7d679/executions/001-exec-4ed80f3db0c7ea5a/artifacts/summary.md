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
