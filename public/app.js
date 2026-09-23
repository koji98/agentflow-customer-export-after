const form = document.querySelector('#filters');
const body = document.querySelector('#customers');
let page = 1;
let requestNumber = 0;

function cell(value, className = '') {
  const td = document.createElement('td');
  td.textContent = value;
  if (className) td.className = className;
  return td;
}

async function refresh() {
  const currentRequest = ++requestNumber;
  const params = new URLSearchParams(new FormData(form));
  params.set('page', page);
  params.set('pageSize', '25');
  try {
    const response = await fetch(`/api/customers?${params}`);
    if (!response.ok) throw new Error('Could not load customers. Please try again.');
    const result = await response.json();
    if (currentRequest !== requestNumber) return;
    body.replaceChildren();
    for (const customer of result.rows) {
      const tr = document.createElement('tr');
      const identity = cell('');
      const person = document.createElement('div');
      person.className = 'person';
      const avatar = document.createElement('span');
      avatar.className = `person-avatar tone-${Number(customer.id.slice(1)) % 4}`;
      avatar.textContent = customer.name.split(' ').map(part => part[0]).slice(0, 2).join('');
      const name = document.createElement('span');
      name.textContent = customer.name;
      const email = document.createElement('small');
      email.textContent = customer.email;
      name.append(email);
      person.append(avatar, name);
      identity.append(person);
      const status = cell('');
      const badge = document.createElement('span');
      badge.className = `badge ${customer.status}`;
      badge.textContent = customer.status;
      status.append(badge);
      tr.append(identity, cell(customer.company), status, cell(customer.segment, 'segment'), cell(customer.id, 'customer-id'));
      body.append(tr);
    }
    document.querySelector('#matching-count').textContent = result.total;
    document.querySelector('#empty').hidden = result.total !== 0;
    const start = result.total ? (page - 1) * 25 + 1 : 0;
    document.querySelector('#range').textContent = `Showing ${start}–${Math.min(page * 25, result.total)} of ${result.total} customers`;
    document.querySelector('#page-label').textContent = `${page} / ${Math.max(1, Math.ceil(result.total / 25))}`;
    document.querySelector('#previous').disabled = page <= 1;
    document.querySelector('#next').disabled = page * 25 >= result.total;
    document.querySelector('#export').href = `/api/export?${params}`;
    document.querySelector('#export-scope').textContent = `Export includes all ${result.total} matching customers, across every page.`;
    document.querySelector('#error').hidden = true;
  } catch (error) {
    if (currentRequest !== requestNumber) return;
    document.querySelector('#error').textContent = error.message;
    document.querySelector('#error').hidden = false;
  }
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', () => { page = 1; refresh(); });
document.querySelector('#previous').addEventListener('click', () => { page -= 1; refresh(); });
document.querySelector('#next').addEventListener('click', () => { page += 1; refresh(); });
fetch('/api/stats').then(response => response.json()).then(stats => {
  for (const name of ['total', 'active', 'enterprise']) document.querySelector(`#${name}`).textContent = stats[name];
}).catch(() => {});
refresh();
