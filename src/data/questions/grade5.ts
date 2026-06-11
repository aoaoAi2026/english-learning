import { Question, QuestionType, Grade } from '@/types'

// 五年级题库
export const grade5Questions: Question[] = [
  {
    id: 'g5-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: '美丽的',
    options: ['beautiful', 'ugly', 'pretty', 'handsome'],
    answer: 'beautiful',
    explanation: 'beautiful是美丽的意思，beauty(美) + ful。',
    knowledgePoints: ['形容词', '描述']
  },
  {
    id: 'g5-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'delicious',
    options: ['美味的', '难吃的', '健康的', '新鲜的'],
    answer: '美味的',
    explanation: 'delicious是美味的意思。',
    knowledgePoints: ['形容词', '食物']
  },
  {
    id: 'g5-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: '困难的',
    options: ['easy', 'difficult', 'simple', 'hard'],
    answer: 'difficult',
    explanation: 'difficult是困难的意思。',
    knowledgePoints: ['形容词', '难度']
  },
  {
    id: 'g5-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'always',
    options: ['总是', '通常', '有时', '从不'],
    answer: '总是',
    explanation: 'always是总是的意思，频率副词。',
    knowledgePoints: ['副词', '频率']
  },
  {
    id: 'g5-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: '学习',
    options: ['study', 'work', 'play', 'rest'],
    answer: 'study',
    explanation: 'study是学习的意思。',
    knowledgePoints: ['动词', '学习']
  },
  {
    id: 'g5-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'understand',
    options: ['理解', '知道', '记住', '忘记'],
    answer: '理解',
    explanation: 'understand是理解的意思，under(在下面) + stand(站)。',
    knowledgePoints: ['动词', '认知']
  },
  {
    id: 'g5-q7',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: '需要',
    options: ['want', 'need', 'like', 'love'],
    answer: 'need',
    explanation: 'need是需要的意思。',
    knowledgePoints: ['动词', '需求']
  },
  {
    id: 'g5-q8',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'expensive',
    options: ['便宜的', '昂贵的', '新的', '旧的'],
    answer: '昂贵的',
    explanation: 'expensive是昂贵的意思。',
    knowledgePoints: ['形容词', '价格']
  },
  {
    id: 'g5-q9',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: '请听发音选择正确的单词',
    audioText: 'interesting',
    options: ['interesting', 'boring', 'exciting', 'tiring'],
    answer: 'interesting',
    explanation: '这是单词interesting的发音，意思是有趣的。',
    knowledgePoints: ['形容词', '听力']
  },
  {
    id: 'g5-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.FIVE,
    difficulty: 3,
    content: '健康的 (提示: h______)',
    answer: 'healthy',
    explanation: 'healthy - 健康的，health(健康) + y。',
    knowledgePoints: ['形容词', '拼写']
  },
  {
    id: 'g5-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'I ____ go to school by bus. (我通常坐公交车去学校)',
    options: ['always', 'usually', 'sometimes', 'never'],
    answer: 'usually',
    explanation: '根据中文"通常"，应该填入usually。',
    knowledgePoints: ['副词', '句子']
  },
  {
    id: 'g5-q12',
    type: QuestionType.DIALOGUE,
    grade: Grade.FIVE,
    difficulty: 2,
    content: 'A: What do you think of the movie? B: ____',
    options: ['It is interesting.', 'It is 2 hours.', 'It is expensive.', 'It is Monday.'],
    answer: 'It is interesting.',
    explanation: '"What do you think of..."问的是看法，应该回答对事物的评价。',
    knowledgePoints: ['对话', '评价']
  }
]
