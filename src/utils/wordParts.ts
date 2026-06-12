export interface WordBreakdown {
  parts: string[]
  display: string
  explanation: string
  partMeanings?: { part: string; meaning: string; tip?: string }[]
}

// 复合词拆分
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
  raincoat: ['rain', 'coat'],
  toothpaste: ['tooth', 'paste'],
  livingroom: ['living', 'room'],
  schoolbag: ['school', 'bag'],
  sunglasses: ['sun', 'glasses'],
  highschool: ['high', 'school'],
  pancake: ['pan', 'cake'],
  snowball: ['snow', 'ball'],
  watercolor: ['water', 'color'],
  seashore: ['sea', 'shore'],
  toothbrush: ['tooth', 'brush'],
}

// 词根词缀含义解释
const partMeanings: Record<string, { meaning: string; tip: string }> = {
  // 前缀
  up: { meaning: '向上', tip: '想象往上爬楼梯' },
  down: { meaning: '向下', tip: '想象往楼下走' },
  after: { meaning: '在...之后', tip: 'afternoon = after + noon(中午) → 中午之后就是下午' },
  before: { meaning: '在...之前', tip: 'be + fore(前面) → 在前面就是之前' },
  inter: { meaning: '在...之间；相互', tip: 'internet = 互相连接的网络' },
  super: { meaning: '超级；超过', tip: 'superman = 超过普通人的能力 → 超人' },
  trans: { meaning: '穿过；转移', tip: 'transport = trans(转移) + port(港口) → 转移货物 → 运输' },
  dis: { meaning: '不；分开', tip: 'dislike = dis(不) + like(喜欢) → 不喜欢' },
  mis: { meaning: '错误', tip: 'mistake = mis(错) + take(拿) → 拿错了 → 错误' },
  pre: { meaning: '在前；预先', tip: 'preview = pre(预先) + view(看) → 提前看 → 预习' },
  re: { meaning: '再；回', tip: 'review = re(再) + view(看) → 再看 → 复习' },
  un: { meaning: '不；否定', tip: 'unhappy = un(不) + happy(开心) → 不开心' },
  in: { meaning: '不；向内', tip: 'inside = in(里面) + side(边) → 在里面' },
  im: { meaning: '不；向内', tip: 'impossible = im(不) + possible(可能) → 不可能' },
  over: { meaning: '超过；在...之上', tip: 'overcome = over(越过) + come(来) → 越过困难 → 克服' },
  under: { meaning: '在...之下', tip: 'understand = under(下面) + stand(站) → 站在下面听 → 理解' },
  
  // 后缀
  tion: { meaning: '名词后缀（行为/状态）', tip: 'action = act(行动) + tion → 行动的行为 → 动作' },
  sion: { meaning: '名词后缀（行为/状态）', tip: 'decision = decide(决定) + sion → 决定的结果' },
  ment: { meaning: '名词后缀（行为/结果）', tip: 'movement = move(移动) + ment → 移动的行为 → 运动' },
  ness: { meaning: '名词后缀（性质/状态）', tip: 'happiness = happy(开心) + ness → 开心的状态 → 幸福' },
  less: { meaning: '形容词后缀（无...的）', tip: 'careless = care(关心) + less → 不关心 → 粗心' },
  able: { meaning: '形容词后缀（能...的）', tip: 'readable = read(读) + able → 能读的' },
  ible: { meaning: '形容词后缀（能...的）', tip: 'visible = vis(看) + ible → 能看到的' },
  ful: { meaning: '形容词后缀（充满...的）', tip: 'beautiful = beauty(美) + ful → 充满美的 → 美丽的' },
  ing: { meaning: '形容词/动名词后缀（正在...）', tip: 'reading = read + ing → 正在读的行为 → 阅读' },
  er: { meaning: '名词后缀（做...的人/物）', tip: 'teacher = teach(教) + er → 教书的人 → 老师' },
  or: { meaning: '名词后缀（做...的人）', tip: 'actor = act(表演) + or → 表演的人 → 演员' },
  ed: { meaning: '形容词/过去式后缀（已...的）', tip: 'finished = finish(完成) + ed → 已完成' },
  ly: { meaning: '副词后缀（...地）', tip: 'quickly = quick(快) + ly → 快速地' },
  y: { meaning: '形容词后缀（有...性质的）', tip: 'sunny = sun(太阳) + y → 有太阳性质的 → 晴朗的' },
  
  // 常见词根
  class: { meaning: '班级；等级', tip: 'class + room(房间) → 上课的房间 → 教室' },
  room: { meaning: '房间', tip: 'bed(床) + room → 放床的房间 → 卧室' },
  play: { meaning: '玩；玩耍', tip: 'play + ground(地面) → 玩耍的场地 → 操场' },
  ground: { meaning: '地面；场地', tip: 'playground 就是玩耍的场地' },
  break: { meaning: '打破；中断', tip: 'break + fast(禁食) → 中断禁食 → 吃早餐' },
  fast: { meaning: '禁食；快的', tip: 'breakfast 原意是"打破禁食"，就是吃早餐' },
  sun: { meaning: '太阳', tip: 'sun + shine(照耀) → 太阳照耀 → 阳光' },
  shine: { meaning: '照耀；发光', tip: 'shine 像"晒"的谐音，太阳晒→发光' },
  moon: { meaning: '月亮', tip: 'moon + light(光) → 月亮的光 → 月光' },
  light: { meaning: '光；轻', tip: 'light 谐音"来特"，光线来了特别亮' },
  rain: { meaning: '雨', tip: 'rain + bow(弓) → 雨后天空的弓 → 彩虹' },
  bow: { meaning: '弓；鞠躬', tip: '彩虹像一把弯弯的弓' },
  snow: { meaning: '雪', tip: 'snow + man(人) → 雪做的人 → 雪人' },
  man: { meaning: '人；男人', tip: 'snowman 是"雪人"，不是雪做的男人哦' },
  tooth: { meaning: '牙齿', tip: 'tooth + brush(刷子) → 刷牙的工具 → 牙刷' },
  brush: { meaning: '刷子；刷', tip: 'brush 谐音"不辣洗"，用刷子刷干净' },
  note: { meaning: '笔记；便条', tip: 'note + book(书) → 写笔记的本子 → 笔记本' },
  book: { meaning: '书', tip: 'note(笔记) + book → 记笔记的本子' },
  news: { meaning: '新闻', tip: 'news + paper(纸) → 印新闻的纸 → 报纸' },
  paper: { meaning: '纸；论文', tip: 'newspaper 就是"新闻纸"' },
  key: { meaning: '钥匙；关键', tip: 'key + board(板) → 带按键的板 → 键盘' },
  board: { meaning: '板；木板', tip: 'black(黑) + board → 黑色的板 → 黑板' },
  foot: { meaning: '脚', tip: 'foot(脚) + ball(球) → 用脚踢的球 → 足球' },
  ball: { meaning: '球', tip: 'basket(篮子) + ball → 投进篮子的球 → 篮球' },
  basket: { meaning: '篮子', tip: 'basketball 就是"篮子球"' },
  week: { meaning: '周；星期', tip: 'week + end(结束) → 一周的结束 → 周末' },
  end: { meaning: '结束', tip: 'weekend 是一周的最后两天' },
  home: { meaning: '家', tip: 'home + work(工作) → 带回家做的工作 → 作业' },
  work: { meaning: '工作', tip: 'homework 是"家庭作业"' },
  birth: { meaning: '出生', tip: 'birth + day(天) → 出生的那天 → 生日' },
  day: { meaning: '天；日', tip: 'birthday 是"出生的日子"' },
  bed: { meaning: '床', tip: 'bed + room → 放床的房间 → 卧室' },
  bath: { meaning: '洗澡', tip: 'bath + room → 洗澡的房间 → 浴室' },
  black: { meaning: '黑色', tip: 'black + board → 黑色的板子 → 黑板' },
  after: { meaning: '在...之后', tip: 'after + noon(中午) → 中午之后 → 下午' },
  noon: { meaning: '中午', tip: 'afternoon = after noon' },
  yes: { meaning: '是', tip: 'yes + terday → 已经"是"过的那天 → 昨天' },
  terday: { meaning: '（古英语）日子', tip: 'yesterday 是"已经过去的那个日子"' },
  to: { meaning: '向；到', tip: 'to + morrow(明天) → 到明天' },
  morrow: { meaning: '明天（古英语）', tip: 'tomorrow = to + morrow' },
  teach: { meaning: '教', tip: 'teach + er → 教书的人 → 老师' },
  moth: { meaning: '妈妈（古语）', tip: 'moth + er → 妈妈 → 母亲' },
  fath: { meaning: '爸爸（古语）', tip: 'fath + er → 爸爸 → 父亲' },
  beau: { meaning: '美（法语来源）', tip: 'beau(美) + ty → 美丽' },
  ty: { meaning: '名词后缀', tip: 'beauty = beau + ty' },
  inter: { meaning: '在...之间', tip: 'inter + est → 在...之间的兴趣' },
  est: { meaning: '最高级后缀', tip: 'interest = inter + est' },
  quest: { meaning: '寻找；追求', tip: 'quest + ion → 寻找答案 → 问题' },
  ion: { meaning: '名词后缀', tip: 'question = quest + ion' },
  ans: { meaning: '回答（古语）', tip: 'ans + wer → 回答 → 答案' },
  wer: { meaning: '（古英语）保卫', tip: 'answer 原意是"保卫回答"' },
  be: { meaning: '是', tip: 'be + cause → 是因为 → 因为' },
  cause: { meaning: '原因', tip: 'because = be + cause' },
  toge: { meaning: '一起（古语）', tip: 'to + geth + er → 到一起 → 一起' },
  ther: { meaning: '（后缀）', tip: 'together = to + gether' },
  mem: { meaning: '记忆（拉丁语）', tip: 're(再) + member → 再次记起 → 记得' },
  ber: { meaning: '（后缀）', tip: 'remember = re + member' },
  prac: { meaning: '实践', tip: 'prac + tice → 实践 → 练习' },
  tice: { meaning: '（后缀）', tip: 'practice = prac + tice' },
  prob: { meaning: '测试；问题', tip: 'prob + lem → 测试的课题 → 问题' },
  lem: { meaning: '（后缀）', tip: 'problem = prob + lem' },
  suc: { meaning: '跟随；成功', tip: 'suc + cess → 跟随到底 → 成功' },
  cess: { meaning: '走；行', tip: 'success = suc + cess' },
  mis: { meaning: '错误', tip: 'mis + take → 错误的拿 → 错误' },
  take: { meaning: '拿', tip: 'mistake 是"拿错了"' },
  fu: { meaning: '（古语）', tip: 'fu + ture → 未来' },
  ture: { meaning: '名词后缀', tip: 'future = fu + ture' },
  les: { meaning: '儿子；小的', tip: 'les + son → 小课程 → 课' },
  son: { meaning: '儿子', tip: 'lesson 原意是"小段阅读"' },
  Eng: { meaning: '英格兰', tip: 'Eng + lish → 英格兰的语言 → 英语' },
  lish: { meaning: '语言（后缀）', tip: 'English = Eng + lish' },
}

