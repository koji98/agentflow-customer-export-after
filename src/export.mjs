import { matchingCustomers } from './customers.mjs';

export const columns = ['id', 'name', 'company', 'email', 'status', 'segment', 'notes'];

function csvField(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function csvRow(customer) {
  return columns.map(column => csvField(customer[column])).join(',');
}

export function exportCustomers(customers, params) {
  const rows = matchingCustomers(customers, params);
  return [columns.join(','), ...rows.map(csvRow)].join('\r\n') + '\r\n';
}

export function previewExport(customers, params) {
  const rows = matchingCustomers(customers, params);
  return { total: rows.length, columns, sample: rows.slice(0, 5) };
}
