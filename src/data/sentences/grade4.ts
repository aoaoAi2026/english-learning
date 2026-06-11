import { Sentence, Dialogue, Grade } from '@/types'

export const grade4Sentences: Sentence[] = [
  {
    id: 'g4-s1',
    text: 'I ____ a movie with my family yesterday.',
    meaning: '我昨天和家人一起看了一部电影。',
    words: ['watch', 'watches', 'watching', 'watched'],
    blanks: [{ index: 3, answer: 'watched' }],
    explanation: 'yesterday 表示过去时，动词用过去式 watched',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s2',
    text: 'She ____ to the park last weekend.',
    meaning: '她上周末去了公园。',
    words: ['go', 'goes', 'going', 'went'],
    blanks: [{ index: 3, answer: 'went' }],
    explanation: 'last weekend 表示过去，go 的过去式是 went（不规则变化）',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s3',
    text: 'They ____ a delicious dinner last night.',
    meaning: '他们昨晚吃了一顿美味的晚餐。',
    words: ['have', 'has', 'having', 'had'],
    blanks: [{ index: 3, answer: 'had' }],
    explanation: 'last night 表示过去，have 的过去式是 had',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s4',
    text: 'He ____ his homework an hour ago.',
    meaning: '他一小时前完成了作业。',
    words: ['finish', 'finishes', 'finished', 'finishing'],
    blanks: [{ index: 2, answer: 'finished' }],
    explanation: 'an hour ago 表示过去，规则动词加 ed',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s5',
    text: 'I ____ up at 6 o\'clock this morning.',
    meaning: '我今天早上六点起床。',
    words: ['get', 'gets', 'got', 'getting'],
    blanks: [{ index: 2, answer: 'got' }],
    explanation: 'get up 起床；过去式 got up',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s6',
    text: 'Please ____ the lights before leaving.',
    meaning: '离开前请关灯。',
    words: ['turn on', 'turn off', 'turn up', 'turn down'],
    blanks: [{ index: 1, answer: 'turn off' }],
    explanation: 'turn off 关掉（电器）',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s7',
    text: 'My father ____ a new car last month.',
    meaning: '我爸爸上个月买了一辆新车。',
    words: ['buy', 'buys', 'bought', 'buying'],
    blanks: [{ index: 2, answer: 'bought' }],
    explanation: 'last month 表示过去，buy 的过去式是 bought',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s8',
    text: 'It is cold outside. Please ____ your coat.',
    meaning: '外面很冷。请穿上你的外套。',
    words: ['put on', 'put off', 'put up', 'put down'],
    blanks: [{ index: 0, answer: 'put on' }],
    explanation: 'put on 穿上',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s9',
    text: 'We ____ a great time at the party.',
    meaning: '我们在派对上玩得很开心。',
    words: ['have', 'has', 'had', 'having'],
    blanks: [{ index: 2, answer: 'had' }],
    explanation: 'have a great time 玩得开心；过去式 had',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s10',
    text: 'Tom ____ his English book at home.',
    meaning: '汤姆把英语书忘在家里了。',
    words: ['leave', 'leaves', 'left', 'leaving'],
    blanks: [{ index: 2, answer: 'left' }],
    explanation: 'leave 留下/落下，过去式 left',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s11',
    text: 'Can you help me ____ this word?',
    meaning: '你能帮我查找这个单词吗？',
    words: ['look for', 'look up', 'look after', 'look at'],
    blanks: [{ index: 1, answer: 'look up' }],
    explanation: 'look up 查找（单词、资料）',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s12',
    text: 'I ____ a letter to my friend last week.',
    meaning: '我上周给朋友写了一封信。',
    words: ['write', 'writes', 'wrote', 'writing'],
    blanks: [{ index: 2, answer: 'wrote' }],
    explanation: 'last week 表示过去，write 的过去式是 wrote',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s13',
    text: 'The bus ____ a few minutes ago.',
    meaning: '公交车几分钟前离开了。',
    words: ['leave', 'leaves', 'left', 'leaving'],
    blanks: [{ index: 2, answer: 'left' }],
    explanation: 'a few minutes ago 表示过去，用过去式 left',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s14',
    text: 'My grandma ____ when I was a child.',
    meaning: '我小时候奶奶照顾我。',
    words: ['looked for', 'looked after', 'looked up', 'looked at'],
    blanks: [{ index: 1, answer: 'looked after' }],
    explanation: 'look after 照顾；过去式 looked after',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s15',
    text: 'They ____ Beijing two years ago.',
    meaning: '他们两年前参观了北京。',
    words: ['visit', 'visits', 'visited', 'visiting'],
    blanks: [{ index: 2, answer: 'visited' }],
    explanation: 'two years ago 表示过去，visit 加 ed 变为 visited',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s16',
    text: 'Please ____ the music. The baby is sleeping.',
    meaning: '请把音乐调小。宝宝在睡觉。',
    words: ['turn on', 'turn off', 'turn up', 'turn down'],
    blanks: [{ index: 3, answer: 'turn down' }],
    explanation: 'turn down 调小（音量）',
    unit: '动词短语',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-s17',
    text: 'We ____ in a beautiful hotel during the trip.',
    meaning: '旅行期间我们住在一间漂亮的酒店里。',
    words: ['stay', 'stays', 'stayed', 'staying'],
    blanks: [{ index: 2, answer: 'stayed' }],
    explanation: 'stay 停留/住，过去式 stayed',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-s18',
    text: 'The teacher ____ our papers yesterday.',
    meaning: '老师昨天批改了我们的试卷。',
    words: ['check', 'checks', 'checked', 'checking'],
    blanks: [{ index: 2, answer: 'checked' }],
    explanation: 'yesterday 表示过去，check 的过去式是 checked',
    unit: '一般过去时',
    grade: Grade.FOUR,
    difficulty: 2
  }
]

