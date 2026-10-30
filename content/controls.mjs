// Labels describe the action; context distinguishes shared keys in different screens.
export const groups = {
  minecraft: 'Основне керування', horse: 'Коні й вози', map: 'Мапа',
  jei: 'Рецепти · JEI', voice: 'Голосовий чат', create: 'Create й гармати',
  other: 'Інші моди',
};
const labels = {
  'key.attack': 'Атакувати / руйнувати блок', 'key.use': 'Використати предмет / поставити блок',
  'key.forward': 'Рух уперед', 'key.left': 'Рух ліворуч', 'key.back': 'Рух назад', 'key.right': 'Рух праворуч',
  'key.jump': 'Стрибок', 'key.sneak': 'Присісти', 'key.sprint': 'Біг', 'key.drop': 'Викинути предмет',
  'key.inventory': 'Інвентар', 'key.chat': 'Чат', 'key.playerlist': 'Список гравців',
  'key.pickItem': 'Вибрати блок', 'key.command': 'Ввести команду', 'key.socialInteractions': 'Соціальні взаємодії',
  'key.screenshot': 'Знімок екрана', 'key.togglePerspective': 'Змінити перспективу', 'key.smoothCamera': 'Плавна камера',
  'key.fullscreen': 'Повноекранний режим', 'key.spectatorOutlines': 'Контури гравців у режимі спостерігача',
  'key.swapOffhand': 'Поміняти предмети між руками', 'key.saveToolbarActivator': 'Зберегти панель предметів',
  'key.loadToolbarActivator': 'Завантажити панель предметів', 'key.advancements': 'Досягнення',
  'key.entityculling.toggle': 'Увімкнути / вимкнути Entity Culling',
  'treechop.key.toggle_chopping': 'Перемкнути рубання дерева', 'treechop.key.toggle_felling': 'Перемкнути повалення дерева',
  'treechop.key.cycle_sneak_behavior': 'Змінити поведінку рубання при присіданні', 'treechop.key.open_settings_overlay': 'Налаштування TreeChop',
  'key.modernfix.config': 'Налаштування ModernFix',
  'key.dragnlivestock.horse_speed_up': 'Прискорити коня', 'key.dragnlivestock.horse_slow_down': 'Сповільнити коня',
  'key.dragnlivestock.horse_bow': 'Уклін коня', 'key.dragnlivestock.horse_piaffe': 'Піаффе: крок коня на місці',
  'key.dragnlivestock.horse_spanish_walk_toggle': 'Іспанський крок коня', 'key.dragnlivestock.horse_wave': 'Мах передньою ногою коня',
  'key.dragnlivestock.horse_levade': 'Левада: підняти коня дибки', 'key.dragnlivestock.horse_walk_backwards': 'Рух коня назад',
  'key.dragnlivestock.plow_mode': 'Перемкнути режим плуга',
  'key.ok_zoomer.zoom': 'Наблизити зображення', 'key.ok_zoomer.decrease_zoom': 'Зменшити наближення',
  'key.ok_zoomer.increase_zoom': 'Збільшити наближення', 'key.ok_zoomer.reset_zoom': 'Скинути наближення',
  'key.corpse.death_history': 'Історія смертей', 'key.starcatcher.minigame_hit': 'Дія у рибальській мінігрі',
  'key.starcatcher.expand_tournament': 'Розгорнути рибальський турнір', 'key.dynamic_fps.toggle_forced': 'Примусово обмежити FPS',
  'key.dynamic_fps.toggle_disabled': 'Перемкнути Dynamic FPS',
  'key.recruits.command_screen_key': 'Меню наказів рекрутам', 'key.recruits.team_screen_key': 'Меню загону рекрутів',
  'key.recruits.map_screen_key': 'Мапа рекрутів', 'keyinfo.copycats.fill_copycat': 'Заповнити Copycat матеріалом',
  'siegemachines.machine_use': 'Використати облогову машину', 'siegemachines.ladder_climb': 'Піднятися облоговою драбиною',
  'siegemachines.machine_inventory': 'Інвентар облогової машини',
  'key.sethorse.desc': 'Призначити свого коня', 'key.callhorse.desc': 'Покликати коня', 'key.showstats.desc': 'Характеристики коня',
  'genshinstrument.keymaps.transpose_up_modifier': 'Підвищити тон інструмента',
  'genshinstrument.keymaps.transpose_down_modifier': 'Знизити тон інструмента',
  'key.emotecraft.fastchoose': 'Швидкий вибір емоції Emotecraft', 'key.emotecraft.stop': 'Зупинити емоцію Emotecraft',
  'key.accuratehitboxes.open_config': 'Налаштування Accurate Hitboxes', 'key.pop_up_emotes.piemenu': 'Кругове меню емоцій',
  'key.push_to_talk': 'Говорити при натисканні', 'key.whisper': 'Шепіт', 'key.mute_microphone': 'Увімкнути / вимкнути мікрофон',
  'key.disable_voice_chat': 'Увімкнути / вимкнути голосовий чат', 'key.hide_icons': 'Приховати значки голосового чату',
  'key.voice_chat': 'Меню голосового чату', 'key.voice_chat_settings': 'Налаштування голосового чату',
  'key.voice_chat_group': 'Група голосового чату', 'key.voice_chat_toggle_recording': 'Перемкнути запис голосового чату',
  'key.voice_chat_adjust_volumes': 'Налаштувати гучність гравців',
  'keybinds.bettercombat.feint': 'Фінт / скасувати атаку', 'keybinds.bettercombat.toggle_mine_with_weapons': 'Перемкнути руйнування блоків зброєю',
  'key.jade.config': 'Налаштування Jade', 'key.jade.show_overlay': 'Показати / приховати підказку Jade',
  'key.jade.toggle_liquid': 'Підказки про рідини Jade', 'key.jade.show_recipes': 'Показати рецепти через Jade',
  'key.jade.show_uses': 'Показати використання через Jade', 'key.jade.narrate': 'Озвучити підказку Jade',
  'key.jade.show_details': 'Докладна підказка Jade', 'key.astikorcarts.desc': 'Причепити / відчепити віз',
  'key.ponder.ponder': 'Переглянути пояснення Ponder', 'create.keyinfo.toolmenu': 'Меню інструмента Create',
  'create.keyinfo.toolbelt': 'Пояс інструментів Create', 'create.keyinfo.rotate_menu': 'Меню обертання Create',
  'supplementaries.keybind.quiver': 'Дія з сагайдаком', 'key.createbigcannons.pitch_mode': 'Режим нахилу гармати',
  'key.createbigcannons.fire_controlled_cannon': 'Постріл із керованої гармати',
  'key.valkyrienskies.ship_down': 'Опустити корабель', 'key.valkyrienskies.ship_cruise': 'Крейсерський режим корабля',
  'key.quickskin.open_menu': 'Меню QuickSkin',
};
const jeiLabels = {
  nextPage: 'Наступна сторінка предметів', previousPage: 'Попередня сторінка предметів',
  showBookmarkTooltipFeatures: 'Докладні підказки закладок', nextSearch: 'Наступний пошуковий запит', previousSearch: 'Попередній пошуковий запит',
  cheatOneItem2: 'Видати один предмет (додаткова кнопка)', cheatItemStack: 'Видати стос предметів',
  showUses: 'Показати використання предмета', recipeForward: 'Уперед в історії рецептів', showRecipe: 'Показати рецепт предмета',
  focusSearch: 'Перейти до пошуку предметів', pauseRecipeCycling: 'Зупинити зміну інгредієнтів рецепта',
  toggleHideIngredient: 'Приховати / показати інгредієнт', copy_recipe_id: 'Скопіювати ID рецепта',
  'copy.recipe.id': 'Скопіювати ID рецепта', shareToChat: 'Надіслати рецепт у чат', previousRecipePage: 'Попередня сторінка рецептів',
  cheatItemStack2: 'Видати стос предметів (додаткова кнопка)', toggleWildcardHideIngredient: 'Приховати / показати варіанти інгредієнта',
  maxTransferRecipeBookmark: 'Перенести максимум інгредієнтів із закладки', bookmark: 'Додати / прибрати закладку рецепта',
  previousCategory: 'Попередня категорія рецептів', toggleBookmarkOverlay: 'Показати / приховати закладки',
  toggleEditMode: 'Перемкнути редагування списку предметів', closeRecipeGui: 'Закрити вікно рецепта',
  clearSearchBar: 'Очистити пошук предметів', toggleOverlay: 'Показати / приховати список предметів JEI',
  toggleCheatMode: 'Перемкнути режим видавання предметів', cheatOneItem: 'Видати один предмет', recipeBack: 'Назад в історії рецептів',
  nextRecipePage: 'Наступна сторінка рецептів', transferRecipeBookmark: 'Перенести інгредієнти рецепта із закладки',
  toggleCheatModeConfigButton: 'Перемкнути режим видавання через кнопку налаштувань', nextCategory: 'Наступна категорія рецептів',
  quickMove: 'Швидко перемістити предмет', showRecipe2: 'Показати рецепт (клік по предмету)', showUses2: 'Показати використання (клік по предмету)',
};
const mapLabels = {
  minimap_preset: 'Змінити набір налаштувань мінімапи', toggle_entity_names: 'Показати / приховати назви істот',
  toggle_render_waypoints_map: 'Позначки на мапі', 'fullscreen.south': 'Зсунути мапу на південь', zoom_in: 'Збільшити мапу',
  'fullscreen.north': 'Зсунути мапу на північ', fullscreen_waypoints: 'Список позначок мапи', toggle_render_waypoints_world: 'Позначки у світі',
  'fullscreen.east': 'Зсунути мапу на схід', zoom_out: 'Зменшити мапу', create_waypoint: 'Створити позначку',
  'fullscreen.disable_buttons': 'Приховати кнопки повноекранної мапи', minimap_type: 'Змінити тип мінімапи',
  fullscreen_create_waypoint: 'Створити позначку на повноекранній мапі', 'fullscreen.west': 'Зсунути мапу на захід',
  toggle_waypoints: 'Перемкнути позначки', fullscreen_chat_position: 'Змінити положення чату на мапі',
  map_toggle_alt: 'Відкрити / закрити мапу', toggle_render_waypoints: 'Показати / приховати позначки',
  minimap_toggle_alt: 'Показати / приховати мінімапу', fullscreen_options: 'Налаштування повноекранної мапи',
  fullscreen_follow_player: 'Стежити за гравцем на мапі',
};
export function describe(id) {
  if (id.startsWith('key.jei.')) {
    let context = 'В інвентарі / меню JEI.';
    if (/cheat/i.test(id)) context += ' Видавання предметів потребує відповідних прав.';
    if (/toggle.*HideIngredient/.test(id)) context += ' У режимі редагування списку предметів.';
    return { label: jeiLabels[id.slice(8)], group: 'jei', context };
  }
  if (id.startsWith('key.journeymap.')) return { label: mapLabels[id.slice(15)], group: 'map', context: id.includes('fullscreen') ? 'У повноекранній мапі JourneyMap.' : 'JourneyMap.' };
  const group = /horse|showstats|dragnlivestock|astikorcarts/.test(id) ? 'horse' : /create|ponder|copycats/.test(id) ? 'create' : /voice|microphone|whisper|push_to_talk|hide_icons/.test(id) ? 'voice' : id.startsWith('key.hotbar.') || Object.hasOwn(labels, id) && /^key\.[^.]+$/.test(id) && !/voice|whisper|microphone|push_to_talk|hide_icons/.test(id) ? 'minecraft' : 'other';
  let context = groups[group] + '.';
  if (id.startsWith('key.dragnlivestock.')) context = 'Під час взаємодії з конем / плугом DragN Livestock.';
  if (id === 'key.ponder.ponder') context = 'Над предметом із поясненням Ponder; утримуй клавішу.';
  if (id.includes('createbigcannons')) context = 'Під час керування гарматою Create Big Cannons.';
  if (id.startsWith('key.valkyrienskies')) context = 'Під час керування кораблем Valkyrien Skies.';
  if (id.startsWith('siegemachines.')) context = 'Під час взаємодії з облоговою машиною.';
  return { label: id.startsWith('key.hotbar.') ? `Комірка панелі ${id.split('.').at(-1)}` : labels[id], group, context };
}
export function parseBindings(text) {
  const seen = new Set();
  return text.split(/\r?\n/).filter(line => line.startsWith('key_')).map(line => {
    const [sourceId, input, modifier = 'NONE', ...extra] = line.split(':');
    const id = sourceId.slice(4);
    const key = input?.replace(/^key\.(keyboard|mouse)\./, (_, type) => type === 'mouse' ? 'mouse.' : '');
    const description = describe(id);
    if (seen.has(id) || !description.label || !/^key\.(keyboard|mouse)\./.test(input) || !['NONE','SHIFT','CONTROL','ALT'].includes(modifier) || extra.length) throw new Error(`Invalid or undocumented binding: ${line}`);
    seen.add(id);
    return { id, key, modifier, ...description };
  });
}
// Each key carries a physical KeyboardEvent.code, independent of the typing language.
const key = (id, label, code, size = '') => ({ id, label, code, size });
const letter = c => key(c.toLowerCase(), c, `Key${c}`);
const digit = n => key(String(n), String(n), `Digit${n}`);
export const keyboardRows = [
  [key('escape','Esc','Escape'), ...Array.from({length:12},(_,i)=>key(`f${i+1}`,`F${i+1}`,`F${i+1}`))],
  [key('grave.accent','`','Backquote'), ...[1,2,3,4,5,6,7,8,9,0].map(digit), key('minus','−','Minus'),key('equal','=','Equal'),key('backspace','Backspace','Backspace','wide')],
  [key('tab','Tab','Tab','wide'), ...'QWERTYUIOP'.split('').map(letter),key('left.bracket','[','BracketLeft'),key('right.bracket',']','BracketRight'),key('backslash','\\','Backslash')],
  [key('caps.lock','Caps','CapsLock','wide'), ...'ASDFGHJKL'.split('').map(letter),key('semicolon',';','Semicolon'),key('apostrophe',"'",'Quote'),key('enter','Enter','Enter','wide')],
  [key('left.shift','Shift','ShiftLeft','wide'), ...'ZXCVBNM'.split('').map(letter),key('comma',',','Comma'),key('period','.','Period'),key('slash','/','Slash'),key('right.shift','Shift','ShiftRight','wide')],
  [key('left.control','Ctrl','ControlLeft','wide'),key('left.win','Win','MetaLeft'),key('left.alt','Alt','AltLeft'),key('space','Пробіл','Space','space'),key('right.alt','Alt','AltRight'),key('right.win','Win','MetaRight'),key('menu','Menu','ContextMenu'),key('right.control','Ctrl','ControlRight','wide')],
];
export const extraRows = [
  [key('insert','Ins','Insert'),key('home','Home','Home'),key('page.up','PgUp','PageUp')],
  [key('delete','Del','Delete'),key('end','End','End'),key('page.down','PgDn','PageDown')],
  [key('up','↑','ArrowUp')],
  [key('left','←','ArrowLeft'),key('down','↓','ArrowDown'),key('right','→','ArrowRight')],
];
export const numpadRows = [
  [key('num.lock','Num','NumLock'),key('keypad.divide','/','NumpadDivide'),key('keypad.multiply','×','NumpadMultiply'),key('keypad.subtract','−','NumpadSubtract')],
  ...[[7,8,9],[4,5,6],[1,2,3],[0]].map(ns=>ns.map(n=>key(`keypad.${n}`,String(n),`Numpad${n}`))),
  [key('keypad.decimal','.','NumpadDecimal'),key('keypad.add','+','NumpadAdd'),key('keypad.enter','↵','NumpadEnter')],
];
export const mouseKeys = [key('mouse.left','ЛКМ',''),key('mouse.middle','СКМ · коліщатко',''),key('mouse.right','ПКМ','')];
export const allKeys = [...keyboardRows.flat(), ...extraRows.flat(), ...numpadRows.flat(), ...mouseKeys];
const names = new Map(allKeys.map(k=>[k.id,k.label]));
export const keyLabel = id => id === 'unknown' ? 'Не призначено' : id.startsWith('keypad.') ? `Num ${names.get(id)}` : /^(left|right)\.(shift|control|alt)$/.test(id) ? `${id.startsWith('left') ? 'Лівий' : 'Правий'} ${names.get(id)}` : names.get(id) || id;
export const shortcutLabel = b => `${b.modifier === 'NONE' ? '' : ({CONTROL:'Ctrl',SHIFT:'Shift',ALT:'Alt'}[b.modifier] + ' + ')}${keyLabel(b.key)}`;
