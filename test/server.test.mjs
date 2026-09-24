import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/server.mjs';
import { columns, exportCustomers, previewCustomers } from '../src/export.mjs';

let server;
let base;
before(async () => {
  server = createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));

test('customer API returns a paginated synthetic dataset', async () => {
  const response = await fetch(`${base}/api/customers`);
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.total, 137);
  assert.equal(data.rows.length, 25);
  assert.equal(data.rows[0].id, 'C001');
});

test('dashboard and CSV download are served with appropriate content types', async () => {
  const dashboard = await fetch(base);
  assert.match(dashboard.headers.get('content-type'), /text\/html/);
  assert.match(await dashboard.text(), /Customers/);
  const csv = await fetch(`${base}/api/export?q=C010`);
  assert.match(csv.headers.get('content-type'), /text\/csv/);
  assert.match(csv.headers.get('content-disposition'), /attachment/);
  assert.match(await csv.text(), /C010/);
});

test('unknown paths and mutation requests are rejected', async () => {
  assert.equal((await fetch(`${base}/missing`)).status, 404);
  assert.equal((await fetch(`${base}/api/customers`, { method: 'POST' })).status, 405);
});

test('CSV export ignores pagination and safely preserves all seven fields', () => {
  const customers = [
    { id: 'C001', name: 'Zoë "Z"', company: 'Acme, Inc.', email: '', status: 'active', segment: 'growth', notes: 'Line one\nLine two\r\nFinal' },
    { id: 'C002', name: '李雷', company: 'Plain Co', email: 'li@example.test', status: 'inactive', segment: 'starter', notes: '' }
  ];
  const csv = exportCustomers(customers, new URLSearchParams('page=2&pageSize=1'));
  assert.equal(csv, [
    'id,name,company,email,status,segment,notes',
    'C001,"Zoë ""Z""","Acme, Inc.",,active,growth,"Line one\nLine two\r\nFinal"',
    'C002,李雷,Plain Co,li@example.test,inactive,starter,',
    ''
  ].join('\r\n'));
});

test('CSV export returns only its stable header when no customers match', () => {
  const csv = exportCustomers([], new URLSearchParams());
  assert.equal(csv, `${columns.join(',')}\r\n`);
});

test('preview returns the full count and first five ordered matches without pagination', () => {
  const customers = Array.from({ length: 7 }, (_, index) => ({
    id: `C00${index + 1}`,
    name: `Customer ${index + 1}`,
    company: 'Acme',
    email: `customer${index + 1}@example.test`,
    status: 'active',
    segment: 'growth',
    notes: index === 0 ? 'Exact sample value' : ''
  }));
  const preview = previewCustomers(customers, new URLSearchParams('sort=id_desc&page=3&pageSize=1'));
  assert.equal(preview.total, 7);
  assert.deepEqual(preview.columns, columns);
  assert.deepEqual(preview.sample, customers.slice().reverse().slice(0, 5));
});

test('preview API follows the same filtered query and ignores listing pagination', async () => {
  const query = 'status=active&segment=growth&sort=id_desc&page=2&pageSize=1';
  const response = await fetch(`${base}/api/export-preview?${query}`);
  const preview = await response.json();
  const listingResponse = await fetch(`${base}/api/customers?status=active&segment=growth&sort=id_desc&page=1&pageSize=5`);
  const listing = await listingResponse.json();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  assert.equal(preview.total, listing.total);
  assert.deepEqual(preview.columns, columns);
  assert.deepEqual(preview.sample, listing.rows);
});

test('preview API returns an empty sample and stable columns for no matches', async () => {
  const response = await fetch(`${base}/api/export-preview?q=does-not-exist`);
  assert.deepEqual(await response.json(), { total: 0, columns, sample: [] });
});

test('dashboard source exposes a labeled preview, download, cancel, and no-match state', async () => {
  const dashboard = await (await fetch(base)).text();
  const script = await (await fetch(`${base}/app.js`)).text();
  assert.match(dashboard, /Export preview/);
  assert.match(dashboard, /Download complete CSV/);
  assert.match(dashboard, /Cancel/);
  assert.match(script, /first five matching records/i);
  assert.match(script, /only the column headers/i);
  assert.match(script, /\/api\/export-preview/);
});
