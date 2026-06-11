import { Word, Grade } from '@/types'
import { grade1Words } from './grade1'
import { grade2Words } from './grade2'
import { grade3Words } from './grade3'
import { grade4Words } from './grade4'
import { grade5Words } from './grade5'
import { grade6Words } from './grade6'

// 获取指定年级的单词
export function getWordsByGrade(grade: Grade): Word[] {
  switch (grade) {
    case Grade.ONE:
      return grade1Words
    case Grade.TWO:
      return grade2Words
    case Grade.THREE:
      return grade3Words
    case Grade.FOUR:
      return grade4Words
    case Grade.FIVE:
      return grade5Words
    case Grade.SIX:
      return grade6Words
    default:
      return []
  }
}

// 获取所有单词
export function getAllWords(): Word[] {
  return [
    ...grade1Words,
    ...grade2Words,
    ...grade3Words,
    ...grade4Words,
    ...grade5Words,
    ...grade6Words
  ]
}

// 根据ID获取单词
export function getWordById(id: string): Word | undefined {
  return getAllWords().find(word => word.id === id)
}

// 根据单元获取单词
export function getWordsByUnit(grade: Grade, unit: string): Word[] {
  return getWordsByGrade(grade).filter(word => word.unit === unit)
}

// 获取年级的所有单元
export function getUnitsByGrade(grade: Grade): string[] {
  const words = getWordsByGrade(grade)
  const units = new Set(words.map(word => word.unit).filter(Boolean))
  return Array.from(units) as string[]
}

// 导出所有年级单词
export {
  grade1Words,
  grade2Words,
  grade3Words,
  grade4Words,
  grade5Words,
  grade6Words
}
