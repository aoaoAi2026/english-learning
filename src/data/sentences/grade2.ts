import { Sentence, Dialogue, Grade } from '@/types'

export const grade2Sentences: Sentence[] = [
  {
    id: 'g2-s1',
    text: 'We ____ good friends.',
    meaning: '我们是好朋友。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 2, answer: 'are' }],
    explanation: 'We 是复数主语，后面用 are',
    unit: 'be动词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s2',
    text: 'She ____ a teacher.',
    meaning: '她是一位老师。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 0, answer: 'is' }],
    explanation: 'She 是第三人称单数，后面用 is',
    unit: 'be动词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s3',
    text: 'My sister ____ to school every day.',
    meaning: '我妹妹每天上学。',
    words: ['go', 'goes', 'going', 'went'],
    blanks: [{ index: 1, answer: 'goes' }],
    explanation: 'My sister 是第三人称单数，一般现在时动词加 s',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s4',
    text: 'I ____ books in the library.',
    meaning: '我在图书馆读书。',
    words: ['read', 'reads', 'reading', 'red'],
    blanks: [{ index: 0, answer: 'read' }],
    explanation: 'I 做主语，一般现在时动词用原形',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s5',
    text: 'The cat is ____ the box.',
    meaning: '猫在盒子里。',
    words: ['in', 'on', 'under', 'at'],
    blanks: [{ index: 0, answer: 'in' }],
    explanation: 'in 表示"在...里面"',
    unit: '介词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s6',
    text: 'The book is ____ the desk.',
    meaning: '书在桌子上。',
    words: ['in', 'on', 'under', 'at'],
    blanks: [{ index: 1, answer: 'on' }],
    explanation: 'on 表示"在...上面"',
    unit: '介词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s7',
    text: 'Tom ____ football with his friends.',
    meaning: '汤姆和他的朋友们踢足球。',
    words: ['play', 'plays', 'playing', 'played'],
    blanks: [{ index: 1, answer: 'plays' }],
    explanation: 'Tom 是第三人称单数，一般现在时动词用 plays',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s8',
    text: 'These ____ my pencils.',
    meaning: '这些是我的铅笔。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 2, answer: 'are' }],
    explanation: 'These 是复数指示代词，用 are',
    unit: 'be动词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s9',
    text: 'I ____ a red apple every day.',
    meaning: '我每天吃一个红苹果。',
    words: ['eat', 'eats', 'ate', 'eating'],
    blanks: [{ index: 0, answer: 'eat' }],
    explanation: 'I 做主语，一般现在时动词用原形',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s10',
    text: '____ you like bananas?',
    meaning: '你喜欢香蕉吗？',
    words: ['Do', 'Does', 'Is', 'Are'],
    blanks: [{ index: 0, answer: 'Do' }],
    explanation: 'you 做主语时用 Do 提问',
    unit: '助动词',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s11',
    text: 'My father ____ a car.',
    meaning: '我爸爸有一辆车。',
    words: ['have', 'has', 'having', 'had'],
    blanks: [{ index: 1, answer: 'has' }],
    explanation: 'My father 是第三人称单数，用 has',
    unit: 'have/has',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s12',
    text: '____ you have a pet?',
    meaning: '你有宠物吗？',
    words: ['Do', 'Does', 'Is', 'Are'],
    blanks: [{ index: 0, answer: 'Do' }],
    explanation: 'you 做主语时用 Do 提问',
    unit: '助动词',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s13',
    text: 'The ball is ____ the chair.',
    meaning: '球在椅子下面。',
    words: ['in', 'on', 'under', 'at'],
    blanks: [{ index: 2, answer: 'under' }],
    explanation: 'under 表示"在...下面"',
    unit: '介词',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s14',
    text: 'My mother ____ dinner every evening.',
    meaning: '我妈妈每天晚上做晚饭。',
    words: ['cook', 'cooks', 'cooking', 'cooked'],
    blanks: [{ index: 1, answer: 'cooks' }],
    explanation: 'My mother 是第三人称单数，动词用 cooks',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s15',
    text: 'There ____ two cats in the garden.',
    meaning: '花园里有两只猫。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 2, answer: 'are' }],
    explanation: 'two cats 是复数，用 are',
    unit: 'There be',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s16',
    text: 'Mary ____ her homework after school.',
    meaning: '玛丽放学后做作业。',
    words: ['do', 'does', 'doing', 'did'],
    blanks: [{ index: 1, answer: 'does' }],
    explanation: 'Mary 是第三人称单数，用 does',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-s17',
    text: 'I am ____ years old.',
    meaning: '我八岁了。',
    words: ['eight', 'eighteen', 'eighty', 'eighth'],
    blanks: [{ index: 0, answer: 'eight' }],
    explanation: 'eight 8',
    unit: '数字',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-s18',
    text: 'The birds ____ in the sky.',
    meaning: '鸟儿在天空中飞翔。',
    words: ['fly', 'flies', 'flying', 'flew'],
    blanks: [{ index: 0, answer: 'fly' }],
    explanation: 'The birds 是复数，一般现在时用动词原形',
    unit: '一般现在时',
    grade: Grade.TWO,
    difficulty: 2
  }
]

