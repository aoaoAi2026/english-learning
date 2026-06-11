import { Question, QuestionType, Grade } from '@/types'

// 六年级题库
export const grade6Questions: Question[] = [
  {
    id: 'g6-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: '科学',
    options: ['science', 'math', 'history', 'geography'],
    answer: 'science',
    explanation: 'science是科学的意思。',
    knowledgePoints: ['学科', '学校']
  },
  {
    id: 'g6-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: 'computer',
    options: ['电脑', '电话', '电视', '收音机'],
    answer: '电脑',
    explanation: 'computer是电脑的意思。',
    knowledgePoints: ['科技', '设备']
  },
  {
    id: 'g6-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: '图书馆',
    options: ['library', 'hospital', 'museum', 'cinema'],
    answer: 'library',
    explanation: 'library是图书馆的意思。',
    knowledgePoints: ['场所', '公共设施']
  },
  {
    id: 'g6-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: 'travel',
    options: ['旅行', '工作', '学习', '休息'],
    answer: '旅行',
    explanation: 'travel是旅行的意思。',
    knowledgePoints: ['动词', '活动']
  },
  {
    id: 'g6-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: '生日',
    options: ['birthday', 'holiday', 'festival', 'vacation'],
    answer: 'birthday',
    explanation: 'birthday是生日的意思，birth(出生) + day(日子)。',
    knowledgePoints: ['节日', '时间']
  },
  {
    id: 'g6-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: 'country',
    options: ['国家', '城市', '村庄', '城镇'],
    answer: '国家',
    explanation: 'country是国家的意思。',
    knowledgePoints: ['地理', '地点']
  },
  {
    id: 'g6-q7',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: '海洋',
    options: ['river', 'lake', 'ocean', 'sea'],
    answer: 'ocean',
    explanation: 'ocean是海洋的意思。',
    knowledgePoints: ['地理', '自然']
  },
  {
    id: 'g6-q8',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: 'forest',
    options: ['森林', '沙漠', '草原', '山地'],
    answer: '森林',
    explanation: 'forest是森林的意思。',
    knowledgePoints: ['地理', '自然']
  },
  {
    id: 'g6-q9',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.SIX,
    difficulty: 2,
    content: '请听发音选择正确的单词',
    audioText: 'museum',
    options: ['museum', 'library', 'hospital', 'cinema'],
    answer: 'museum',
    explanation: '这是单词museum的发音，意思是博物馆。',
    knowledgePoints: ['场所', '听力']
  },
  {
    id: 'g6-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.SIX,
    difficulty: 3,
    content: '博物馆 (提示: m_____)',
    answer: 'museum',
    explanation: 'museum - 博物馆，可以参观学习的地方。',
    knowledgePoints: ['场所', '拼写']
  },
  {
    id: 'g6-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.SIX,
    difficulty: 2,
    content: 'Beijing is a big ____. (北京是一个大城市)',
    options: ['country', 'city', 'village', 'town'],
    answer: 'city',
    explanation: '根据中文"城市"，应该填入city。',
    knowledgePoints: ['地理', '句子']
  },
  {
    id: 'g6-q12',
    type: QuestionType.DIALOGUE,
    grade: Grade.SIX,
    difficulty: 3,
    content: 'A: Where did you go last summer? B: ____',
    options: ['I went to Beijing.', 'I go to Beijing.', 'I will go to Beijing.', 'I am going to Beijing.'],
    answer: 'I went to Beijing.',
    explanation: '"Where did you go"是过去时态的问句，回答也应该用过去时态。',
    knowledgePoints: ['对话', '时态']
  },
  {
    id: 'g6-q13',
    type: QuestionType.TRANSLATION,
    grade: Grade.SIX,
    difficulty: 3,
    content: 'The world is beautiful.',
    options: ['世界很美丽。', '世界很大。', '世界很小。', '世界很精彩。'],
    answer: '世界很美丽。',
    explanation: 'The world(世界) is(是) beautiful(美丽的)。',
    knowledgePoints: ['翻译', '句子']
  },
  {
    id: 'g6-q14',
    type: QuestionType.TRANSLATION,
    grade: Grade.SIX,
    difficulty: 3,
    content: '我喜欢旅行。',
    options: ['I like travel.', 'I like traveling.', 'I like to travel.', 'I like traveled.'],
    answer: 'I like traveling.',
    explanation: 'like后面可以接动名词形式traveling，表示喜欢做某事。',
    knowledgePoints: ['翻译', '语法']
  }
]
