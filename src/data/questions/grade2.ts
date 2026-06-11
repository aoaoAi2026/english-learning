import { Question, QuestionType, Grade } from '@/types'

// 二年级题库
export const grade2Questions: Question[] = [
  {
    id: 'g2-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '兔子',
    options: ['rabbit', 'cat', 'dog', 'bird'],
    answer: 'rabbit',
    explanation: 'rabbit是兔子的意思，长耳朵的小动物。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g2-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: 'elephant',
    options: ['兔子', '大象', '狮子', '老虎'],
    answer: '大象',
    explanation: 'elephant是大象的意思，长鼻子的大动物。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g2-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '猴子',
    options: ['monkey', 'bear', 'pig', 'lion'],
    answer: 'monkey',
    explanation: 'monkey是猴子的意思，调皮的小动物。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g2-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: 'tiger',
    options: ['狮子', '老虎', '熊', '狼'],
    answer: '老虎',
    explanation: 'tiger是老虎的意思，有条纹的大猫。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g2-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '六',
    options: ['five', 'six', 'seven', 'eight'],
    answer: 'six',
    explanation: 'six是六的意思。',
    knowledgePoints: ['数字', '基础词汇']
  },
  {
    id: 'g2-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: 'ten',
    options: ['八', '九', '十', '七'],
    answer: '十',
    explanation: 'ten是十的意思。',
    knowledgePoints: ['数字', '基础词汇']
  },
  {
    id: 'g2-q7',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '兄弟',
    options: ['brother', 'sister', 'mother', 'father'],
    answer: 'brother',
    explanation: 'brother是兄弟的意思。',
    knowledgePoints: ['家庭', '基础词汇']
  },
  {
    id: 'g2-q8',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: 'chair',
    options: ['桌子', '椅子', '床', '沙发'],
    answer: '椅子',
    explanation: 'chair是椅子的意思。',
    knowledgePoints: ['家具', '基础词汇']
  },
  {
    id: 'g2-q9',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '请听发音选择正确的单词',
    audioText: 'rabbit',
    options: ['rabbit', 'cat', 'dog', 'bird'],
    answer: 'rabbit',
    explanation: '这是单词rabbit的发音，意思是兔子。',
    knowledgePoints: ['动物', '听力']
  },
  {
    id: 'g2-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.TWO,
    difficulty: 2,
    content: '鸟 (提示: b___)',
    answer: 'bird',
    explanation: 'bird - 鸟，四个字母。',
    knowledgePoints: ['动物', '拼写']
  },
  {
    id: 'g2-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.TWO,
    difficulty: 2,
    content: 'The ____ can fly. (鸟能飞)',
    options: ['bird', 'cat', 'dog', 'fish'],
    answer: 'bird',
    explanation: '根据中文"鸟"，应该填入bird。',
    knowledgePoints: ['动物', '句子']
  },
  {
    id: 'g2-q12',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.TWO,
    difficulty: 1,
    content: '房间',
    options: ['room', 'home', 'school', 'class'],
    answer: 'room',
    explanation: 'room是房间的意思。',
    knowledgePoints: ['场所', '基础词汇']
  }
]
