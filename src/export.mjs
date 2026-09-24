import { matchingCustomers } from './customers.mjs';

export const columns = ['id', 'name', 'company', 'email', 'status', 'segment', 'notes'];

function encodeCsvField(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function exportCustomers(customers, params) {
  const matches = matchingCustomers(customers, params);
  const rows = matches.map(customer => columns.map(column => encodeCsvField(customer[column])).join(','));
  return [columns.join(','), ...rows].join('\r\n') + '\r\n';
}

export function previewCustomers(customers, params) {
  const matches = matchingCustomers(customers, params);
  return { total: matches.length, columns: [...columns], sample: matches.slice(0, 5) };
}
