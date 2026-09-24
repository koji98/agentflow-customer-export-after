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
