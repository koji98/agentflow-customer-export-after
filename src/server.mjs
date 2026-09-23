import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { queryCustomers } from './customers.mjs';
import { exportCustomers, previewExport } from './export.mjs';

const customers = JSON.parse(readFileSync(new URL('../data/customers.json', import.meta.url), 'utf8'));
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']]
]);

export function createApp() {
  return createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' }).end('Method not allowed');
      return;
    }
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/api/customers') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(queryCustomers(customers, url.searchParams)));
    } else if (url.pathname === '/api/export') {
      response.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="customers.csv"'
      });
      response.end(exportCustomers(customers, url.searchParams));
    } else if (url.pathname === '/api/export-preview') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(previewExport(customers, url.searchParams)));
    } else if (url.pathname === '/api/stats') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ total: customers.length, active: customers.filter(row => row.status === 'active').length, enterprise: customers.filter(row => row.segment === 'enterprise').length }));
    } else if (assets.has(url.pathname)) {
      const [filename, contentType] = assets.get(url.pathname);
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(readFileSync(new URL(`../public/${filename}`, import.meta.url)));
    } else {
      response.writeHead(404).end('Not found');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createApp();
  server.listen(Number(process.env.PORT || 4317), '127.0.0.1', () => {
    console.log(`Northstar ready at http://127.0.0.1:${server.address().port}`);
  });
  process.on('SIGTERM', () => server.close());
  process.on('SIGINT', () => server.close());
}
