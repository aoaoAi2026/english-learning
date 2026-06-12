// 单词 → Emoji 图片映射
// 按分类组织，方便给每个单词配上可爱的图标

const wordEmoji: Record<string, string> = {
  // 水果
  apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', peach: '🍑',
  pear: '🍐', lemon: '🍋', mango: '🥭', cherry: '🍒', strawberry: '🍓',
  watermelon: '🍉', pineapple: '🍍', kiwi: '🥝', blueberry: '🫐',
  coconut: '🥥', plum: '🟣', melon: '🍈', avocado: '🥑', lychee: '🔴',

  // 动物
  cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐟', horse: '🐴',
  cow: '🐮', pig: '🐷', sheep: '🐑', chicken: '🐔', duck: '🦆',
  rabbit: '🐰', bear: '🐻', panda: '🐼', monkey: '🐵', lion: '🦁',
  tiger: '🐯', elephant: '🐘', giraffe: '🦒', zebra: '🦓', snake: '🐍',
  frog: '🐸', turtle: '🐢', ant: '🐜', bee: '🐝', fly: '🪰',
  insect: '🐛', pest: '🪳',

  // 食物
  bread: '🍞', rice: '🍚', meat: '🥩', egg: '🥚', milk: '🥛',
  juice: '🧃', candy: '🍬', cake: '🎂', cookie: '🍪', soup: '🍲',
  salad: '🥗', pizza: '🍕', burger: '🍔', noodle: '🍜', cheese: '🧀',
  sandwich: '🥪', icecream: '🍦',

  // 颜色
  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', black: '⚫',
  white: '⚪', pink: '🩷', purple: '🟣', brown: '🟤', gold: '🟡',
  silver: '🩶', gray: '🔘',

  // 自然
  sun: '☀️', moon: '🌙', star: '⭐', sky: '🌤️', cloud: '☁️',
  rain: '🌧️', snow: '❄️', ice: '🧊', fire: '🔥', water: '💧',
  tree: '🌳', flower: '🌸', grass: '🌱', leaf: '🍃', wind: '💨',
  mountain: '⛰️', river: '🌊', lake: '🏞️', forest: '🌲',
  rainbow: '🌈', thunder: '⚡', lightning: '⚡',

  // 身体
  hand: '✋', foot: '🦶', arm: '💪', leg: '🦵', head: '🗣️',
  ear: '👂', eye: '👁️', nose: '👃', mouth: '👄', tooth: '🦷',
  hair: '💇', heart: '❤️',

  // 地点
  school: '🏫', home: '🏠', park: '🏞️', shop: '🏪', store: '🏬',
  bank: '🏦', hospital: '🏥', library: '📚', cinema: '🎬',
  station: '🚉', airport: '✈️', garden: '🏡', bridge: '🌉',

  // 交通
  car: '🚗', bus: '🚌', bike: '🚲', train: '🚂', boat: '🚤',
  ship: '🚢', taxi: '🚕', airplane: '✈️', scooter: '🛴',

  // 音乐/游戏
  guitar: '🎸', piano: '🎹', drum: '🥁', violin: '🎻', flute: '🪈',
  chess: '♟️', ball: '⚽', kite: '🪁', doll: '🎎', robot: '🤖',
  puzzle: '🧩', card: '🃏', block: '🧱', swing: '🎢', slide: '🛝',

  // 物品
  book: '📖', pen: '🖊️', pencil: '✏️', crayon: '🖍️', ruler: '📏',
  scissors: '✂️', eraser: '🧹', glue: '🧴', tape: '📎', marker: '🖊️',
  bag: '🎒', clock: '🕐', watch: '⌚', phone: '📱', camera: '📷',
  radio: '📻', computer: '💻', keyboard: '⌨️', screen: '🖥️',
  key: '🔑', map: '🗺️', gift: '🎁', bell: '🔔', ring: '💍',
  flag: '🚩', umbrella: '☂️', mirror: '🪞', towel: '🪥', soap: '🧼',
  toothbrush: '🪥', toothpaste: '🦷', comb: '🪮', lamp: '💡',
  shower: '🚿', bath: '🛁',

  // 衣物
  dress: '👗', skirt: '👚', shirt: '👔', pants: '👖', shorts: '🩳',
  socks: '🧦', shoes: '👟', hat: '🎩', coat: '🧥', jacket: '🧥',
  sweater: '🧶', scarf: '🧣', glove: '🧤', boot: '👢', belt: '🪢',

  // 房间
  bedroom: '🛏️', kitchen: '🍳', bathroom: '🛁', door: '🚪',
  window: '🪟', floor: '🟫', wall: '🧱',

  // 职业
  teacher: '👩‍🏫', doctor: '👨‍⚕️', nurse: '👩‍⚕️', police: '👮',
  firefighter: '👨‍🚒', soldier: '🪖', pilot: '👨‍✈️', chef: '👨‍🍳',
  farmer: '👨‍🌾', driver: '🚗', painter: '🎨', singer: '🎤',
  dancer: '💃', writer: '✍️', actor: '🎭', scientist: '🔬',
  artist: '🎨', musician: '🎵', athlete: '🏃', coach: '📋',
  engineer: '⚙️',

  // 家庭
  family: '👨‍👩‍👧‍👦', mother: '👩', father: '👨', brother: '👦',
  sister: '👧', baby: '👶', friend: '🤝', parent: '👨‍👩‍👧',

  // 情绪
  happy: '😊', sad: '😢', angry: '😠', scared: '😨',
  love: '❤️', smile: '😀', cry: '😭',

  // 天气/季节
  sunny: '☀️', rainy: '🌧️', cloudy: '☁️', snowy: '🌨️',
  windy: '💨', foggy: '🌫️', stormy: '⛈️', weather: '🌤️',

  // 动作
  run: '🏃', walk: '🚶', jump: '🤸', swim: '🏊', fly: '🕊️',
  eat: '🍽️', drink: '🥤', sleep: '😴', read: '📖', write: '✍️',
  sing: '🎤', dance: '💃', play: '🎮', work: '💼', study: '📝',
  cook: '🍳', draw: '🎨', paint: '🖌️', climb: '🧗', drive: '🚗',
  ride: '🚴', sit: '🪑', stand: '🧍', wash: '🚿', clean: '🧹',
  open: '📂', close: '📁', push: '👐', pull: '🤏', cut: '✂️',
  buy: '🛒', sell: '💰', give: '🎁', take: '🤲', make: '🔨',
  see: '👀', hear: '👂', speak: '🗣️', think: '🤔', know: '🧠',
  learn: '📚', teach: '👩‍🏫', help: '🆘', love: '❤️', like: '👍',
  hate: '👎', need: '🆘', want: '🙏', try: '💪', start: '▶️',
  stop: '⏹️', go: '🟢', come: '🚶', find: '🔍', lose: '🔎',
  remember: '🧠', forget: '🤔',

  // 数字/颜色等基础词
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
  six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',

  // 日用品/餐具
  plate: '🍽️', bowl: '🥣', cup: '☕', spoon: '🥄', fork: '🍴',
  knife: '🔪', table: '🪑', chair: '🪑', bed: '🛏️', desk: '🪑',

  // 其他常用
  house: '🏠', room: '🚪', class: '🏫', game: '🎮', music: '🎵',
  sport: '⚽', movie: '🎬', photo: '📸', music: '🎵', letter: '✉️',
  number: '🔢', color: '🎨', shape: '🔷', size: '📐',
  morning: '🌅', afternoon: '☀️', evening: '🌇', night: '🌃',
  day: '📅', week: '📆', month: '🗓️', year: '📅', time: '⏰',
  today: '📅', tomorrow: '➡️', yesterday: '⬅️', birthday: '🎂',
  christmas: '🎄', newyear: '🎊', halloween: '🎃',
  english: '🇬🇧', chinese: '🇨🇳',
  boy: '👦', girl: '👧', man: '👨', woman: '👩',
  yes: '✅', no: '❌', good: '👍', bad: '👎', ok: '👌',
  big: '🐘', small: '🐭', hot: '🔥', cold: '❄️',
  fast: '🚀', slow: '🐢', old: '👴', new: '✨',
  long: '📏', short: '📐', tall: '🦒', high: '⬆️', low: '⬇️',
  // 新增词汇
  uncle: '👨', aunt: '👩', cousin: '👫',
  husband: '👨', wife: '👩', partner: '🤝',
  boss: '👔', worker: '👷', waiter: '🧑‍🍳',
  athlete: '🏃', runner: '🏃', swimmer: '🏊', player: '⛹️',
  leader: '👑', captain: '🦸', member: '👥', group: '👥',
  prepare: '📋', explain: '💬', describe: '📝', compare: '⚖️',
  analyze: '🔍', evaluate: '⭐', organize: '📂', arrange: '🔢',
  collect: '🗃️', connect: '🔗', create: '🎨', design: '✏️',
  develop: '🌱', discover: '💡', explore: '🗺️', imagine: '💭',
  invent: '💡', measure: '📏', observe: '👀', predict: '🔮',
  record: '📹', report: '📄', research: '🔬', solve: '🧩',
  calculate: '🔢', estimate: '🤔', data: '📊', result: '🏁',
  method: '📋', process: '⚙️', experiment: '🧪', theory: '📖',
  prove: '✅', improve: '📈', increase: '⬆️', decrease: '⬇️',
  continue: '➡️', complete: '✔️', achieve: '🏆', succeed: '🥇',
  attempt: '🔨', effort: '💪', review: '👀', revise: '✏️',
  correct: '✅', error: '❌', solution: '💡', practice: '🔄',
  problem: '❓', question: '❓', answer: '💬', mistake: '⚠️',
  future: '🔮', lesson: '📖', success: '🏆',
  // 环境/自然
  environment: '🌍', pollution: '🏭', recycle: '♻️', energy: '⚡',
  fuel: '⛽', electricity: '⚡', gas: '🔥', oil: '🛢️', coal: '🪨',
  solar: '☀️', power: '🔌', resource: '💎', material: '🧱',
  plastic: '🍶', metal: '🔩', glass: '🥛', wood: '🪵', cloth: '👚',
  leather: '🧥', rubber: '🛞', chemical: '🧪', natural: '🌿',
  artificial: '🤖', organic: '🌱', reuse: '🔄', reduce: '📉',
  protect: '🛡️', trash: '🗑️', landfill: '⛰️', ocean: '🌊',
  sea: '🌊', coast: '🏖️', desert: '🏜️', jungle: '🌴',
  valley: '⛰️', hill: '⛰️', plain: '🌾', field: '🌾',
  farm: '🚜', crop: '🌾', harvest: '🌾', plant: '🌱',
  seed: '🌰', soil: '🪹', fertilizer: '💩', pesticide: '💊',
  pollution: '🏭', energy: '⚡',
}

