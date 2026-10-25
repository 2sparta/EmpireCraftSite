import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import './build.mjs';
const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8' };
const args = process.argv.slice(2);
const at = args.indexOf('--port');
const port = Number(process.env.PORT || (at >= 0 ? args[at + 1] : 3000));
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); res.end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); } catch { /* handled below */ }
    let body, status = 200;
    try { body = await readFile(file); } catch { body = await readFile(resolve(root, '404.html')); file = '404.html'; status = 404; }
    res.writeHead(status, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port, '0.0.0.0', () => console.log(`Empirecraft preview ready on port ${port}`));
