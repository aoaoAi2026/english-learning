import { Sentence, Dialogue, Grade } from '@/types'

export const grade5Sentences: Sentence[] = [
  {
    id: 'g5-s1',
    text: 'I have ____ finished my homework.',
    meaning: '我已经完成了作业。',
    words: ['already', 'yet', 'ever', 'never'],
    blanks: [{ index: 0, answer: 'already' }],
    explanation: 'already 用于肯定句中，表示"已经"',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s2',
    text: 'Have you ____ been to the Great Wall?',
    meaning: '你曾经去过长城吗？',
    words: ['already', 'yet', 'ever', 'never'],
    blanks: [{ index: 2, answer: 'ever' }],
    explanation: 'ever 用于疑问句中，表示"曾经"',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s3',
    text: 'I have ____ seen such a beautiful sunset.',
    meaning: '我从未见过如此美丽的日落。',
    words: ['already', 'yet', 'ever', 'never'],
    blanks: [{ index: 3, answer: 'never' }],
    explanation: 'never 表示"从未"，用于否定句',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s4',
    text: 'You ____ wear a seatbelt in the car.',
    meaning: '你在车里必须系安全带。',
    words: ['can', 'must', 'may', 'should'],
    blanks: [{ index: 1, answer: 'must' }],
    explanation: 'must 表示"必须"，用于强调义务',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s5',
    text: 'My sister ____ play the piano very well.',
    meaning: '我姐姐钢琴弹得很好。',
    words: ['can', 'must', 'may', 'should'],
    blanks: [{ index: 0, answer: 'can' }],
    explanation: 'can 表示"能够"，用于表达能力',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 1
  },
  {
    id: 'g5-s6',
    text: 'She has ____ to Shanghai three times.',
    meaning: '她去过上海三次。',
    words: ['go', 'goes', 'gone', 'been'],
    blanks: [{ index: 3, answer: 'been' }],
    explanation: 'have been to 表示"去过某地"（已回来）',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s7',
    text: 'I have lived in this city ____ ten years.',
    meaning: '我在这个城市住了十年。',
    words: ['since', 'for', 'in', 'at'],
    blanks: [{ index: 1, answer: 'for' }],
    explanation: 'for + 时间段，表示动作持续的时间',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s8',
    text: 'We have studied English ____ 2018.',
    meaning: '我们从2018年开始学习英语。',
    words: ['since', 'for', 'in', 'at'],
    blanks: [{ index: 0, answer: 'since' }],
    explanation: 'since + 时间点，表示动作开始的时间',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s9',
    text: 'He ____ speak three languages.',
    meaning: '他能说三种语言。',
    words: ['can', 'must', 'may', 'should'],
    blanks: [{ index: 0, answer: 'can' }],
    explanation: 'can 表示有某种能力',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s10',
    text: 'Students ____ be quiet in the library.',
    meaning: '学生在图书馆必须保持安静。',
    words: ['can', 'must', 'may', 'might'],
    blanks: [{ index: 1, answer: 'must' }],
    explanation: 'must 表示必须遵守的规定',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s11',
    text: 'Have you ____ eaten sushi?',
    meaning: '你吃过寿司吗？',
    words: ['already', 'yet', 'ever', 'never'],
    blanks: [{ index: 2, answer: 'ever' }],
    explanation: 'ever 用于疑问句中，询问是否有过某种经历',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s12',
    text: 'I have just ____ a new movie.',
    meaning: '我刚看完一部新电影。',
    words: ['see', 'sees', 'saw', 'seen'],
    blanks: [{ index: 3, answer: 'seen' }],
    explanation: '现在完成时结构：have + 过去分词；see 的过去分词是 seen',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s13',
    text: 'You ____ not smoke in the hospital.',
    meaning: '你不许在医院抽烟。',
    words: ['can', 'must', 'may', 'should'],
    blanks: [{ index: 1, answer: 'must' }],
    explanation: 'must not 表示"禁止、不许"',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s14',
    text: 'They have ____ learned over 1000 words.',
    meaning: '他们已经学了1000多个单词。',
    words: ['already', 'yet', 'ever', 'never'],
    blanks: [{ index: 0, answer: 'already' }],
    explanation: 'already 用于肯定句，表示"已经"完成',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-s15',
    text: '____ I borrow your pen?',
    meaning: '我能借你的笔吗？',
    words: ['Can', 'Must', 'Have', 'Had'],
    blanks: [{ index: 0, answer: 'Can' }],
    explanation: 'can 用于请求允许，表示"可以"',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 1
  },
  {
    id: 'g5-s16',
    text: 'The book is very interesting. I have ____ it twice.',
    meaning: '这本书很有趣。我已经读了两遍。',
    words: ['read', 'reads', 'reading', 'read'],
    blanks: [{ index: 0, answer: 'read' }],
    explanation: '现在完成时用过去分词；read 的过去分词还是 read（读音不同）',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s17',
    text: 'She ____ have arrived home by now.',
    meaning: '她现在一定已经到家了。',
    words: ['can', 'must', 'may', 'might'],
    blanks: [{ index: 1, answer: 'must' }],
    explanation: 'must have + 过去分词表示对过去的推测',
    unit: '情态动词',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-s18',
    text: 'He has worked here ____ he graduated.',
    meaning: '他从毕业起就在这里工作。',
    words: ['since', 'for', 'in', 'at'],
    blanks: [{ index: 0, answer: 'since' }],
    explanation: 'since 后接从句或时间点，表示"自从...以来"',
    unit: '现在完成时',
    grade: Grade.FIVE,
    difficulty: 3
  }
]

