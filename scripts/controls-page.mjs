import { groups, keyboardRows, extraRows, numpadRows, mouseKeys, keyLabel, shortcutLabel } from '../content/controls.mjs';

export function controlsPage(bindings, { esc, breadcrumb, head }) {
  const renderKey = k => {
    const modifier = /^(left|right)\.control$/.test(k.id) ? 'CONTROL' : /^(left|right)\.shift$/.test(k.id) ? 'SHIFT' : /^(left|right)\.alt$/.test(k.id) ? 'ALT' : null;
    const actions = bindings.filter(b => b.key === k.id || modifier && b.modifier === modifier);
    const title = actions.length ? actions.map(b => `${shortcutLabel(b)}: ${b.label}`).join('\n') : 'Немає окремого призначення у файлі';
    return `<button type="button" class="keycap ${k.size ? `keycap-${k.size}` : ''} ${actions.length ? 'is-bound' : ''}" data-key="${esc(k.id)}" data-code="${k.code}" data-label="${esc(keyLabel(k.id))}" aria-pressed="false" aria-label="${esc(keyLabel(k.id))}: ${actions.length ? `призначень ${actions.length}` : 'немає запису у файлі'}" title="${esc(title)}"><span>${esc(k.label)}</span>${actions.length ? `<small aria-hidden="true">${actions.length}</small>` : ''}</button>`;
  };
  const rows = list => list.map(row => `<div class="keyboard-row">${row.map(renderKey).join('')}</div>`).join('');
  return `${breadcrumb('Керування')}${head('Клавіші Empirecraft', 'Кожна клавіша має свою роль.', 'Обери кнопку на клавіатурі або миші, щоб дізнатися, що вона робить у нашій збірці.')}<div data-controls-root>
  <p class="controls-source">За налаштованим файлом options.txt · 30 жовтня 2026 · ${bindings.length} дії. Якщо ти змінив керування у грі, власні налаштування матимуть перевагу.</p>
  <section class="keyboard-panel js-only" aria-label="Інтерактивна клавіатура">
    <div class="keyboard-topline"><p>Натисни клавішу на схемі</p><span><i aria-hidden="true"></i> Є призначення у файлі</span></div>
    <p id="keyboard-help" class="keyboard-help">Можна також натискати фізичні клавіші, коли схема у фокусі. Tab переміщує фокус, Enter обирає кнопку. На телефоні гортай схему вбік.</p>
    <div class="keyboard-scroll" tabindex="0" data-keyboard aria-describedby="keyboard-help" role="group" aria-label="Схема клавіатури">
      <div class="keyboard-layout"><div class="keyboard-main">${rows(keyboardRows)}</div><div class="keyboard-extra">${rows(extraRows)}</div><div class="keyboard-numpad"><p>NumPad</p>${rows(numpadRows)}</div></div>
    </div>
    <div class="mouse-strip"><span>Миша</span>${mouseKeys.map(renderKey).join('')}</div>
  </section>
  <section class="controls-directory" aria-labelledby="controls-title">
    <div class="controls-selection"><div><p class="eyebrow">Довідник дій</p><h2 id="controls-title" data-selected-title>Усі клавіші та дії</h2></div><button type="button" class="button secondary js-only" data-controls-reset>Скинути вибір і пошук</button></div>
    <div class="controls-toolbar js-only"><div><label for="controls-search">Знайти дію або клавішу</label><input type="search" id="controls-search" data-controls-search placeholder="Наприклад: мікрофон, кінь, Ctrl + J…" autocomplete="off"></div><div><label for="controls-group">Тема</label><select id="controls-group" data-controls-group><option value="all">Усі теми</option>${Object.entries(groups).map(([id,label])=>`<option value="${id}">${esc(label)}</option>`).join('')}</select></div><label class="controls-unassigned"><input type="checkbox" data-controls-unassigned> Лише непризначені дії</label></div>
    <p class="controls-summary" data-controls-status role="status" aria-live="polite">Усього дій: ${bindings.length}</p>
    <p class="controls-note">Одна кнопка може мати кілька дій у різних меню. Поєднання з Ctrl, Shift і Alt показані окремо. Сірі клавіші не мають запису у файлі; вбудовані дії Minecraft (наприклад, Esc, F1, F3) можуть працювати без такого запису.</p>
    <ul class="controls-list">${bindings.map(b => `<li data-binding data-key="${esc(b.key)}" data-modifier="${b.modifier}" data-group="${b.group}" data-search="${esc([shortcutLabel(b), b.label, groups[b.group], b.id, b.context].join(' '))}"><span class="binding-shortcut"><kbd>${esc(shortcutLabel(b))}</kbd></span><div><h3>${esc(b.label)}</h3><p>${esc(b.context)}</p></div><span class="badge">${esc(groups[b.group])}</span></li>`).join('')}</ul>
    <div class="empty-state" data-controls-empty hidden><h3>Відповідних призначень немає</h3><p>Спробуй інший пошук, тему або клавішу. Якщо для кнопки немає запису в options.txt, вона все одно може мати вбудовану дію у Minecraft.</p></div>
  </section><noscript><p>Для інтерактивної схеми потрібен JavaScript. Усі призначення з файлу наведено у списку вище; знайти дію можна пошуком браузера.</p></noscript></div>`;
}
