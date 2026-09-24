const form = document.querySelector('#filters');
const body = document.querySelector('#customers');
const previewDialog = document.querySelector('#export-preview');
let page = 1;
let requestNumber = 0;
let previewRequestNumber = 0;

function cell(value, className = '') {
  const td = document.createElement('td');
  td.textContent = value;
  if (className) td.className = className;
  return td;
}

function exportParams() {
  return new URLSearchParams(new FormData(form));
}

function describeScope(params) {
  const search = params.get('q').trim();
  const status = params.get('status') === 'all' ? 'any status' : `${params.get('status')} status`;
  const segment = params.get('segment') === 'all' ? 'any segment' : `${params.get('segment')} segment`;
  const order = params.get('sort') === 'id_desc' ? 'customer ID descending' : 'customer ID ascending';
  return `Filters: ${search ? `search “${search}”` : 'any search'}, ${status}, ${segment}; ordered by ${order}.`;
}

function renderPreviewTable(preview) {
  const head = document.querySelector('#preview-head');
  const rows = document.querySelector('#preview-rows');
  const heading = document.createElement('tr');
  for (const column of preview.columns) heading.append(cell(column));
  head.replaceChildren(heading);
  rows.replaceChildren();
  for (const customer of preview.sample) {
    const row = document.createElement('tr');
    for (const column of preview.columns) row.append(cell(customer[column]));
    rows.append(row);
  }
}

function closePreview() {
  previewRequestNumber += 1;
  if (previewDialog.open) previewDialog.close();
}

async function openPreview() {
  const params = exportParams();
  const query = params.toString();
  const currentRequest = ++previewRequestNumber;
  const loading = document.querySelector('#preview-loading');
  const content = document.querySelector('#preview-content');
  const errorMessage = document.querySelector('#preview-error');
  const download = document.querySelector('#preview-download');
  loading.hidden = false;
  content.hidden = true;
  errorMessage.hidden = true;
  download.hidden = true;
  download.removeAttribute('href');
  if (!previewDialog.open) previewDialog.showModal();
  try {
    const response = await fetch(`/api/export-preview?${query}`);
    if (!response.ok) throw new Error('Could not prepare the export preview. Please try again.');
    const preview = await response.json();
    if (currentRequest !== previewRequestNumber) return;
    document.querySelector('#preview-count').textContent = preview.total === 1
      ? 'This download contains 1 matching customer.'
      : `This download contains ${preview.total} matching customers.`;
    document.querySelector('#preview-scope').textContent = describeScope(params);
    document.querySelector('#preview-columns').textContent = `Exported columns: ${preview.columns.join(', ')}.`;
    document.querySelector('#preview-sample-label').textContent = preview.total > 5
      ? `Sample: first five matching records. The complete CSV download contains all ${preview.total} matching customers.`
      : `Sample: all ${preview.total} matching records are shown. The complete CSV contains the same records.`;
    const empty = document.querySelector('#preview-empty');
    empty.textContent = 'No customers match these filters. The CSV download will contain only the column headers.';
    empty.hidden = preview.total !== 0;
    document.querySelector('#preview-table-wrap').hidden = preview.total === 0;
    renderPreviewTable(preview);
    download.href = `/api/export?${query}`;
    download.hidden = false;
    loading.hidden = true;
    content.hidden = false;
  } catch (error) {
    if (currentRequest !== previewRequestNumber) return;
    loading.hidden = true;
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
  }
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
    document.querySelector('#export-scope').textContent = `Preview and download all ${result.total} matching customers, across every page.`;
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
document.querySelector('#preview-close').addEventListener('click', closePreview);
document.querySelector('#preview-cancel').addEventListener('click', closePreview);
previewDialog.addEventListener('cancel', () => { previewRequestNumber += 1; });
fetch('/api/stats').then(response => response.json()).then(stats => {
  for (const name of ['total', 'active', 'enterprise']) document.querySelector(`#${name}`).textContent = stats[name];
}).catch(() => {});
refresh();
