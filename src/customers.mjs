function positiveInteger(value, fallback, maximum) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}

function queryScope(params) {
  return {
    search: (params.get('q') || '').trim().toLowerCase(),
    status: params.get('status') || 'all',
    segment: params.get('segment') || 'all',
    sort: params.get('sort') || 'id_asc'
  };
}

function customerMatches(customer, scope) {
  const haystack = [customer.id, customer.name, customer.company, customer.email].join(' ').toLowerCase();
  return (!scope.search || haystack.includes(scope.search))
    && (scope.status === 'all' || customer.status === scope.status)
    && (scope.segment === 'all' || customer.segment === scope.segment);
}

function compareCustomers(scope) {
  return (a, b) => scope.sort === 'id_desc' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
}

export function matchingCustomers(customers, params) {
  const scope = queryScope(params);
  return customers.filter(customer => customerMatches(customer, scope)).sort(compareCustomers(scope));
}

export function queryCustomers(customers, params) {
  const page = positiveInteger(params.get('page'), 1, 100000);
  const pageSize = positiveInteger(params.get('pageSize'), 25, 100);
  const matches = matchingCustomers(customers, params);
  const start = (page - 1) * pageSize;
  return { rows: matches.slice(start, start + pageSize), total: matches.length, page, pageSize };
}
