import { Sentence, Dialogue, Grade } from '@/types'

export const grade3Sentences: Sentence[] = [
  {
    id: 'g3-s1',
    text: 'He is ____ a book now.',
    meaning: '他现在正在读书。',
    words: ['read', 'reads', 'reading', 'reads'],
    blanks: [{ index: 2, answer: 'reading' }],
    explanation: 'now 表示现在进行时，用 be + 动词ing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s2',
    text: 'They are ____ football in the park.',
    meaning: '他们正在公园里踢足球。',
    words: ['play', 'plays', 'playing', 'played'],
    blanks: [{ index: 2, answer: 'playing' }],
    explanation: '现在进行时结构：be + 动词ing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s3',
    text: 'She ____ to school by bus every day.',
    meaning: '她每天坐公交车去上学。',
    words: ['go', 'goes', 'going', 'went'],
    blanks: [{ index: 1, answer: 'goes' }],
    explanation: 'every day 是一般现在时标志，第三人称单数用 goes',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s4',
    text: 'My brother ____ T V every evening.',
    meaning: '我哥哥每天晚上看电视。',
    words: ['watch', 'watches', 'watching', 'watched'],
    blanks: [{ index: 1, answer: 'watches' }],
    explanation: '以 ch 结尾的动词，第三人称单数加 es',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s5',
    text: 'Look! The birds ____ flying.',
    meaning: '看！鸟儿正在飞。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 2, answer: 'are' }],
    explanation: 'The birds 是复数，现在进行时用 are + 动词ing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s6',
    text: 'I am ____ my homework now.',
    meaning: '我现在正在做作业。',
    words: ['do', 'does', 'doing', 'did'],
    blanks: [{ index: 2, answer: 'doing' }],
    explanation: '现在进行时结构：am + 动词ing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 1
  },
  {
    id: 'g3-s7',
    text: 'Tom ____ breakfast at 7 o\'clock.',
    meaning: '汤姆七点吃早餐。',
    words: ['have', 'has', 'having', 'had'],
    blanks: [{ index: 1, answer: 'has' }],
    explanation: 'Tom 是第三人称单数，用 has',
    unit: 'have/has',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s8',
    text: 'The teacher is ____ on the blackboard.',
    meaning: '老师正在黑板上写字。',
    words: ['write', 'writes', 'writing', 'wrote'],
    blanks: [{ index: 2, answer: 'writing' }],
    explanation: '现在进行时：is + writing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s9',
    text: 'My cat ____ fish very much.',
    meaning: '我的猫非常喜欢吃鱼。',
    words: ['like', 'likes', 'liking', 'liked'],
    blanks: [{ index: 1, answer: 'likes' }],
    explanation: 'My cat 是第三人称单数，动词加 s',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s10',
    text: 'What ____ you doing now?',
    meaning: '你现在在做什么？',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 2, answer: 'are' }],
    explanation: 'you 做主语，现在进行时用 are',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s11',
    text: 'Lucy ____ English every morning.',
    meaning: '露西每天早上读英语。',
    words: ['study', 'studies', 'studying', 'studied'],
    blanks: [{ index: 1, answer: 'studies' }],
    explanation: '以辅音字母 + y 结尾的动词，y 变 i 加 es',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 3
  },
  {
    id: 'g3-s12',
    text: 'Listen! Someone is ____.',
    meaning: '听！有人在唱歌。',
    words: ['sing', 'sings', 'singing', 'sang'],
    blanks: [{ index: 2, answer: 'singing' }],
    explanation: 'Listen! 是现在进行时的标志',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s13',
    text: 'He ____ not like apples.',
    meaning: '他不喜欢苹果。',
    words: ['do', 'does', 'is', 'are'],
    blanks: [{ index: 1, answer: 'does' }],
    explanation: 'He 是第三人称单数，否定句用 does not',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 3
  },
  {
    id: 'g3-s14',
    text: 'The children are ____ in the playground.',
    meaning: '孩子们正在操场上玩。',
    words: ['play', 'plays', 'playing', 'played'],
    blanks: [{ index: 2, answer: 'playing' }],
    explanation: 'The children 是复数，现在进行时用 are + playing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s15',
    text: 'My mother ____ the dishes after dinner.',
    meaning: '我妈妈晚饭后洗碗。',
    words: ['wash', 'washes', 'washing', 'washed'],
    blanks: [{ index: 1, answer: 'washes' }],
    explanation: '以 sh 结尾的动词，第三人称单数加 es',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 3
  },
  {
    id: 'g3-s16',
    text: 'It is ____ outside now.',
    meaning: '外面正在下雨。',
    words: ['rain', 'rains', 'raining', 'rained'],
    blanks: [{ index: 2, answer: 'raining' }],
    explanation: 'now 表示现在进行时',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s17',
    text: 'My sister ____ a red dress today.',
    meaning: '我姐姐今天穿一条红裙子。',
    words: ['wear', 'wears', 'wearing', 'wore'],
    blanks: [{ index: 1, answer: 'wears' }],
    explanation: 'My sister 是第三人称单数，动词用 wears',
    unit: '一般现在时三单',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-s18',
    text: 'The dog is ____ after the cat.',
    meaning: '狗正在追猫。',
    words: ['run', 'runs', 'running', 'ran'],
    blanks: [{ index: 2, answer: 'running' }],
    explanation: '以重读闭音节结尾的动词，双写末尾辅音字母再加 ing',
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 3
  }
]

