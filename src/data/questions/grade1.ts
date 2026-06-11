import { Question, QuestionType, Grade } from '@/types'

// 一年级题库
export const grade1Questions: Question[] = [
  // 单词选择题
  {
    id: 'g1-q1',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '苹果',
    options: ['apple', 'banana', 'orange', 'grape'],
    answer: 'apple',
    explanation: 'apple是苹果的意思，是红色的水果。记忆：a(一个) + pple(泡泡) → 一个红红的泡泡苹果',
    knowledgePoints: ['水果', '基础词汇']
  },
  {
    id: 'g1-q2',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '香蕉',
    options: ['apple', 'banana', 'orange', 'pear'],
    answer: 'banana',
    explanation: 'banana是香蕉的意思，是黄色的弯弯的水果。',
    knowledgePoints: ['水果', '基础词汇']
  },
  {
    id: 'g1-q3',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'cat',
    options: ['狗', '猫', '鸟', '鱼'],
    answer: '猫',
    explanation: 'cat是猫的意思，喵喵叫的小动物。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g1-q4',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'dog',
    options: ['猫', '狗', '兔子', '鸟'],
    answer: '狗',
    explanation: 'dog是狗的意思，汪汪叫的小动物。',
    knowledgePoints: ['动物', '基础词汇']
  },
  {
    id: 'g1-q5',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '红色',
    options: ['red', 'blue', 'green', 'yellow'],
    answer: 'red',
    explanation: 'red是红色的意思，像苹果一样的颜色。',
    knowledgePoints: ['颜色', '基础词汇']
  },
  {
    id: 'g1-q6',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'blue',
    options: ['红色', '蓝色', '绿色', '黄色'],
    answer: '蓝色',
    explanation: 'blue是蓝色的意思，像天空一样的颜色。',
    knowledgePoints: ['颜色', '基础词汇']
  },
  // 听音选词
  {
    id: 'g1-q7',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '请听发音选择正确的单词',
    audioText: 'apple',
    options: ['apple', 'banana', 'orange', 'pear'],
    answer: 'apple',
    explanation: '这是单词apple的发音，意思是苹果。',
    knowledgePoints: ['水果', '听力']
  },
  {
    id: 'g1-q8',
    type: QuestionType.LISTEN_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '请听发音选择正确的单词',
    audioText: 'cat',
    options: ['cat', 'dog', 'bird', 'fish'],
    answer: 'cat',
    explanation: '这是单词cat的发音，意思是猫。',
    knowledgePoints: ['动物', '听力']
  },
  // 单词拼写
  {
    id: 'g1-q9',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.ONE,
    difficulty: 2,
    content: '苹果 (提示: a____)',
    answer: 'apple',
    explanation: 'apple - 苹果，记住：a + pple',
    knowledgePoints: ['水果', '拼写']
  },
  {
    id: 'g1-q10',
    type: QuestionType.WORD_SPELLING,
    grade: Grade.ONE,
    difficulty: 2,
    content: '猫 (提示: c__)',
    answer: 'cat',
    explanation: 'cat - 猫，三个字母很简单',
    knowledgePoints: ['动物', '拼写']
  },
  // 填空题
  {
    id: 'g1-q11',
    type: QuestionType.FILL_BLANK,
    grade: Grade.ONE,
    difficulty: 2,
    content: 'I have a ____. (我有一只猫)',
    options: ['cat', 'dog', 'bird', 'fish'],
    answer: 'cat',
    explanation: '根据中文"猫"，应该填入cat。',
    knowledgePoints: ['动物', '句子']
  },
  {
    id: 'g1-q12',
    type: QuestionType.FILL_BLANK,
    grade: Grade.ONE,
    difficulty: 2,
    content: 'The ____ is red. (苹果是红色的)',
    options: ['apple', 'banana', 'orange', 'pear'],
    answer: 'apple',
    explanation: '根据中文"苹果"，应该填入apple。',
    knowledgePoints: ['水果', '句子']
  },
  // 数字题
  {
    id: 'g1-q13',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'one',
    options: ['一', '二', '三', '四'],
    answer: '一',
    explanation: 'one是一的意思，数字1。',
    knowledgePoints: ['数字', '基础词汇']
  },
  {
    id: 'g1-q14',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '三',
    options: ['one', 'two', 'three', 'four'],
    answer: 'three',
    explanation: 'three是三的意思，数字3。',
    knowledgePoints: ['数字', '基础词汇']
  },
  // 身体部位
  {
    id: 'g1-q15',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'eye',
    options: ['眼睛', '鼻子', '嘴巴', '耳朵'],
    answer: '眼睛',
    explanation: 'eye是眼睛的意思，我们用眼睛看世界。',
    knowledgePoints: ['身体', '基础词汇']
  },
  {
    id: 'g1-q16',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '手',
    options: ['hand', 'foot', 'arm', 'leg'],
    answer: 'hand',
    explanation: 'hand是手的意思，我们用手写字。',
    knowledgePoints: ['身体', '基础词汇']
  },
  // 家庭成员
  {
    id: 'g1-q17',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'mother',
    options: ['妈妈', '爸爸', '兄弟', '姐妹'],
    answer: '妈妈',
    explanation: 'mother是妈妈的意思。',
    knowledgePoints: ['家庭', '基础词汇']
  },
  {
    id: 'g1-q18',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '爸爸',
    options: ['mother', 'father', 'brother', 'sister'],
    answer: 'father',
    explanation: 'father是爸爸的意思。',
    knowledgePoints: ['家庭', '基础词汇']
  },
  // 学习用品
  {
    id: 'g1-q19',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: 'book',
    options: ['书', '笔', '尺子', '书包'],
    answer: '书',
    explanation: 'book是书的意思。',
    knowledgePoints: ['学习用品', '基础词汇']
  },
  {
    id: 'g1-q20',
    type: QuestionType.WORD_CHOICE,
    grade: Grade.ONE,
    difficulty: 1,
    content: '铅笔',
    options: ['pen', 'pencil', 'ruler', 'book'],
    answer: 'pencil',
    explanation: 'pencil是铅笔的意思。',
    knowledgePoints: ['学习用品', '基础词汇']
  }
]