// 常见单词的特殊拆分
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

// 生成有趣的解释
function generateFunExplanation(parts: string[], originalWord: string): { explanation: string; partMeanings: { part: string; meaning: string; tip: string }[] } {
  const meanings = parts.map(part => {
    const lowerPart = part.toLowerCase()
    const info = partMeanings[lowerPart]
    if (info) {
      return { part, meaning: info.meaning, tip: info.tip }
    }
    // 默认解释
    return { part, meaning: '音节', tip: `像拼拼音一样读 ${part}` }
  })

  // 根据词根词缀生成解释
  let explanation = ''
  
  if (parts.length === 2) {
    const [p1, p2] = parts
    const m1 = partMeanings[p1.toLowerCase()]
    const m2 = partMeanings[p2.toLowerCase()]
    
    if (m1 && m2) {
      explanation = `💡 **记忆法**：${m1.meaning} + ${m2.meaning} = ${originalWord}！\n\n${m1.tip}\n${m2.tip}`
    } else if (m1) {
      explanation = `💡 **记忆法**：以"${m1.meaning}"开头，加上后面的部分组成${originalWord}。\n\n${m1.tip}`
    } else if (m2) {
      explanation = `💡 **记忆法**：前面的部分加上"${m2.meaning}"，就变成了${originalWord}！\n\n${m2.tip}`
    } else {
      explanation = `💡 **音节记忆**：把 ${parts.join(' + ')} 连起来读，就是 ${originalWord}！`
    }
  } else if (parts.length >= 3) {
    explanation = `💡 **分段记忆**：把 ${originalWord} 拆成 ${parts.length} 段来记：\n`
    meanings.forEach((m, i) => {
      if (m.meaning !== '音节') {
        explanation += `${i + 1}. ${m.part} = ${m.meaning}\n`
      }
    })
    explanation += `\n连起来：${parts.join('→')}`
  } else {
    explanation = `💡 **基础词**：${originalWord} 是基础词，多读几遍就记住啦！`
  }

  return { explanation, partMeanings: meanings }
}