export const grade3Dialogues: Dialogue[] = [
  {
    id: 'g3-d1',
    title: '在图书馆',
    meaning: '两个同学在图书馆里谈论正在做的事情。',
    lines: [
      { speaker: 'A', text: 'What are you doing?', meaning: '你在做什么？' },
      { speaker: 'B', text: 'I am reading a storybook.', meaning: '我正在读一本故事书。' },
      { speaker: 'A', text: 'Is Tom reading, too?', meaning: '汤姆也在读书吗？' },
      { speaker: 'B', text: 'No, he is writing something.', meaning: '不，他在写东西。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 1, answer: 'am', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '现在进行时',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-d2',
    title: '周末活动',
    meaning: '两个朋友在谈论周末通常做什么。',
    lines: [
      { speaker: 'A', text: 'What do you do on weekends?', meaning: '你周末做什么？' },
      { speaker: 'B', text: 'I usually play football with my friends.', meaning: '我通常和朋友们踢足球。' },
      { speaker: 'A', text: 'Does your brother play with you?', meaning: '你哥哥和你一起玩吗？' },
      { speaker: 'B', text: 'No, he watches T V at home.', meaning: '不，他在家看电视。' }
    ],
    blanks: [
      { lineIndex: 3, blankIndex: 2, answer: 'watches', options: ['watch', 'watches', 'watching', 'watched'] }
    ],
    unit: '日常活动',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-d3',
    title: '在操场上',
    meaning: '老师和学生在操场上的对话。',
    lines: [
      { speaker: 'A', text: 'Look! The children are playing basketball.', meaning: '看！孩子们正在打篮球。' },
      { speaker: 'B', text: 'Yes! They are playing very well.', meaning: '是的！他们打得非常好。' },
      { speaker: 'A', text: 'Who is running over there?', meaning: '那边谁在跑步？' },
      { speaker: 'B', text: 'That is Jim. He runs every day.', meaning: '那是吉姆。他每天都跑步。' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 4, answer: 'are', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '运动',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-d4',
    title: '打电话',
    meaning: '小红打电话给小丽询问她正在做什么。',
    lines: [
      { speaker: 'A', text: 'Hello! This is Mary speaking.', meaning: '你好！我是玛丽。' },
      { speaker: 'B', text: 'Hi, Mary! What are you doing now?', meaning: '嗨，玛丽！你现在在做什么？' },
      { speaker: 'A', text: 'I am cooking dinner with my mom.', meaning: '我正在和妈妈一起做晚饭。' },
      { speaker: 'B', text: 'Wow! That sounds fun!', meaning: '哇！听起来很有趣！' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 1, answer: 'am', options: ['is', 'am', 'are', 'be'] }
    ],
    unit: '打电话',
    grade: Grade.THREE,
    difficulty: 2
  },
  {
    id: 'g3-d5',
    title: '谈论宠物的日常',
    meaning: '两个同学在谈论各自宠物的日常行为。',
    lines: [
      { speaker: 'A', text: 'Does your dog sleep in the morning?', meaning: '你的狗早上睡觉吗？' },
      { speaker: 'B', text: 'Yes, it sleeps a lot.', meaning: '是的，它睡很多。' },
      { speaker: 'A', text: 'What does it eat?', meaning: '它吃什么？' },
      { speaker: 'B', text: 'It eats dog food and meat.', meaning: '它吃狗粮和肉。' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 0, answer: 'Does', options: ['Do', 'Does', 'Is', 'Are'] }
    ],
    unit: '宠物',
    grade: Grade.THREE,
    difficulty: 3
  }
]

export function getGrade3Sentences(): Sentence[] {
  return grade3Sentences
}

export function getGrade3Dialogues(): Dialogue[] {
  return grade3Dialogues
}