// 智能匹配：如果精确匹配不到，尝试模糊匹配
const categoryFallbacks: Record<string, string> = {
  '水果': '🍎', '动物': '🐾', '食物': '🍽️', '颜色': '🎨',
  '自然': '🌿', '身体': '🧍', '地点': '📍', '交通': '🚗',
  '音乐': '🎵', '物品': '📦', '文具': '✏️', '衣物': '👔',
  '房间': '🏠', '职业': '💼', '人物': '👤', '家庭': '👨‍👩‍👧‍👦',
  '动词': '▶️', '名词': '📋', '形容词': '💬', '游戏': '🎮',
  '天气': '🌤️', '季节': '📅', '材料': '🧱',
}

export function getWordEmoji(word: string): string {
  const lower = word.toLowerCase().trim()
  // 精确匹配
  if (wordEmoji[lower]) return wordEmoji[lower]
  // 去掉空格再试（短语）
  const noSpace = lower.replace(/\s+/g, '')
  if (wordEmoji[noSpace]) return wordEmoji[noSpace]
  // 部分匹配
  for (const [key, emoji] of Object.entries(wordEmoji)) {
    if (lower.includes(key) || key.includes(lower)) return emoji
  }
  return '📖' // 默认书本图标
}

export function getCategoryEmoji(category: string): string {
  return categoryFallbacks[category] || '📖'
}