export function getWordBreakdown(text: string): WordBreakdown {
  const cleanText = text.trim()

  if (cleanText.includes(' ')) {
    const parts = cleanText.split(/\s+/)
    return {
      parts,
      display: parts.join('·'),
      explanation: '💡 **短语记忆**：先把每个词块的意思记住，再组合起来理解整个短语的意思。',
      partMeanings: parts.map(p => ({ part: p, meaning: '词块', tip: '记住这个词块的意思' }))
    }
  }

  const directParts = compoundParts[cleanText.toLowerCase()] || commonParts[cleanText]
  if (directParts) {
    const { explanation, partMeanings } = generateFunExplanation(directParts, cleanText)
    return {
      parts: directParts,
      display: directParts.join('·'),
      explanation,
      partMeanings
    }
  }

  const affixParts = splitByKnownAffixes(cleanText)
  if (affixParts) {
    const { explanation, partMeanings } = generateFunExplanation(affixParts, cleanText)
    return {
      parts: affixParts,
      display: affixParts.join('·'),
      explanation,
      partMeanings
    }
  }

  const simpleParts = splitSimpleWord(cleanText)
  return {
    parts: simpleParts,
    display: simpleParts.join('·'),
    explanation: `💡 **音节拆分**：把 ${cleanText} 按音节拆开读，像拼拼音一样：${simpleParts.join('-')}，更容易记住！`,
    partMeanings: simpleParts.map(p => ({ part: p, meaning: '音节', tip: `像读拼音一样读 ${p}` }))
  }
}
