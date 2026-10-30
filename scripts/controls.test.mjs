import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { parseBindings, allKeys, shortcutLabel } from '../content/controls.mjs';

const source = await readFile(new URL('../content/keybindings.txt', import.meta.url), 'utf8');
const bindings = parseBindings(source);
const html = await readFile(new URL('../dist/controls/index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../public/assets/controls.js', import.meta.url), 'utf8');
const decode = text => text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
function element(dataset = {}) {
  return { dataset, hidden:false, value:'', checked:false, textContent:'', attrs:{}, events:{}, classes:new Set(),
    addEventListener(name, fn) { this.events[name] = fn; },
    setAttribute(name, value) { this.attrs[name] = value; },
    classList:{ toggle() {} },
  };
}
function harness() {
  const entries = [...html.matchAll(/<li data-binding data-key="([^"]+)" data-modifier="([^"]+)" data-group="([^"]+)" data-search="([^"]*)"/g)].map(m => element({key:decode(m[1]),modifier:m[2],group:m[3],search:decode(m[4])}));
  const keys = [...html.matchAll(/data-key="([^"]+)" data-code="([^"]*)" data-label="([^"]*)"/g)].map(m=>element({key:decode(m[1]),code:m[2],label:decode(m[3])}));
  const selectors = ['data-controls-search','data-controls-group','data-controls-unassigned','data-selected-title','data-controls-status','data-controls-empty','data-controls-reset','data-keyboard'];
  const controls = Object.fromEntries(selectors.map(name=>[name,element()]));
  controls['data-controls-group'].value = 'all';
  const root = {querySelector:s=>controls[s.slice(1,-1)],querySelectorAll:s=>s==='[data-binding]'?entries:keys};
  vm.runInNewContext(script,{document:{querySelector:()=>root}});
  return {keys,entries,controls,visible:()=>entries.filter(e=>!e.hidden),
    choose:key=>keys.find(k=>k.dataset.key===key).events.click(),
    search:value=>{controls['data-controls-search'].value=value;controls['data-controls-search'].events.input();},
    group:value=>{controls['data-controls-group'].value=value;controls['data-controls-group'].events.change();},
    reset:()=>controls['data-controls-reset'].events.click(),
  };
}

test('all supplied key bindings are documented, rendered and mapped without other client settings', () => {
  assert.equal(bindings.length,162);
  assert.equal(bindings.filter(b=>b.key==='unknown').length,38);
  assert.equal((html.match(/<li data-binding /g)||[]).length,bindings.length);
  assert.ok(source.split('\n').every(line=>!line || line.startsWith('key_')));
  assert.ok(bindings.every(b=>b.label && (b.key==='unknown'||allKeys.some(k=>k.id===b.key))));
  assert.equal(bindings.find(b=>b.id==='key.drop').key,'g');
  assert.equal(bindings.find(b=>b.id==='key.push_to_talk').key,'unknown');
  assert.equal(shortcutLabel(bindings.find(b=>b.id==='key.journeymap.minimap_toggle_alt')),'Ctrl + J');
  assert.equal(shortcutLabel(bindings.find(b=>b.id==='key.jei.cheatItemStack')),'Shift + ЛКМ');
  assert.throws(()=>parseBindings(source + source.split('\n')[0]), /Invalid/);
  assert.throws(()=>parseBindings('key_key.new_action:key.keyboard.g'), /undocumented/);
  assert.throws(()=>parseBindings('key_key.jump:key.keyboard.space:META'), /Invalid/);
  assert.throws(()=>parseBindings('key_key.jump:key.keyboard.space:SHIFT:CONTROL'), /Invalid/);
});

test('real controller preserves shared bindings, mouse combinations, modifiers and no-binding states', () => {
  const h = harness();
  assert.equal(h.visible().length,162);
  h.choose('j');
  assert.deepEqual(h.visible().map(e=>e.dataset.modifier),['NONE','CONTROL']);
  assert.match(h.controls['data-selected-title'].textContent,/J/);
  h.choose('mouse.left');
  assert.ok(h.visible().some(e=>e.dataset.modifier==='SHIFT'));
  assert.ok(h.visible().some(e=>e.dataset.modifier==='CONTROL'));
  h.choose('left.control');
  assert.ok(h.visible().some(e=>e.dataset.search.includes('Ctrl + J')));
  assert.ok(h.visible().some(e=>e.dataset.search.includes('Біг')));
  h.choose('keypad.0');
  assert.equal(h.visible().length,1);
  assert.match(h.visible()[0].dataset.search,/Налаштування Jade/);
  h.choose('f1');
  assert.equal(h.visible().length,0);
  assert.equal(h.controls['data-controls-empty'].hidden,false);
  h.reset();
  assert.equal(h.visible().length,162);
  assert.ok(h.keys.every(k=>k.attrs['aria-pressed']==='false'));
});

test('Ukrainian search, shortcut search, theme filters, unassigned actions and reset work together', () => {
  const h = harness();
  h.search('МІКРОФОН');
  assert.equal(h.visible().length,1);
  assert.equal(h.visible()[0].dataset.key,'m');
  h.group('map');
  assert.equal(h.visible().length,0);
  h.choose('j'); // Selecting a key clears stale filters.
  assert.equal(h.visible().length,2);
  h.search('Ctrl+J');
  assert.equal(h.visible().length,1);
  assert.equal(h.visible()[0].dataset.modifier,'CONTROL');
  h.reset(); h.group('voice');
  assert.ok(h.visible().every(e=>e.dataset.group==='voice'));
  h.controls['data-controls-unassigned'].checked=true;
  h.controls['data-controls-unassigned'].events.change();
  assert.ok(h.visible().length>0 && h.visible().every(e=>e.dataset.key==='unknown'));
  h.reset();
  assert.equal(h.controls['data-controls-group'].value,'all');
  assert.equal(h.controls['data-controls-unassigned'].checked,false);
  assert.equal(h.visible().length,162);
});

test('physical keys use their position while Tab, native button activation and browser shortcuts stay intact', () => {
  const h = harness();
  const keydown=h.controls['data-keyboard'].events.keydown;
  let prevented=false;
  const event={key:'ц',code:'KeyW',target:{closest:()=>null},preventDefault(){prevented=true;}};
  keydown(event);
  assert.equal(prevented,true);
  assert.ok(h.visible().some(e=>e.dataset.search.includes('Рух уперед')));
  for (const e of [{key:'Tab',code:'Tab'},{key:'f',code:'KeyF',ctrlKey:true},{key:'Enter',code:'Enter',target:{closest:()=>({})}}]) {
    prevented=false; keydown({...event,...e}); assert.equal(prevented,false);
  }
});
