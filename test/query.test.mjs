import test from 'node:test';
import assert from 'node:assert/strict';
import { matchingCustomers, queryCustomers } from '../src/customers.mjs';

const customers = [
  { id: 'C001', name: 'Maya Chen', company: 'Acme, Inc.', email: 'maya@example.test', status: 'active', segment: 'growth' },
  { id: 'C002', name: 'Jon Bell', company: 'Birch', email: 'jon@example.test', status: 'inactive', segment: 'starter' },
  { id: 'C003', name: 'Amara Okafor', company: 'Acme, Inc.', email: 'amara@example.test', status: 'active', segment: 'growth' }
];

test('listing paginates after filtering and preserves total', () => {
  const result = queryCustomers(customers, new URLSearchParams('status=active&page=2&pageSize=1'));
  assert.equal(result.total, 2);
  assert.deepEqual(result.rows.map(row => row.id), ['C003']);
});

test('search and segment combine, with descending ID order', () => {
  const result = queryCustomers(customers, new URLSearchParams('q=ACME&segment=growth&sort=id_desc'));
  assert.deepEqual(result.rows.map(row => row.id), ['C003', 'C001']);
});

test('zero matches and invalid pagination have safe defaults', () => {
  const result = queryCustomers(customers, new URLSearchParams('q=missing&page=-2&pageSize=no'));
  assert.equal(result.total, 0);
  assert.deepEqual(result.rows, []);
  assert.equal(result.page, 1);
  assert.equal(result.pageSize, 25);
});

test('matching customers preserve filters and order without pagination', () => {
  const result = matchingCustomers(customers, new URLSearchParams('q=acme&status=active&segment=growth&sort=id_desc&page=2&pageSize=1'));
  assert.deepEqual(result.map(row => row.id), ['C003', 'C001']);
});
