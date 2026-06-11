import { Question, QuestionType, Grade } from '@/types'

// 三年级题库
export const grade3Questions: Question[] = [
  {
    id: 'g3-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: '早餐',
    options: ['breakfast', 'lunch', 'dinner', 'supper'],
    answer: 'breakfast',
    explanation: 'breakfast是早餐的意思，break(打破) + fast(禁食) = 打破禁食的第一餐。',
    knowledgePoints: ['饮食', '时间']
  },
  {
    id: 'g3-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: 'lunch',
    options: ['早餐', '午餐', '晚餐', '夜宵'],
    answer: '午餐',
    explanation: 'lunch是午餐的意思。',
    knowledgePoints: ['饮食', '时间']
  },
  {
    id: 'g3-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: '高兴的',
    options: ['happy', 'sad', 'angry', 'tired'],
    answer: 'happy',
    explanation: 'happy是高兴的意思。',
    knowledgePoints: ['形容词', '情感']
  },
  {
    id: 'g3-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: 'big',
    options: ['大的', '小的', '高的', '矮的'],
    answer: '大的',
    explanation: 'big是大的意思。',
    knowledgePoints: ['形容词', '大小']
  },
  {
    id: 'g3-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: '跑',
    options: ['run', 'jump', 'swim', 'walk'],
    answer: 'run',
    explanation: 'run是跑的意思。',
    knowledgePoints: ['动词', '动作']
  },
  {
    id: 'g3-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: 'swim',
    options: ['跑', '跳', '游泳', '走'],
    answer: '游泳',
    explanation: 'swim是游泳的意思。',
    knowledgePoints: ['动词', '动作']
  },
  {
    id: 'g3-q7',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: '唱歌',
    options: ['sing', 'dance', 'draw', 'write'],
    answer: 'sing',
    explanation: 'sing是唱歌的意思。',
    knowledgePoints: ['动词', '动作']
  },
  {
    id: 'g3-q8',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: 'cold',
    options: ['热的', '冷的', '温暖的', '凉爽的'],
    answer: '冷的',
    explanation: 'cold是冷的意思。',
    knowledgePoints: ['形容词', '温度']
  },
  {
    id: 'g3-q9',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.THREE,
    difficulty: 1,
    content: '请听发音选择正确的单词',
    audioText: 'happy',
    options: ['happy', 'sad', 'angry', 'tired'],
    answer: 'happy',
    explanation: '这是单词happy的发音，意思是高兴的。',
    knowledgePoints: ['形容词', '听力']
  },
  {
    id: 'g3-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.THREE,
    difficulty: 2,
    content: '蛋糕 (提示: c___)',
    answer: 'cake',
    explanation: 'cake - 蛋糕，甜甜的。',
    knowledgePoints: ['饮食', '拼写']
  },
  {
    id: 'g3-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.THREE,
    difficulty: 2,
    content: 'I can ____. (我会游泳)',
    options: ['run', 'jump', 'swim', 'walk'],
    answer: 'swim',
    explanation: '根据中文"游泳"，应该填入swim。',
    knowledgePoints: ['动词', '句子']
  },
  {
    id: 'g3-q12',
    type: QuestionType.DIALOGUE,
    grade: Grade.THREE,
    difficulty: 2,
    content: 'A: How are you? B: ____',
    options: ['I am fine.', 'I am a student.', 'I am 10.', 'I like apples.'],
    answer: 'I am fine.',
    explanation: '"How are you?"是问候语，回答"I am fine."表示"我很好"。',
    knowledgePoints: ['对话', '问候']
  }
]