export const grade4Dialogues: Dialogue[] = [
  {
    id: 'g4-d1',
    title: '周末趣事',
    meaning: '两个同学在谈论周末做了什么。',
    lines: [
      { speaker: 'A', text: 'What did you do last weekend?', meaning: '你上周末做了什么？' },
      { speaker: 'B', text: 'I went to the zoo with my parents.', meaning: '我和父母一起去了动物园。' },
      { speaker: 'A', text: 'Did you see any pandas?', meaning: '你看到熊猫了吗？' },
      { speaker: 'B', text: 'Yes! They were so cute!', meaning: '是的！它们太可爱了！' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 1, answer: 'went', options: ['go', 'goes', 'went', 'going'] }
    ],
    unit: '周末活动',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-d2',
    title: '昨天的生日派对',
    meaning: '小红参加了小明的生日派对，第二天在学校讨论。',
    lines: [
      { speaker: 'A', text: 'How was your birthday party?', meaning: '你的生日派对怎么样？' },
      { speaker: 'B', text: 'It was great! We had a lot of fun.', meaning: '太棒了！我们玩得很开心。' },
      { speaker: 'A', text: 'Did you get any gifts?', meaning: '你收到礼物了吗？' },
      { speaker: 'B', text: 'Yes! I got a new toy car.', meaning: '是的！我得到了一辆新玩具车。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 4, answer: 'had', options: ['have', 'has', 'had', 'having'] }
    ],
    unit: '生日',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-d3',
    title: '在学校失物招领处',
    meaning: '学生在失物招领处寻找丢失的物品。',
    lines: [
      { speaker: 'A', text: 'I left my backpack in the classroom yesterday.', meaning: '我昨天把书包落在教室里了。' },
      { speaker: 'B', text: 'Did you look for it?', meaning: '你找过了吗？' },
      { speaker: 'A', text: 'Yes, but I could not find it.', meaning: '是的，但我找不到。' },
      { speaker: 'B', text: 'Let me help you look for it.', meaning: '让我帮你找找。' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 1, answer: 'left', options: ['leave', 'leaves', 'left', 'leaving'] }
    ],
    unit: '失物招领',
    grade: Grade.FOUR,
    difficulty: 3
  },
  {
    id: 'g4-d4',
    title: '旅行经历',
    meaning: '两个朋友分享暑假的旅行经历。',
    lines: [
      { speaker: 'A', text: 'Where did you go during summer vacation?', meaning: '你暑假去了哪里？' },
      { speaker: 'B', text: 'I visited Shanghai with my family.', meaning: '我和家人一起去了上海。' },
      { speaker: 'A', text: 'What did you do there?', meaning: '你们在那里做了什么？' },
      { speaker: 'B', text: 'We visited the Oriental Pearl Tower.', meaning: '我们参观了东方明珠塔。' }
    ],
    blanks: [
      { lineIndex: 1, blankIndex: 1, answer: 'visited', options: ['visit', 'visits', 'visited', 'visiting'] }
    ],
    unit: '旅行',
    grade: Grade.FOUR,
    difficulty: 2
  },
  {
    id: 'g4-d5',
    title: '昨天的考试',
    meaning: '两个同学讨论昨天的考试。',
    lines: [
      { speaker: 'A', text: 'Did you finish the English test yesterday?', meaning: '你昨天完成英语考试了吗？' },
      { speaker: 'B', text: 'Yes, but I forgot to write my name.', meaning: '是的，但我忘了写名字。' },
      { speaker: 'A', text: 'Oh no! Did the teacher find out?', meaning: '哦不！老师发现了吗？' },
      { speaker: 'B', text: 'She found it and helped me.', meaning: '她发现了并帮了我。' }
    ],
    blanks: [
      { lineIndex: 0, blankIndex: 2, answer: 'finish', options: ['finish', 'finishes', 'finished', 'finishing'] }
    ],
    unit: '学校生活',
    grade: Grade.FOUR,
    difficulty: 3
  }
]

export function getGrade4Sentences(): Sentence[] {
  return grade4Sentences
}

export function getGrade4Dialogues(): Dialogue[] {
  return grade4Dialogues
}
