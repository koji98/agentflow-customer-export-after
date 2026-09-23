# OPS-215: Let operators inspect an export before downloading

Resolve OPS-214 in TICKET.md and add a small export preview to the existing Customers dashboard. Morgan should be able to check what a file will contain before downloading it.

## User outcome

The export action opens a preview containing:

- The total number of customers matching the current search, status, segment, and sort, across all pages.
- A plain-language summary of the active filters and exported columns.
- The first five matching records, clearly labeled as a sample rather than the full export.
- An unambiguous download action and a cancel/close action that does not download anything.
- A useful no-match state explaining that a download will contain only column headers.

The preview and subsequent download must use the same query. Opening a preview on page two must still show the full matching count and the first five matching records. Prevent stale preview information from being used for a different query. Keep the existing dashboard design and listing behavior.

## Stable HTTP contract for independent checks

`GET /api/export-preview` takes the same query parameters as `/api/export`. It returns JSON:

```json
{
  "total": 103,
  "columns": ["id", "name", "company", "email", "status", "segment", "notes"],
  "sample": []
}
```

`total` is the full matching count. `sample` contains the first `min(5, total)` full customer objects in the requested order, retaining exact field values. Both ignore page and pageSize. No matches returns total=0 and sample=[], with columns unchanged. The example count is illustrative; compute from the real fixture and query.

The existing export contract remains authoritative for actual CSV output. The new preview is an additional feature, not a replacement for a correct download.

## Quality bar

Prefer the smallest clear change consistent with the current code. Share filtering/ordering semantics where appropriate; do not add a framework, generic export platform, dependencies, or unnecessary indirection. The preview copy should help an operations user distinguish matching count, sample size, and downloaded records without reading technical documentation.

Publish a concise summary of the repair and preview with validation evidence, source references for the user-visible states, and limitations. Do not claim browser behavior or visual quality was checked unless it was actually observed. Do not edit this contract, TICKET.md, AGENTS.md, or the canonical customer data.
