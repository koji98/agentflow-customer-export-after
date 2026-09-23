# Northstar customer operations

A small local customer dashboard with synthetic data. Node 24; no dependencies.

```sh
npm start
npm test
```

Open http://127.0.0.1:4317. Override `PORT` to run a second copy.

The existing smoke tests exercise listing, filters, pagination, HTTP responses, and a simple export. The open product defect is described in `TICKET.md`. Passing the existing suite alone does not resolve that ticket.

The implementation lives in `src/`; the interface is in `public/`; the canonical 137-customer fixture is in `data/customers.json`.

API: `GET /api/customers` and `GET /api/export` accept `q`, `status` (`all`, `active`, `inactive`), `segment` (`all`, `starter`, `growth`, `enterprise`), `sort` (`id_asc`, `id_desc`), `page`, and `pageSize`. Search matches ID, name, company, or email case-insensitively. The export contract ignores pagination but preserves all other query semantics. `GET /api/stats` returns workspace totals.