export const grade2Dialogues: Dialogue[] = [
  {
    id: 'g2-d1',
    title: '在公园',
    meaning: '两个小朋友在公园里谈论看到的东西。',
    lines: [
      { speaker: 'A', text: 'Look! There is a bird in the tree.', meaning: '看！树上有一只鸟。' },
      { speaker: 'B', text: 'Yes! It is singing.', meaning: '是的！它在唱歌。' },
      { speaker: 'A', text: 'I like birds.', meaning: '我喜欢鸟。' },
      { speaker: 'B', text: 'I like birds, too!', meaning: '我也喜欢鸟！' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 4, answer: 'in', options: ['in', 'on', 'under', 'at'] }
    ],
    unit: '位置',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-d2',
    title: '介绍家庭成员',
    meaning: '小红向小丽介绍自己的家庭成员。',
    lines: [
      { speaker: 'A', text: 'This is my family.', meaning: '这是我的家人。' },
      { speaker: 'B', text: 'Who is he?', meaning: '他是谁？' },
      { speaker: 'A', text: 'He is my father. He is a doctor.', meaning: '他是我爸爸。他是一位医生。' },
      { speaker: 'B', text: 'Wow! Your father is great!', meaning: '哇！你爸爸真棒！' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 1, answer: 'is', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '介绍',
    grade: Grade.TWO,
    difficulty: 1
  },
  {
    id: 'g2-d3',
    title: '在商店里',
    meaning: '小朋友在商店里询问店员。',
    lines: [
      { speaker: 'A', text: 'Excuse me. Do you have a pen?', meaning: '打扰一下。你有笔吗？' },
      { speaker: 'B', text: 'Yes, I do.', meaning: '是的，我有。' },
      { speaker: 'A', text: 'How much is it?', meaning: '多少钱？' },
      { speaker: 'B', text: 'It is ten yuan.', meaning: '十元。' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 2, answer: 'Do', options: ['Do', 'Does', 'Is', 'Are'] }
    ],
    unit: '购物',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-d4',
    title: '谈论宠物',
    meaning: '两个小朋友讨论各自的宠物。',
    lines: [
      { speaker: 'A', text: 'Do you have a pet?', meaning: '你有宠物吗？' },
      { speaker: 'B', text: 'Yes, I have a cat.', meaning: '是的，我有一只猫。' },
      { speaker: 'A', text: 'What does it eat?', meaning: '它吃什么？' },
      { speaker: 'B', text: 'It eats fish.', meaning: '它吃鱼。' }
    ],
    blanks: [
      { lineIndex: 3, blankIndex: 2, answer: 'eats', options: ['eat', 'eats', 'eating', 'ate'] }
    ],
    unit: '宠物',
    grade: Grade.TWO,
    difficulty: 2
  },
  {
    id: 'g2-d5',
    title: '打电话约玩',
    meaning: '小明打电话约小刚一起玩。',
    lines: [
      { speaker: 'A', text: 'Hello! This is Tom.', meaning: '你好！我是汤姆。' },
      { speaker: 'B', text: 'Hi, Tom! What are you doing?', meaning: '嗨，汤姆！你在做什么？' },
      { speaker: 'A', text: 'I am reading a book.', meaning: '我正在读书。' },
      { speaker: 'B', text: 'Let us play football!', meaning: '我们去踢足球吧！' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 1, answer: 'am', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '日常活动',
    grade: Grade.TWO,
    difficulty: 2
  }
]

export function getGrade2Sentences(): Sentence[] {
  return grade2Sentences
}

export function getGrade2Dialogues(): Dialogue[] {
  return grade2Dialogues
}
