(() => {
  const root = document.querySelector('[data-controls-root]');
  if (!root) return;
  const keys = [...root.querySelectorAll('button[data-key]')];
  const entries = [...root.querySelectorAll('[data-binding]')];
  const input = root.querySelector('[data-controls-search]');
  const group = root.querySelector('[data-controls-group]');
  const unassigned = root.querySelector('[data-controls-unassigned]');
  const title = root.querySelector('[data-selected-title]');
  const status = root.querySelector('[data-controls-status]');
  const empty = root.querySelector('[data-controls-empty]');
  const normalize = value => value.toLocaleLowerCase('uk').replace(/control/g, 'ctrl').replace(/[’ʼ`]/g, "'").replace(/\s*\+\s*/g, ' ').replace(/\s+/g, ' ').trim();
  const texts = entries.map(e => normalize(e.dataset.search));
  const modifierFor = key => /^(left|right)\.control$/.test(key) ? 'CONTROL' : /^(left|right)\.shift$/.test(key) ? 'SHIFT' : /^(left|right)\.alt$/.test(key) ? 'ALT' : null;
  const matchesKey = (entry, key) => entry.dataset.key === key || (modifierFor(key) !== null && entry.dataset.modifier === modifierFor(key));
  let selected = null;
  function update() {
    const words = normalize(input.value).split(' ').filter(Boolean);
    const eligible = entries.filter((entry, i) => (group.value === 'all' || group.value === entry.dataset.group) && (!unassigned.checked || entry.dataset.key === 'unknown') && words.every(word => word.length === 1 && /[\p{L}\p{N}]/u.test(word) ? texts[i].split(/[^\p{L}\p{N}]+/u).includes(word) : texts[i].includes(word)));
    const visible = eligible.filter(entry => selected === null || matchesKey(entry, selected));
    const visibleSet = new Set(visible);
    entries.forEach(entry => { entry.hidden = !visibleSet.has(entry); });
    keys.forEach(key => {
      key.setAttribute('aria-pressed', String(key.dataset.key === selected));
      key.classList.toggle('is-match', (words.length > 0 || group.value !== 'all') && eligible.some(entry => matchesKey(entry, key.dataset.key)));
    });
    title.textContent = selected ? `Клавіша ${keys.find(k => k.dataset.key === selected).dataset.label}` : 'Усі клавіші та дії';
    status.textContent = `Знайдено дій: ${visible.length}${selected ? ' · обрано клавішу' : ''}`;
    empty.hidden = visible.length !== 0;
  }
  function choose(key) {
    selected = key;
    // A key selection starts a fresh lookup, so previous search filters cannot hide its actions.
    input.value = ''; group.value = 'all'; unassigned.checked = false;
    update();
  }
  keys.forEach(key => key.addEventListener('click', () => choose(key.dataset.key)));
  input.addEventListener('input', () => { selected = null; update(); });
  group.addEventListener('change', update);
  unassigned.addEventListener('change', () => { selected = null; update(); });
  root.querySelector('[data-controls-reset]').addEventListener('click', () => {
    selected = null; input.value = ''; group.value = 'all'; unassigned.checked = false; update();
  });
  const keyboard = root.querySelector('[data-keyboard]');
  keyboard.addEventListener('keydown', event => {
    // Capture only inside the keyboard diagram. Leave browser/system shortcuts and Tab intact.
    if (event.key === 'Tab' || event.metaKey || event.ctrlKey || event.altKey) return;
    if ((event.key === 'Enter' || event.code === 'Space') && event.target.closest('button')) return;
    const key = keys.find(k => k.dataset.code && k.dataset.code === event.code);
    if (!key) return;
    event.preventDefault();
    choose(key.dataset.key);
  });
  update();
})();
