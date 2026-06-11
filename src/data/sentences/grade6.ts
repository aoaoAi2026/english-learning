import { Sentence, Dialogue, Grade } from '@/types'

export const grade6Sentences: Sentence[] = [
  {
    id: 'g6-s1',
    text: 'I ____ visit the Great Wall next summer.',
    meaning: '我明年夏天将去参观长城。',
    words: ['will', 'shall', 'would', 'can'],
    blanks: [{ index: 0, answer: 'will' }],
    explanation: 'next summer 表示将来，用 will + 动词原形',
    unit: '一般将来时',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-s2',
    text: 'She ____ going to study abroad next year.',
    meaning: '她明年打算出国留学。',
    words: ['is', 'am', 'are', 'be'],
    blanks: [{ index: 0, answer: 'is' }],
    explanation: 'be going to + 动词原形，表示计划或打算',
    unit: '一般将来时',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-s3',
    text: 'I don\'t know ____ he will come tomorrow.',
    meaning: '我不知道他明天是否会来。',
    words: ['that', 'if', 'what', 'when'],
    blanks: [{ index: 1, answer: 'if' }],
    explanation: 'if 引导宾语从句，表示"是否"',
    unit: '宾语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s4',
    text: 'The teacher said ____ the earth is round.',
    meaning: '老师说地球是圆的。',
    words: ['that', 'if', 'what', 'which'],
    blanks: [{ index: 0, answer: 'that' }],
    explanation: 'that 引导宾语从句，陈述事实时用 that',
    unit: '宾语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s5',
    text: '____ it rains tomorrow, we will stay at home.',
    meaning: '如果明天下雨，我们就待在家里。',
    words: ['Because', 'If', 'When', 'While'],
    blanks: [{ index: 1, answer: 'If' }],
    explanation: 'if 引导条件状语从句，主将从现',
    unit: '条件状语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s6',
    text: 'My parents ____ come back tomorrow.',
    meaning: '我父母明天会回来。',
    words: ['will', 'shall', 'would', 'did'],
    blanks: [{ index: 0, answer: 'will' }],
    explanation: 'tomorrow 表示将来，用 will + 动词原形',
    unit: '一般将来时',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-s7',
    text: 'He asked me ____ I lived.',
    meaning: '他问我住在哪里。',
    words: ['that', 'if', 'where', 'when'],
    blanks: [{ index: 2, answer: 'where' }],
    explanation: 'where 引导宾语从句，表示地点',
    unit: '宾语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s8',
    text: 'I was doing my homework ____ my mom came back.',
    meaning: '当我妈妈回来的时候，我正在做作业。',
    words: ['when', 'while', 'if', 'because'],
    blanks: [{ index: 0, answer: 'when' }],
    explanation: 'when 引导时间状语从句，表示"当...时候"',
    unit: '时间状语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s9',
    text: 'There ____ a football match on T V tonight.',
    meaning: '今晚电视上会有一场足球比赛。',
    words: ['will have', 'will be', 'is going to have', 'is'],
    blanks: [{ index: 1, answer: 'will be' }],
    explanation: 'there be 句型的将来时：there will be',
    unit: '一般将来时',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s10',
    text: '____ he is young, he knows a lot.',
    meaning: '虽然他很年轻，但他知道很多。',
    words: ['Because', 'Although', 'If', 'When'],
    blanks: [{ index: 1, answer: 'Although' }],
    explanation: 'although 引导让步状语从句，表示"虽然"',
    unit: '让步状语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s11',
    text: 'What are you going to ____ this weekend?',
    meaning: '你这个周末打算做什么？',
    words: ['do', 'does', 'did', 'doing'],
    blanks: [{ index: 0, answer: 'do' }],
    explanation: 'be going to + 动词原形',
    unit: '一般将来时',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-s12',
    text: 'He is the boy ____ often helps me.',
    meaning: '他就是那个经常帮助我的男孩。',
    words: ['who', 'which', 'whom', 'whose'],
    blanks: [{ index: 0, answer: 'who' }],
    explanation: 'who 引导定语从句，修饰人',
    unit: '定语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s13',
    text: 'I don\'t know ____ to do next.',
    meaning: '我不知道下一步该做什么。',
    words: ['what', 'how', 'when', 'where'],
    blanks: [{ index: 0, answer: 'what' }],
    explanation: 'what to do 是"疑问词+不定式"结构',
    unit: '疑问词+不定式',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s14',
    text: '____ you work hard, you will succeed.',
    meaning: '如果你努力学习，你就会成功。',
    words: ['Because', 'If', 'When', 'Although'],
    blanks: [{ index: 1, answer: 'If' }],
    explanation: 'if 引导条件状语从句，主句用将来时，从句用一般现在时',
    unit: '条件状语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s15',
    text: 'By the end of this year, I ____ learned 2000 words.',
    meaning: '到今年年底，我将已经学会2000个单词。',
    words: ['will', 'will have', 'have', 'had'],
    blanks: [{ index: 1, answer: 'will have' }],
    explanation: '将来完成时：will have + 过去分词',
    unit: '将来完成时',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s16',
    text: 'I want to know ____ book this is.',
    meaning: '我想知道这是谁的书。',
    words: ['that', 'if', 'whose', 'which'],
    blanks: [{ index: 2, answer: 'whose' }],
    explanation: 'whose 引导宾语从句，表示"谁的"',
    unit: '宾语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s17',
    text: '____ I was watching TV, the phone rang.',
    meaning: '当我正在看电视时，电话响了。',
    words: ['When', 'While', 'If', 'Because'],
    blanks: [{ index: 1, answer: 'While' }],
    explanation: 'while 引导时间状语从句，常与进行时连用',
    unit: '时间状语从句',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-s18',
    text: 'Tom said that he ____ help me with my English.',
    meaning: '汤姆说他会帮我学英语。',
    words: ['will', 'would', 'can', 'may'],
    blanks: [{ index: 1, answer: 'would' }],
    explanation: '宾语从句中，主句是过去时，从句用相应的过去时态',
    unit: '宾语从句时态',
    grade: Grade.SIX,
    difficulty: 3
  }
]