export const grade5Dialogues: Dialogue[] = [
  {
    id: 'g5-d1',
    title: '谈论旅行经历',
    meaning: '两个同学在谈论各自去过的地方。',
    lines: [
      { speaker: 'A', text: 'Have you ever been to Beijing?', meaning: '你去过北京吗？' },
      { speaker: 'B', text: 'Yes, I have. I went there last year.', meaning: '是的，我去过。我去年去的。' },
      { speaker: 'A', text: 'I have never been there. Can you tell me about it?', meaning: '我从没去过。你能给我讲讲吗？' },
      { speaker: 'B', text: 'Sure! You must visit the Great Wall!', meaning: '当然！你一定要去长城看看！' }
    ],
    blanks: [
      { lineIndex: 3, blankIndex: 3, answer: 'must', options: ['can', 'must', 'may', 'should'] }
    ],
    unit: '旅行',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-d2',
    title: '询问作业情况',
    meaning: '老师询问学生作业是否完成。',
    lines: [
      { speaker: 'A', text: 'Have you finished your homework?', meaning: '你完成作业了吗？' },
      { speaker: 'B', text: 'Yes, I have already finished it.', meaning: '是的，我已经做完了。' },
      { speaker: 'A', text: 'Good! You must hand it in tomorrow.', meaning: '好！你明天必须交上来。' },
      { speaker: 'B', text: 'I will. Thank you, teacher!', meaning: '我会的。谢谢老师！' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 3, answer: 'already', options: ['already', 'yet', 'ever', 'never'] }
    ],
    unit: '学校',
    grade: Grade.FIVE,
    difficulty: 2
  },
  {
    id: 'g5-d3',
    title: '在博物馆',
    meaning: '两个朋友在参观博物馆时的对话。',
    lines: [
      { speaker: 'A', text: 'Wow! Can we take photos here?', meaning: '哇！我们能在这里拍照吗？' },
      { speaker: 'B', text: 'No, you must not. Look at the sign.', meaning: '不行，禁止拍照。看那个标志。' },
      { speaker: 'A', text: 'Oh, I see. Have you been here before?', meaning: '哦，我知道了。你以前来过吗？' },
      { speaker: 'B', text: 'Yes, I have been here three times.', meaning: '是的，我来过三次了。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 3, answer: 'must', options: ['can', 'must', 'may', 'should'] }
    ],
    unit: '博物馆',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-d4',
    title: '谈论学习经历',
    meaning: '两个同学在讨论学习英语的经历。',
    lines: [
      { speaker: 'A', text: 'How long have you studied English?', meaning: '你学英语多久了？' },
      { speaker: 'B', text: 'I have studied English for five years.', meaning: '我学英语已经五年了。' },
      { speaker: 'A', text: 'Can you speak English fluently?', meaning: '你能流利地说英语吗？' },
      { speaker: 'B', text: 'Yes, I can speak English well now.', meaning: '是的，我现在英语说得很好。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 4, answer: 'for', options: ['since', 'for', 'in', 'at'] }
    ],
    unit: '学习',
    grade: Grade.FIVE,
    difficulty: 3
  },
  {
    id: 'g5-d5',
    title: '餐厅点餐',
    meaning: '两个朋友在餐厅里点餐时的对话。',
    lines: [
      { speaker: 'A', text: 'Have you ever eaten Japanese food?', meaning: '你吃过日本料理吗？' },
      { speaker: 'B', text: 'No, I have never tried it before.', meaning: '没有，我从来没试过。' },
      { speaker: 'A', text: 'You must try the sushi. It is delicious!', meaning: '你一定要尝尝寿司，很好吃！' },
      { speaker: 'B', text: 'OK, I will. Can you recommend something?', meaning: '好的，我会的。你能推荐一些吗？' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 2, answer: 'ever', options: ['already', 'yet', 'ever', 'never'] }
    ],
    unit: '餐饮',
    grade: Grade.FIVE,
    difficulty: 3
  }
]

export function getGrade5Sentences(): Sentence[] {
  return grade5Sentences
}

export function getGrade5Dialogues(): Dialogue[] {
  return grade5Dialogues
}
