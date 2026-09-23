import { queryCustomers } from './customers.mjs';

export const columns = ['id', 'name', 'company', 'email', 'status', 'segment', 'notes'];

export function exportCustomers(customers, params) {
  const { rows } = queryCustomers(customers, params);
  return [columns.join(','), ...rows.map(customer => columns.map(column => customer[column]).join(','))].join('\r\n') + '\r\n';
}
