import { Question, QuestionType, Grade } from '@/types'

// 四年级题库
export const grade4Questions: Question[] = [
  {
    id: 'g4-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: '天气',
    options: ['weather', 'water', 'window', 'winter'],
    answer: 'weather',
    explanation: 'weather是天气的意思。',
    knowledgePoints: ['自然', '天气']
  },
  {
    id: 'g4-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: 'sunny',
    options: ['晴朗的', '下雨的', '多云的', '下雪的'],
    answer: '晴朗的',
    explanation: 'sunny是晴朗的意思，sun(太阳) + ny。',
    knowledgePoints: ['天气', '形容词']
  },
  {
    id: 'g4-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: '春天',
    options: ['spring', 'summer', 'autumn', 'winter'],
    answer: 'spring',
    explanation: 'spring是春天的意思。',
    knowledgePoints: ['季节', '时间']
  },
  {
    id: 'g4-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: 'Monday',
    options: ['星期一', '星期二', '星期三', '星期四'],
    answer: '星期一',
    explanation: 'Monday是星期一的意思。',
    knowledgePoints: ['星期', '时间']
  },
  {
    id: 'g4-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: '明天',
    options: ['today', 'tomorrow', 'yesterday', 'tonight'],
    answer: 'tomorrow',
    explanation: 'tomorrow是明天的意思。',
    knowledgePoints: ['时间', '基础词汇']
  },
  {
    id: 'g4-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: 'hour',
    options: ['小时', '分钟', '秒', '天'],
    answer: '小时',
    explanation: 'hour是小时的意思。',
    knowledgePoints: ['时间', '单位']
  },
  {
    id: 'g4-q7',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: '开始',
    options: ['start', 'finish', 'stop', 'end'],
    answer: 'start',
    explanation: 'start是开始的意思。',
    knowledgePoints: ['动词', '动作']
  },
  {
    id: 'g4-q8',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: 'help',
    options: ['帮助', '工作', '学习', '玩耍'],
    answer: '帮助',
    explanation: 'help是帮助的意思。',
    knowledgePoints: ['动词', '动作']
  },
  {
    id: 'g4-q9',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.FOUR,
    difficulty: 1,
    content: '请听发音选择正确的单词',
    audioText: 'spring',
    options: ['spring', 'summer', 'autumn', 'winter'],
    answer: 'spring',
    explanation: '这是单词spring的发音，意思是春天。',
    knowledgePoints: ['季节', '听力']
  },
  {
    id: 'g4-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.FOUR,
    difficulty: 2,
    content: '夏天 (提示: s_____)',
    answer: 'summer',
    explanation: 'summer - 夏天，可以游泳的季节。',
    knowledgePoints: ['季节', '拼写']
  },
  {
    id: 'g4-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.FOUR,
    difficulty: 2,
    content: 'It is ____ today. (今天天气晴朗)',
    options: ['sunny', 'rainy', 'cloudy', 'windy'],
    answer: 'sunny',
    explanation: '根据中文"晴朗"，应该填入sunny。',
    knowledgePoints: ['天气', '句子']
  },
  {
    id: 'g4-q12',
    type: QuestionType.DIALOGUE,
    grade: Grade.FOUR,
    difficulty: 2,
    content: 'A: What day is today? B: ____',
    options: ['It is Monday.', 'It is sunny.', 'It is 8 o\'clock.', 'It is spring.'],
    answer: 'It is Monday.',
    explanation: '"What day is today?"问的是星期几，回答应该是星期。',
    knowledgePoints: ['对话', '时间']
  }
]
