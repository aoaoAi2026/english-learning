// 年级枚举
export enum Grade {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

// 年级名称映射
export const GradeNames: Record<Grade, string> = {
  [Grade.ONE]: '一年级',
  [Grade.TWO]: '二年级',
  [Grade.THREE]: '三年级',
  [Grade.FOUR]: '四年级',
  [Grade.FIVE]: '五年级',
  [Grade.SIX]: '六年级'
}

// 年级颜色映射
export const GradeColors: Record<Grade, { primary: string; secondary: string }> = {
  [Grade.ONE]: { primary: '#FF6B6B', secondary: '#FFE5E5' },
  [Grade.TWO]: { primary: '#4ECDC4', secondary: '#E5F9F7' },
  [Grade.THREE]: { primary: '#FFE66D', secondary: '#FFF9E5' },
  [Grade.FOUR]: { primary: '#A78BFA', secondary: '#F3E8FF' },
  [Grade.FIVE]: { primary: '#F97316', secondary: '#FFEDD5' },
  [Grade.SIX]: { primary: '#10B981', secondary: '#D1FAE5' }
}

// 记忆技巧类型
export interface MemoryTip {
  type: 'association' | 'root' | 'story' | 'image'
  content: string
  illustration?: string
}

// 单词类型
export interface Word {
  id: string
  text: string
  phonetic: string
  meaning: string
  example: string
  exampleMeaning: string
  image?: string
  memoryTips: MemoryTip[]
  audioUrl?: string
  unit?: string
  category?: string
}

// 句子类型
export interface Sentence {
  id: string
  text: string
  meaning: string
  words: string[]
  blanks?: { index: number; answer: string }[]
  phonetic?: string
  explanation?: string
  unit: string
  grade: Grade
  difficulty: 1 | 2 | 3
  relatedWords?: string[]
}

// 情景对话类型
export interface Dialogue {
  id: string
  title: string
  meaning: string
  lines: {
    speaker: 'A' | 'B'
    text: string
    meaning: string
  }[]
  blanks: {
    lineIndex: number
    blankIndex: number
    answer: string
    options: string[]
  }[]
  unit: string
  grade: Grade
  difficulty: 1 | 2 | 3
}

// 音标类型
export interface Phonics {
  symbol: string
  type: 'vowel' | 'consonant'
  exampleWords: string[]
  description: string
  mouthShape?: string
}

// 题目类型枚举
export enum QuestionType {
  WORD_CHOICE = 'word_choice',        // 看图选词/看词选义
  WORD_SPELLING = 'word_spelling',    // 单词拼写
  LISTEN_CHOICE = 'listen_choice',    // 听音选词
  PHONICS_CHOICE = 'phonics_choice',  // 音标辨析
  FILL_BLANK = 'fill_blank',          // 填空
  DIALOGUE = 'dialogue',              // 情景对话
  TRANSLATION = 'translation',        // 翻译题
  MATCHING = 'matching'               // 连线题
}

// 题目类型名称映射
export const QuestionTypeNames: Record<QuestionType, string> = {
  [QuestionType.WORD_CHOICE]: '单词选择',
  [QuestionType.WORD_SPELLING]: '单词拼写',
  [QuestionType.LISTEN_CHOICE]: '听音选词',
  [QuestionType.PHONICS_CHOICE]: '音标辨析',
  [QuestionType.FILL_BLANK]: '填空题',
  [QuestionType.DIALOGUE]: '情景对话',
  [QuestionType.TRANSLATION]: '翻译题',
  [QuestionType.MATCHING]: '连线题'
}

// 题目类型
export interface Question {
  id: string
  type: QuestionType
  grade: Grade
  difficulty: 1 | 2 | 3
  content: string
  options?: string[]
  answer: string | string[]
  explanation: string
  knowledgePoints: string[]
  relatedWords?: string[]
  image?: string
  audioText?: string  // 用于听音题的播放文本
}

// 关卡奖励
export interface Reward {
  stars: number
  exp: number
  badge?: string
}

// 关卡类型
export interface Level {
  id: string
  grade: Grade
  name: string
  description: string
  order: number
  questionCount: number
  timeLimit: number  // 秒
  rewards: Reward
  prerequisite?: string
  theme: string
  icon: string
}

// 错题记录
export interface WrongQuestion {
  questionId: string
  wrongCount: number
  lastWrongDate: string
  mastered: boolean
  consecutiveCorrect: number
  questionType: 'word' | 'sentence' | 'dialogue' | 'general'
}

// 用户进度
export interface UserProgress {
  currentGrade: Grade
  completedLevels: string[]
  stars: Record<string, number>
  wordsLearned: string[]
  wrongQuestions: WrongQuestion[]
  achievements: string[]
  studyStreak: number
  lastStudyDate: string
  totalStudyTime: number
  totalStars: number
}

// 考试结果
export interface ExamResult {
  id: string
  date: string
  grade: Grade
  totalQuestions: number
  correctCount: number
  timeUsed: number
  questions: {
    questionId: string
    userAnswer: string
    isCorrect: boolean
  }[]
}

// 用户设置
export interface UserSettings {
  voiceType: 'US' | 'UK'
  speechRate: number
  soundEnabled: boolean
  theme: 'light' | 'dark'
}

// 外部资源
export interface ExternalResource {
  id: string
  name: string
  description: string
  url: string
  category: string
  icon?: string
}

// 资源分类
export interface ResourceCategory {
  id: string
  name: string
  icon: string
  resources: ExternalResource[]
}
