import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { articles } from '../content/articles.mjs';
import { site, categories } from '../content/site.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = resolve(root, 'dist');
async function walk(dir) {
  const values = [];
  for (const entry of await readdir(dir, { withFileTypes:true })) {
    const path = resolve(dir, entry.name);
    values.push(...(entry.isDirectory() ? await walk(path) : [path]));
  }
  return values;
}

test('wiki covers the custom mechanics and uses valid categories/related links', () => {
  const slugs = new Set(articles.map(a => a.slug));
  assert.equal(slugs.size, articles.length);
  assert.ok(articles.length >= 20);
  for (const required of ['vassals','politics','economy','provisions','calendar','sailing','create','fishing','smithing','restrictions']) assert.ok(slugs.has(required));
  for (const a of articles) {
    assert.match(a.slug, /^[a-z0-9-]+$/);
    assert.ok(categories.some(([id]) => id === a.category));
    assert.ok(a.sections.length >= 3);
    assert.ok(a.sources.length);
    a.related.forEach(id => assert.ok(slugs.has(id), `Missing related article ${id}`));
  }
});

test('all generated internal links, assets and anchors resolve', async () => {
  const files = (await walk(out)).filter(f => f.endsWith('.html'));
  assert.equal(files.length, articles.length + 6);
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, file);
    assert.ok(html.includes('lang="uk"'));
    assert.ok(!/undefined|\[object Object\]/.test(html), file);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      const [path, anchor] = href.split('#');
      const target = path ? resolve(path.startsWith('/') ? out : dirname(file), '.' + (path.startsWith('/') ? path : '/' + path), path.endsWith('/') ? 'index.html' : '') : file;
      await access(target).catch(() => assert.fail(`Broken link ${href} in ${file}`));
      if (anchor) {
        const content = await readFile(target, 'utf8');
        assert.ok(content.includes(`id="${anchor}"`), `Missing anchor ${href}`);
      }
    }
  }
});

test('inventory contains actual JARs, clear sides and no config-only phantom plugins', async () => {
  const inv = JSON.parse(await readFile(resolve(root, 'content/inventory.json'), 'utf8'));
  assert.equal(inv.mods.filter(m => m.sides.includes('client')).length, 99);
  assert.equal(inv.mods.filter(m => m.sides.includes('server')).length, 102);
  assert.equal(inv.plugins.length, 18);
  assert.equal(new Set(inv.mods.map(m => m.file)).size, inv.mods.length);
  assert.ok(inv.plugins.every(p => p.endsWith('.jar')));
  assert.ok(inv.mods.some(m => m.file === 'vs_sails-1.20.1-0.3.2-empirecraft.2-forge.jar'));
});

test('the exact requested Discord URL is present, and unknown server details are not invented', async () => {
  assert.equal(site.discord, 'https://discord.com/channels/@me');
  assert.equal(site.address, '');
  assert.equal(site.modpackUrl, '');
  for (const file of (await walk(out)).filter(f => f.endsWith('.html'))) assert.ok((await readFile(file, 'utf8')).includes(`href="${site.discord}"`));
});

test('Vercel configuration serves the real static output without an SPA catch-all', async () => {
  const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.framework, null);
  assert.ok(!config.rewrites);
  await access(resolve(out, '404.html'));
});

function element(dataset = {}) {
  return { dataset, hidden:false, value:'', disabled:false, textContent:'', attrs:{}, events:{},
    addEventListener(name, fn) { this.events[name] = fn; },
    setAttribute(k, v) { this.attrs[k] = v; }, getAttribute(k) { return this.attrs[k]; }, focus() {} };
}
const decode = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
async function filterHarness(path, query = '') {
  const html = await readFile(resolve(out, path), 'utf8');
  const entries = [...html.matchAll(/data-entry data-category="([^"]+)" data-search="([^"]*)"/g)].map(m => element({ category:m[1], search:decode(m[2]) }));
  const buttons = [...html.matchAll(/data-filter="([^"]+)"/g)].map(m => element({ filter:m[1] }));
  const controls = Object.fromEntries(['data-search-input','data-results','data-empty','data-clear','data-reset'].map(key => [key, element()]));
  const filterRoot = { dataset:{ kind:path.startsWith('wiki') ? 'wiki' : 'catalog' }, querySelector: selector => controls[selector.slice(1,-1)], querySelectorAll: selector => selector === '[data-filter]' ? buttons : entries };
  const location = { search:query, href:'https://example.test/' + path.replace('index.html','') + query };
  const context = { document:{ documentElement:{ classList:{ add() {} } }, querySelector:() => null, querySelectorAll:() => [filterRoot], addEventListener() {} }, location, history:{ replaceState(_a, _b, value) { location.last = value; } }, URL, URLSearchParams };
  vm.runInNewContext(await readFile(resolve(root, 'public/assets/site.js'), 'utf8'), context);
  return { entries, buttons, controls, location, visible:() => entries.filter(e => !e.hidden), input:value => { controls['data-search-input'].value = value; controls['data-search-input'].events.input(); }, category:value => buttons.find(b => b.dataset.filter === value).events.click() };
}

test('the actual search controller handles Ukrainian search, category combinations and URL state', async () => {
  const h = await filterHarness('wiki/index.html', '?q=%D0%BF%D1%80%D0%BE%D0%B2%D1%96%D0%B7%D1%96%D1%8F');
  assert.ok(h.visible().length > 0 && h.visible().length < articles.length);
  h.input('ПРОВІЗІЯ');
  assert.ok(h.visible().some(e => e.dataset.search.includes('Провізія та виживання міста')));
  h.category('economy');
  assert.ok(h.visible().length > 0);
  assert.ok(h.visible().every(e => e.dataset.category === 'economy'));
  assert.ok(h.location.last.includes('category=economy'));
  h.input('xyz-no-such-article');
  assert.equal(h.visible().length, 0);
  assert.equal(h.controls['data-empty'].hidden, false);
  h.controls['data-reset'].events.click();
  assert.equal(h.visible().length, articles.length);
  assert.equal(h.controls['data-empty'].hidden, true);
});

test('catalog filtering distinguishes plugins from mods and finds versioned files', async () => {
  const h = await filterHarness('mods/index.html');
  h.category('plugins');
  assert.equal(h.visible().length, 18);
  h.input('Towny');
  assert.equal(h.visible().length, 1);
  assert.ok(h.visible()[0].dataset.search.includes('Towny-0.101.2.0.jar'));
  h.controls['data-reset'].events.click();
  h.input('empirecraft.2');
  assert.ok(h.visible().some(e => e.dataset.search.includes('vs_sails')));
});
