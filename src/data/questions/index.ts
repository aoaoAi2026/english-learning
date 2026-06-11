import { Question, Grade } from '@/types'
import { grade1Questions } from './grade1'
import { grade2Questions } from './grade2'
import { grade3Questions } from './grade3'
import { grade4Questions } from './grade4'
import { grade5Questions } from './grade5'
import { grade6Questions } from './grade6'

// 获取指定年级的题目
export function getQuestionsByGrade(grade: Grade): Question[] {
  switch (grade) {
    case Grade.ONE:
      return grade1Questions
    case Grade.TWO:
      return grade2Questions
    case Grade.THREE:
      return grade3Questions
    case Grade.FOUR:
      return grade4Questions
    case Grade.FIVE:
      return grade5Questions
    case Grade.SIX:
      return grade6Questions
    default:
      return []
  }
}

// 获取所有题目
export function getAllQuestions(): Question[] {
  return [
    ...grade1Questions,
    ...grade2Questions,
    ...grade3Questions,
    ...grade4Questions,
    ...grade5Questions,
    ...grade6Questions
  ]
}

// 根据ID获取题目
export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id)
}

// 随机获取指定数量的题目
export function getRandomQuestions(grade: Grade, count: number): Question[] {
  const questions = getQuestionsByGrade(grade)
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// 导出所有年级题目
export {
  grade1Questions,
  grade2Questions,
  grade3Questions,
  grade4Questions,
  grade5Questions,
  grade6Questions
}
