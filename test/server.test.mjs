import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { createApp } from '../src/server.mjs';
import { columns, exportCustomers } from '../src/export.mjs';

const customers = JSON.parse(readFileSync(new URL('../data/customers.json', import.meta.url), 'utf8'));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\r' && text[index + 1] === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      index += 1;
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

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

test('CSV export includes all filtered records and ignores pagination', async () => {
  const response = await fetch(`${base}/api/export?status=active&segment=growth&sort=id_desc&page=2&pageSize=1`);
  const rows = parseCsv(await response.text());
  const expected = customers
    .filter(customer => customer.status === 'active' && customer.segment === 'growth')
    .sort((a, b) => b.id.localeCompare(a.id));

  assert.deepEqual(rows[0], columns);
  assert.equal(rows.length - 1, expected.length);
  assert.deepEqual(rows.slice(1).map(row => row[0]), expected.map(customer => customer.id));
});

test('CSV export preserves commas, quotes, line breaks, empty text, and Unicode', () => {
  const fixture = [
    { id: 'C900', name: 'Zoë Ray', company: 'Comma, Quote "Works"', email: 'zoe@example.test', status: 'active', segment: 'growth', notes: 'First line\nSecond line\r\nUnicode snowman ☃' },
    { id: 'C901', name: 'Empty Notes', company: '', email: 'empty@example.test', status: 'inactive', segment: 'starter', notes: '' }
  ];

  const rows = parseCsv(exportCustomers(fixture, new URLSearchParams('page=2&pageSize=1')));

  assert.deepEqual(rows, [
    columns,
    columns.map(column => fixture[0][column]),
    columns.map(column => fixture[1][column])
  ]);
});

test('CSV export returns headers only when filters match no customers', async () => {
  const response = await fetch(`${base}/api/export?q=no-such-customer`);
  assert.deepEqual(parseCsv(await response.text()), [columns]);
});

test('export preview returns count, columns, and first five matching records', async () => {
  const response = await fetch(`${base}/api/export-preview?status=active&segment=growth&sort=id_desc&page=2&pageSize=1`);
  const preview = await response.json();
  const expected = customers
    .filter(customer => customer.status === 'active' && customer.segment === 'growth')
    .sort((a, b) => b.id.localeCompare(a.id));

  assert.equal(response.status, 200);
  assert.equal(preview.total, expected.length);
  assert.deepEqual(preview.columns, columns);
  assert.deepEqual(preview.sample, expected.slice(0, 5));
});

test('export preview returns unchanged columns and empty sample for no matches', async () => {
  const response = await fetch(`${base}/api/export-preview?q=no-such-customer`);
  const preview = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(preview, { total: 0, columns, sample: [] });
});

test('unknown paths and mutation requests are rejected', async () => {
  assert.equal((await fetch(`${base}/missing`)).status, 404);
  assert.equal((await fetch(`${base}/api/customers`, { method: 'POST' })).status, 405);
});
