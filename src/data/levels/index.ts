import { Level, Grade } from '@/types'

// 一年级关卡
export const grade1Levels: Level[] = [
  {
    id: 'g1-l1',
    grade: Grade.ONE,
    name: '水果王国',
    description: '学习常见水果单词',
    order: 1,
    questionCount: 5,
    timeLimit: 120,
    rewards: { stars: 3, exp: 10 },
    theme: 'fruit',
    icon: '🍎'
  },
  {
    id: 'g1-l2',
    grade: Grade.ONE,
    name: '动物乐园',
    description: '认识可爱的小动物',
    order: 2,
    questionCount: 5,
    timeLimit: 120,
    rewards: { stars: 3, exp: 15 },
    prerequisite: 'g1-l1',
    theme: 'animal',
    icon: '🐱'
  },
  {
    id: 'g1-l3',
    grade: Grade.ONE,
    name: '色彩世界',
    description: '学习各种颜色',
    order: 3,
    questionCount: 5,
    timeLimit: 120,
    rewards: { stars: 3, exp: 15 },
    prerequisite: 'g1-l2',
    theme: 'color',
    icon: '🌈'
  },
  {
    id: 'g1-l4',
    grade: Grade.ONE,
    name: '数字城堡',
    description: '学习1-10的数字',
    order: 4,
    questionCount: 5,
    timeLimit: 120,
    rewards: { stars: 3, exp: 20 },
    prerequisite: 'g1-l3',
    theme: 'number',
    icon: '🔢'
  },
  {
    id: 'g1-l5',
    grade: Grade.ONE,
    name: '我的身体',
    description: '学习身体部位',
    order: 5,
    questionCount: 5,
    timeLimit: 120,
    rewards: { stars: 3, exp: 20 },
    prerequisite: 'g1-l4',
    theme: 'body',
    icon: '🖐️'
  }
]

// 二年级关卡
export const grade2Levels: Level[] = [
  {
    id: 'g2-l1',
    grade: Grade.TWO,
    name: '动物园大冒险',
    description: '认识更多动物朋友',
    order: 1,
    questionCount: 6,
    timeLimit: 150,
    rewards: { stars: 3, exp: 15 },
    theme: 'animal',
    icon: '🦁'
  },
  {
    id: 'g2-l2',
    grade: Grade.TWO,
    name: '数字挑战',
    description: '学习更大的数字',
    order: 2,
    questionCount: 6,
    timeLimit: 150,
    rewards: { stars: 3, exp: 20 },
    prerequisite: 'g2-l1',
    theme: 'number',
    icon: '7️⃣'
  },
  {
    id: 'g2-l3',
    grade: Grade.TWO,
    name: '我的家',
    description: '学习家庭成员和家具',
    order: 3,
    questionCount: 6,
    timeLimit: 150,
    rewards: { stars: 3, exp: 20 },
    prerequisite: 'g2-l2',
    theme: 'home',
    icon: '🏠'
  },
  {
    id: 'g2-l4',
    grade: Grade.TWO,
    name: '身体探险',
    description: '认识更多身体部位',
    order: 4,
    questionCount: 6,
    timeLimit: 150,
    rewards: { stars: 3, exp: 25 },
    prerequisite: 'g2-l3',
    theme: 'body',
    icon: '👀'
  }
]

// 三年级关卡
export const grade3Levels: Level[] = [
  {
    id: 'g3-l1',
    grade: Grade.THREE,
    name: '美食天地',
    description: '学习各种食物',
    order: 1,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 20 },
    theme: 'food',
    icon: '🍔'
  },
  {
    id: 'g3-l2',
    grade: Grade.THREE,
    name: '形容词王国',
    description: '学习描述性词语',
    order: 2,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 25 },
    prerequisite: 'g3-l1',
    theme: 'adjective',
    icon: '📝'
  },
  {
    id: 'g3-l3',
    grade: Grade.THREE,
    name: '动作世界',
    description: '学习各种动作动词',
    order: 3,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 25 },
    prerequisite: 'g3-l2',
    theme: 'verb',
    icon: '🏃'
  },
  {
    id: 'g3-l4',
    grade: Grade.THREE,
    name: '综合挑战',
    description: '综合练习',
    order: 4,
    questionCount: 8,
    timeLimit: 240,
    rewards: { stars: 3, exp: 30 },
    prerequisite: 'g3-l3',
    theme: 'mixed',
    icon: '⭐'
  }
]

