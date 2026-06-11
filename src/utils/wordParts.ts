export interface WordBreakdown {
  parts: string[]
  display: string
  explanation: string
}

const compoundParts: Record<string, string[]> = {
  upstairs: ['up', 'stairs'],
  downstairs: ['down', 'stairs'],
  classroom: ['class', 'room'],
  playground: ['play', 'ground'],
  breakfast: ['break', 'fast'],
  sunshine: ['sun', 'shine'],
  moonlight: ['moon', 'light'],
  rainbow: ['rain', 'bow'],
  snowman: ['snow', 'man'],
  toothbrush: ['tooth', 'brush'],
  toothpaste: ['tooth', 'paste'],
  notebook: ['note', 'book'],
  newspaper: ['news', 'paper'],
  keyboard: ['key', 'board'],
  football: ['foot', 'ball'],
  basketball: ['basket', 'ball'],
  volleyball: ['volley', 'ball'],
  baseball: ['base', 'ball'],
  weekend: ['week', 'end'],
  bookstore: ['book', 'store'],
  homework: ['home', 'work'],
  birthday: ['birth', 'day'],
  bedroom: ['bed', 'room'],
  bathroom: ['bath', 'room'],
  blackboard: ['black', 'board'],
  afternoon: ['after', 'noon'],
  tomorrow: ['to', 'morrow'],
  yesterday: ['yester', 'day'],
}

const commonParts: Record<string, string[]> = {
  apple: ['ap', 'ple'],
  banana: ['ba', 'na', 'na'],
  orange: ['or', 'ange'],
  pencil: ['pen', 'cil'],
  teacher: ['teach', 'er'],
  mother: ['moth', 'er'],
  father: ['fath', 'er'],
  family: ['fam', 'i', 'ly'],
  animal: ['an', 'i', 'mal'],
  beautiful: ['beauty', 'ful'],
  interesting: ['interest', 'ing'],
  important: ['im', 'port', 'ant'],
  question: ['quest', 'ion'],
  answer: ['ans', 'wer'],
  because: ['be', 'cause'],
  together: ['to', 'geth', 'er'],
  understand: ['under', 'stand'],
  remember: ['re', 'member'],
  practice: ['prac', 'tice'],
  problem: ['prob', 'lem'],
  success: ['suc', 'cess'],
  mistake: ['mis', 'take'],
  future: ['fu', 'ture'],
  lesson: ['les', 'son'],
  English: ['Eng', 'lish'],
}

const prefixes = ['under', 'over', 'after', 'before', 'inter', 'super', 'trans', 'dis', 'mis', 'pre', 're', 'un', 'in', 'im']
const suffixes = ['tion', 'sion', 'ment', 'ness', 'less', 'able', 'ible', 'ful', 'ing', 'est', 'er', 'ed', 'ly', 'es', 's', 'y']

function splitByKnownAffixes(word: string): string[] | null {
  const lower = word.toLowerCase()

  for (const prefix of prefixes) {
    if (lower.startsWith(prefix) && lower.length > prefix.length + 2) {
      return [word.slice(0, prefix.length), word.slice(prefix.length)]
    }
  }

  for (const suffix of suffixes) {
    if (lower.endsWith(suffix) && lower.length > suffix.length + 2) {
      const stem = word.slice(0, word.length - suffix.length)
      const realStem = suffix === 'y' && stem.endsWith('i') ? `${stem.slice(0, -1)}y` : stem
      return [realStem, word.slice(word.length - suffix.length)]
    }
  }

  return null
}

function splitSimpleWord(word: string): string[] {
  if (word.length <= 3) return [word]
  if (word.length <= 5) {
    const middle = Math.ceil(word.length / 2)
    return [word.slice(0, middle), word.slice(middle)]
  }

  const chunks: string[] = []
  let current = ''

  for (let i = 0; i < word.length; i += 1) {
    current += word[i]
    const next = word[i + 1]
    const isVowel = /[aeiou]/i.test(word[i])
    const nextIsConsonant = next ? /[^aeiou]/i.test(next) : false

    if (current.length >= 2 && isVowel && nextIsConsonant && chunks.length < 2) {
      chunks.push(current)
      current = ''
    }
  }

  if (current) chunks.push(current)
  return chunks.length > 1 ? chunks : [word.slice(0, 3), word.slice(3)]
}

export function getWordBreakdown(text: string): WordBreakdown {
  const cleanText = text.trim()

  if (cleanText.includes(' ')) {
    const parts = cleanText.split(/\s+/)
    return {
      parts,
      display: parts.join('·'),
      explanation: '这是短语，先按词块记忆，再整体理解意思。',
    }
  }

  const directParts = compoundParts[cleanText.toLowerCase()] || commonParts[cleanText]
  if (directParts) {
    return {
      parts: directParts,
      display: directParts.join('·'),
      explanation: directParts.length === 2
        ? '按词根/词块拆开记：前后两部分合起来就是完整单词。'
        : '按音节和词块拆开记，读一段、记一段，更容易背下来。',
    }
  }

  const affixParts = splitByKnownAffixes(cleanText)
  if (affixParts) {
    return {
      parts: affixParts,
      display: affixParts.join('·'),
      explanation: '按词根和前后缀拆开记，先记中间词根，再记前后变化。',
    }
  }

  const simpleParts = splitSimpleWord(cleanText)
  return {
    parts: simpleParts,
    display: simpleParts.join('·'),
    explanation: '这是基础词，按音节/字母组合拆开读，降低记忆难度。',
  }
}