export const grade6Dialogues: Dialogue[] = [
  {
    id: 'g6-d1',
    title: '暑期计划',
    meaning: '两个同学在讨论暑假计划。',
    lines: [
      { speaker: 'A', text: 'What are you going to do this summer?', meaning: '你今年夏天打算做什么？' },
      { speaker: 'B', text: 'I will travel to Beijing with my family.', meaning: '我将和家人一起去北京旅游。' },
      { speaker: 'A', text: 'Will you visit the Great Wall?', meaning: '你会去长城吗？' },
      { speaker: 'B', text: 'Yes! And I will take many photos.', meaning: '是的！我会拍很多照片。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 0, answer: 'will', options: ['will', 'shall', 'would', 'can'] }
    ],
    unit: '计划',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-d2',
    title: '谈论未来梦想',
    meaning: '两个朋友在谈论各自的梦想。',
    lines: [
      { speaker: 'A', text: 'What do you want to be when you grow up?', meaning: '你长大后想做什么？' },
      { speaker: 'B', text: 'I want to be a doctor. I will help many people.', meaning: '我想成为一名医生。我会帮助很多人。' },
      { speaker: 'A', text: 'If you study hard, your dream will come true.', meaning: '如果你努力学习，你的梦想就会实现。' },
      { speaker: 'B', text: 'Thank you! I believe that I can do it.', meaning: '谢谢你！我相信我能做到。' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 0, answer: 'If', options: ['Because', 'If', 'When', 'Although'] }
    ],
    unit: '梦想',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-d3',
    title: '询问周末安排',
    meaning: '小明打电话给小红询问周末是否有空。',
    lines: [
      { speaker: 'A', text: 'Hi! Are you free this weekend?', meaning: '嗨！你这周末有空吗？' },
      { speaker: 'B', text: 'I think so. What are you going to do?', meaning: '我想是的。你打算做什么？' },
      { speaker: 'A', text: 'I am going to watch a movie. Will you come?', meaning: '我打算去看电影。你会来吗？' },
      { speaker: 'B', text: 'Sure! I would love to join you.', meaning: '当然！我很想和你一起去。' }
    ],
    blanks: [
      { lineIndex: 2, blankIndex: 3, answer: 'Will', options: ['Will', 'Shall', 'Would', 'Can'] }
    ],
    unit: '约会',
    grade: Grade.SIX,
    difficulty: 2
  },
  {
    id: 'g6-d4',
    title: '谈论学校活动',
    meaning: '两个同学在讨论学校即将举行的运动会。',
    lines: [
      { speaker: 'A', text: 'Do you know when the sports meeting will begin?', meaning: '你知道运动会什么时候开始吗？' },
      { speaker: 'B', text: 'The teacher said that it would be next Monday.', meaning: '老师说会在下周一。' },
      { speaker: 'A', text: 'Will you take part in any events?', meaning: '你会参加什么项目吗？' },
      { speaker: 'B', text: 'Yes, I will run in the 100-meter race.', meaning: '是的，我会参加100米赛跑。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 5, answer: 'that', options: ['that', 'if', 'what', 'when'] }
    ],
    unit: '学校活动',
    grade: Grade.SIX,
    difficulty: 3
  },
  {
    id: 'g6-d5',
    title: '讨论天气与出行',
    meaning: '两个朋友在讨论明天的出行计划。',
    lines: [
      { speaker: 'A', text: 'The radio says that it will rain tomorrow.', meaning: '广播说明天会下雨。' },
      { speaker: 'B', text: 'If it rains, we will not go hiking.', meaning: '如果下雨，我们就不去远足了。' },
      { speaker: 'A', text: 'What will we do then?', meaning: '那我们做什么呢？' },
      { speaker: 'B', text: 'We can stay at home and watch movies.', meaning: '我们可以待在家里看电影。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 0, answer: 'If', options: ['Because', 'If', 'When', 'Although'] }
    ],
    unit: '天气',
    grade: Grade.SIX,
    difficulty: 3
  }
]

export function getGrade6Sentences(): Sentence[] {
  return grade6Sentences
}

export function getGrade6Dialogues(): Dialogue[] {
  return grade6Dialogues
}