// 四年级关卡
export const grade4Levels: Level[] = [
  {
    id: 'g4-l1',
    grade: Grade.FOUR,
    name: '天气观察站',
    description: '学习天气和季节',
    order: 1,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 25 },
    theme: 'weather',
    icon: '🌤️'
  },
  {
    id: 'g4-l2',
    grade: Grade.FOUR,
    name: '时间管理',
    description: '学习星期和时间',
    order: 2,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 25 },
    prerequisite: 'g4-l1',
    theme: 'time',
    icon: '⏰'
  },
  {
    id: 'g4-l3',
    grade: Grade.FOUR,
    name: '日常活动',
    description: '学习日常动词',
    order: 3,
    questionCount: 6,
    timeLimit: 180,
    rewards: { stars: 3, exp: 30 },
    prerequisite: 'g4-l2',
    theme: 'activity',
    icon: '📚'
  },
  {
    id: 'g4-l4',
    grade: Grade.FOUR,
    name: '时间大师',
    description: '时间表达综合练习',
    order: 4,
    questionCount: 8,
    timeLimit: 240,
    rewards: { stars: 3, exp: 35 },
    prerequisite: 'g4-l3',
    theme: 'time',
    icon: '🏆'
  }
]

// 五年级关卡
export const grade5Levels: Level[] = [
  {
    id: 'g5-l1',
    grade: Grade.FIVE,
    name: '形容词大师',
    description: '学习更多形容词',
    order: 1,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 30 },
    theme: 'adjective',
    icon: '✨'
  },
  {
    id: 'g5-l2',
    grade: Grade.FIVE,
    name: '频率副词',
    description: '学习频率表达',
    order: 2,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 30 },
    prerequisite: 'g5-l1',
    theme: 'adverb',
    icon: '📊'
  },
  {
    id: 'g5-l3',
    grade: Grade.FIVE,
    name: '生活动词',
    description: '学习生活常用动词',
    order: 3,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 35 },
    prerequisite: 'g5-l2',
    theme: 'verb',
    icon: '🎯'
  },
  {
    id: 'g5-l4',
    grade: Grade.FIVE,
    name: '表达专家',
    description: '综合表达能力',
    order: 4,
    questionCount: 8,
    timeLimit: 240,
    rewards: { stars: 3, exp: 40 },
    prerequisite: 'g5-l3',
    theme: 'mixed',
    icon: '🎓'
  }
]

// 六年级关卡
export const grade6Levels: Level[] = [
  {
    id: 'g6-l1',
    grade: Grade.SIX,
    name: '学科探索',
    description: '学习各学科名称',
    order: 1,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 35 },
    theme: 'subject',
    icon: '📖'
  },
  {
    id: 'g6-l2',
    grade: Grade.SIX,
    name: '城市探险',
    description: '学习场所和地点',
    order: 2,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 35 },
    prerequisite: 'g6-l1',
    theme: 'place',
    icon: '🏙️'
  },
  {
    id: 'g6-l3',
    grade: Grade.SIX,
    name: '地理达人',
    description: '学习地理知识',
    order: 3,
    questionCount: 6,
    timeLimit: 200,
    rewards: { stars: 3, exp: 40 },
    prerequisite: 'g6-l2',
    theme: 'geography',
    icon: '🌍'
  },
  {
    id: 'g6-l4',
    grade: Grade.SIX,
    name: '毕业挑战',
    description: '综合能力测试',
    order: 4,
    questionCount: 10,
    timeLimit: 300,
    rewards: { stars: 3, exp: 50 },
    prerequisite: 'g6-l3',
    theme: 'mixed',
    icon: '🏅'
  }
]

// 获取指定年级的关卡
export function getLevelsByGrade(grade: Grade): Level[] {
  switch (grade) {
    case Grade.ONE:
      return grade1Levels
    case Grade.TWO:
      return grade2Levels
    case Grade.THREE:
      return grade3Levels
    case Grade.FOUR:
      return grade4Levels
    case Grade.FIVE:
      return grade5Levels
    case Grade.SIX:
      return grade6Levels
    default:
      return []
  }
}

// 获取所有关卡
export function getAllLevels(): Level[] {
  return [
    ...grade1Levels,
    ...grade2Levels,
    ...grade3Levels,
    ...grade4Levels,
    ...grade5Levels,
    ...grade6Levels
  ]
}

// 根据ID获取关卡
export function getLevelById(id: string): Level | undefined {
  return getAllLevels().find(l => l.id === id)
}
