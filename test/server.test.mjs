import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/server.mjs';

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
