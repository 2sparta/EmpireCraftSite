document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); menu.focus();
  }
});

const normalize = value => value.toLocaleLowerCase('uk').replace(/[’ʼ`]/g, "'").replace(/\s+/g, ' ').trim();
for (const root of document.querySelectorAll('[data-filter-root]')) {
  const input = root.querySelector('[data-search-input]');
  const buttons = [...root.querySelectorAll('[data-filter]')];
  const entries = [...root.querySelectorAll('[data-entry]')];
  const status = root.querySelector('[data-results]');
  const empty = root.querySelector('[data-empty]');
  const params = new URLSearchParams(location.search);
  let filter = buttons.some(b => b.dataset.filter === params.get('category')) ? params.get('category') : 'all';
  input.value = params.get('q') || '';
  const texts = entries.map(e => normalize(e.dataset.search));
  function update(writeUrl = true) {
    const words = normalize(input.value).split(' ').filter(Boolean);
    let count = 0;
    entries.forEach((entry, i) => {
      const show = (filter === 'all' || entry.dataset.category === filter) && words.every(word => texts[i].includes(word));
      entry.hidden = !show;
      if (show) count++;
    });
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    status.textContent = `${root.dataset.kind === 'wiki' ? 'Знайдено статей' : 'Знайдено компонентів'}: ${count}`;
    empty.hidden = count !== 0;
    root.querySelector('[data-clear]').disabled = input.value.length === 0;
    if (writeUrl) {
      const url = new URL(location.href);
      url.searchParams.delete('q'); url.searchParams.delete('category');
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      if (filter !== 'all') url.searchParams.set('category', filter);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }
  input.addEventListener('input', () => update());
  buttons.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; update(); }));
  root.querySelector('[data-clear]').addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  root.querySelector('[data-reset]').addEventListener('click', () => { filter = 'all'; input.value = ''; update(); input.focus(); });
  update(false);
}
