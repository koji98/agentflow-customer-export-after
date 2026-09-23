const form = document.querySelector('#filters');
const body = document.querySelector('#customers');
const preview = document.querySelector('#export-preview');
let page = 1;
let requestNumber = 0;
let previewQuery = '';

function cell(value, className = '') {
  const td = document.createElement('td');
  td.textContent = value;
  if (className) td.className = className;
  return td;
}

function listingParams() {
  const params = new URLSearchParams(new FormData(form));
  params.set('page', page);
  params.set('pageSize', '25');
  return params;
}

function exportParams() {
  return new URLSearchParams(new FormData(form));
}

function selectedText(name) {
  const field = form.elements[name];
  return field.options[field.selectedIndex].textContent;
}

function filterScopeText() {
  const search = form.elements.q.value.trim();
  const parts = [
    search ? `search "${search}"` : 'any search text',
    selectedText('status').toLowerCase(),
    selectedText('segment').toLowerCase(),
    selectedText('sort').toLowerCase()
  ];
  return `Matching ${parts.join(', ')}.`;
}

function closePreview() {
  preview.hidden = true;
  previewQuery = '';
  document.querySelector('#preview-sample').replaceChildren();
}

function renderPreviewSample(sample) {
  const sampleBody = document.querySelector('#preview-sample');
  sampleBody.replaceChildren();
  for (const customer of sample) {
    const tr = document.createElement('tr');
    tr.append(
      cell(customer.id, 'customer-id'),
      cell(customer.name),
      cell(customer.company),
      cell(customer.email),
      cell(customer.status),
      cell(customer.segment, 'segment'),
      cell(customer.notes)
    );
    sampleBody.append(tr);
  }
}

function renderPreview(result, query) {
  previewQuery = query;
  document.querySelector('#preview-count').textContent = `${result.total} matching customers will be included in the full CSV download.`;
  document.querySelector('#preview-scope').textContent = filterScopeText();
  document.querySelector('#preview-columns').textContent = `Exported columns: ${result.columns.join(', ')}.`;
  document.querySelector('#preview-empty').hidden = result.total !== 0;
  document.querySelector('#preview-sample-wrap').hidden = result.total === 0;
  renderPreviewSample(result.sample);
  document.querySelector('#preview-download').disabled = false;
  preview.hidden = false;
}

async function openPreview() {
  const query = exportParams().toString();
  previewQuery = '';
  document.querySelector('#preview-download').disabled = true;
  document.querySelector('#preview-count').textContent = 'Loading export preview...';
  document.querySelector('#preview-scope').textContent = filterScopeText();
  document.querySelector('#preview-columns').textContent = '';
  document.querySelector('#preview-empty').hidden = true;
  document.querySelector('#preview-sample-wrap').hidden = true;
  preview.hidden = false;
  try {
    const response = await fetch(`/api/export-preview?${query}`);
    if (!response.ok) throw new Error('Could not load export preview. Please try again.');
    const result = await response.json();
    if (query !== exportParams().toString()) {
      closePreview();
      return;
    }
    renderPreview(result, query);
    document.querySelector('#error').hidden = true;
  } catch (error) {
    closePreview();
    document.querySelector('#error').textContent = error.message;
    document.querySelector('#error').hidden = false;
  }
}

async function refresh() {
  const currentRequest = ++requestNumber;
  const params = listingParams();
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
    document.querySelector('#export-scope').textContent = `Export includes all ${result.total} matching customers, across every page.`;
    document.querySelector('#error').hidden = true;
  } catch (error) {
    if (currentRequest !== requestNumber) return;
    document.querySelector('#error').textContent = error.message;
    document.querySelector('#error').hidden = false;
  }
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', () => { page = 1; closePreview(); refresh(); });
document.querySelector('#previous').addEventListener('click', () => { page -= 1; refresh(); });
document.querySelector('#next').addEventListener('click', () => { page += 1; refresh(); });
document.querySelector('#export').addEventListener('click', openPreview);
document.querySelector('#preview-cancel').addEventListener('click', closePreview);
document.querySelector('#preview-close').addEventListener('click', closePreview);
document.querySelector('#preview-download').addEventListener('click', () => {
  if (!previewQuery || previewQuery !== exportParams().toString()) {
    closePreview();
    return;
  }
  window.location.href = `/api/export?${previewQuery}`;
});
fetch('/api/stats').then(response => response.json()).then(stats => {
  for (const name of ['total', 'active', 'enterprise']) document.querySelector(`#${name}`).textContent = stats[name];
}).catch(() => {});
refresh();
