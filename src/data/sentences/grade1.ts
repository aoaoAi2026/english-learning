import { Sentence, Dialogue, Grade } from '@/types'

// 一年级句子练习
export const grade1Sentences: Sentence[] = [
  {
    id: 'g1-s1',
    text: 'I ____ a boy.',
    meaning: '我是一个男孩。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 1, answer: 'am' }],
    explanation: 'I 后面要用 am',
    unit: 'be动词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s2',
    text: 'This ____ an apple.',
    meaning: '这是一个苹果。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 1, answer: 'is' }],
    explanation: 'This 后面要用 is',
    unit: 'be动词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s3',
    text: 'They ____ my friends.',
    meaning: '他们是我的朋友。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 1, answer: 'are' }],
    explanation: 'They 后面要用 are',
    unit: 'be动词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s4',
    text: 'I have ____ apples.',
    meaning: '我有三个苹果。',
    words: ['three', 'tree', 'there', 'the'],
    blanks: [{ index: 2, answer: 'three' }],
    explanation: 'three 是数字3',
    unit: '数字',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s5',
    text: 'I like ____ cat.',
    meaning: '我喜欢我的猫。',
    words: ['my', 'I', 'me', 'mine'],
    blanks: [{ index: 2, answer: 'my' }],
    explanation: 'my 表示"我的"',
    unit: '代词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s6',
    text: '____ is your name?',
    meaning: '你叫什么名字？',
    words: ['What', 'When', 'Where', 'Who'],
    blanks: [{ index: 0, answer: 'What' }],
    explanation: '问名字用 What',
    unit: '疑问词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s7',
    text: 'I can ____ a song.',
    meaning: '我会唱歌。',
    words: ['sing', 'song', 'sign', 'sink'],
    blanks: [{ index: 3, answer: 'sing' }],
    explanation: 'sing a song 唱歌',
    unit: '动词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s8',
    text: 'The sky is ____.',
    meaning: '天空是蓝色的。',
    words: ['blue', 'red', 'green', 'yellow'],
    blanks: [{ index: 3, answer: 'blue' }],
    explanation: 'blue 蓝色',
    unit: '颜色',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s9',
    text: 'I eat ____ every day.',
    meaning: '我每天吃苹果。',
    words: ['apples', 'banana', 'orange', 'grape'],
    blanks: [{ index: 2, answer: 'apples' }],
    explanation: 'apples 是复数形式',
    unit: '名词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s10',
    text: '____ you like apples?',
    meaning: '你喜欢苹果吗？',
    words: ['Do', 'Does', 'Is', 'Are'],
    blanks: [{ index: 0, answer: 'Do' }],
    explanation: 'you 做主语时用 Do 提问',
    unit: '助动词',
    grade: Grade.ONE,
    difficulty: 2
  },
  {
    id: 'g1-s11',
    text: 'I am ____ years old.',
    meaning: '我七岁了。',
    words: ['seven', 'seventeen', 'seventy', 'six'],
    blanks: [{ index: 2, answer: 'seven' }],
    explanation: 'seven 7',
    unit: '数字',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s12',
    text: '____ is the sun.',
    meaning: '那是太阳。',
    words: ['That', 'What', 'When', 'Where'],
    blanks: [{ index: 0, answer: 'That' }],
    explanation: 'That 那个',
    unit: '代词',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s13',
    text: 'Look at the ____.',
    meaning: '看那只鸟。',
    words: ['bird', 'bored', 'board', 'birth'],
    blanks: [{ index: 3, answer: 'bird' }],
    explanation: 'bird 鸟',
    unit: '动物',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s14',
    text: 'My mother is a ____.',
    meaning: '我妈妈是一位老师。',
    words: ['teacher', 'teach', 'teaching', 'teaches'],
    blanks: [{ index: 4, answer: 'teacher' }],
    explanation: 'teacher 老师',
    unit: '职业',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-s15',
    text: 'Good ____, Mom!',
    meaning: '早上好，妈妈！',
    words: ['morning', 'night', 'evening', 'day'],
    blanks: [{ index: 1, answer: 'morning' }],
    explanation: 'Good morning 早上好',
    unit: '问候',
    grade: Grade.ONE,
    difficulty: 1
  }
]

// 一年级情景对话
export const grade1Dialogues: Dialogue[] = [
  {
    id: 'g1-d1',
    title: '在学校',
    meaning: '早上两个小朋友在学校见面问好。',
    lines: [
      { speaker: 'A', text: 'Good morning, Tom!', meaning: '早上好，汤姆！' },
      { speaker: 'B', text: 'Good morning, Alice!', meaning: '早上好，爱丽丝！' },
      { speaker: 'A', text: 'How are you?', meaning: '你好吗？' },
      { speaker: 'B', text: 'I am fine. Thank you!', meaning: '我很好，谢谢！' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 1, answer: 'morning', options: ['morning', 'night', 'evening', 'day'] }
    ],
    unit: '问候',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-d2',
    title: '介绍家人',
    meaning: '小明介绍自己的家人给朋友看。',
    lines: [
      { speaker: 'A', text: 'Look! This is my family.', meaning: '看！这是我的家人。' },
      { speaker: 'B', text: 'Who is she?', meaning: '她是谁？' },
      { speaker: 'A', text: 'She is my mother.', meaning: '她是我妈妈。' },
      { speaker: 'B', text: 'Your mother is very nice!', meaning: '你妈妈真好！' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 1, answer: 'is', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '介绍',
    grade: Grade.ONE,
    difficulty: 1
  },
  {
    id: 'g1-d3',
    title: '买水果',
    meaning: '在水果店里买水果的简单对话。',
    lines: [
      { speaker: 'A', text: 'I like apples.', meaning: '我喜欢苹果。' },
      { speaker: 'B', text: 'I like apples, too!', meaning: '我也喜欢苹果！' },
      { speaker: 'A', text: 'Let us buy some apples.', meaning: '我们去买一些苹果吧。' },
      { speaker: 'B', text: 'Great!', meaning: '太好了！' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 3, answer: 'too', options: ['too', 'to', 'two', 'toe'] }
    ],
    unit: '购物',
    grade: Grade.ONE,
    difficulty: 2
  },
  {
    id: 'g1-d4',
    title: '放学回家',
    meaning: '两个小朋友放学时的简单对话。',
    lines: [
      { speaker: 'A', text: 'Goodbye, Jim!', meaning: '再见，吉姆！' },
      { speaker: 'B', text: 'Goodbye, Lily! See you tomorrow!', meaning: '再见，莉莉！明天见！' },
      { speaker: 'A', text: 'See you!', meaning: '再见！' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 4, answer: 'tomorrow', options: ['tomorrow', 'today', 'yesterday', 'tonight'] }
    ],
    unit: '告别',
    grade: Grade.ONE,
    difficulty: 2
  }
]

// 获取一年级句子
export function getGrade1Sentences(): Sentence[] {
  return grade1Sentences
}

// 获取一年级对话
export function getGrade1Dialogues(): Dialogue[] {
  return grade1Dialogues
}
