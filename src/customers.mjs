function positiveInteger(value, fallback, maximum) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}

export function queryCustomers(customers, params) {
  const matches = matchingCustomers(customers, params);
  const page = positiveInteger(params.get('page'), 1, 100000);
  const pageSize = positiveInteger(params.get('pageSize'), 25, 100);
  const start = (page - 1) * pageSize;
  return { rows: matches.slice(start, start + pageSize), total: matches.length, page, pageSize };
}

export function matchingCustomers(customers, params) {
  const search = (params.get('q') || '').trim().toLowerCase();
  const status = params.get('status') || 'all';
  const segment = params.get('segment') || 'all';
  const matches = customers.filter(customer => {
    const haystack = [customer.id, customer.name, customer.company, customer.email].join(' ').toLowerCase();
    return (!search || haystack.includes(search))
      && (status === 'all' || customer.status === status)
      && (segment === 'all' || customer.segment === segment);
  });
  matches.sort((a, b) => params.get('sort') === 'id_desc' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
  return matches;
}
