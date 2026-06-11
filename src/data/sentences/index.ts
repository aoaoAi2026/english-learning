import { Sentence, Dialogue, Grade } from '@/types'
import { grade1Sentences, grade1Dialogues } from './grade1'
import { grade2Sentences, grade2Dialogues } from './grade2'
import { grade3Sentences, grade3Dialogues } from './grade3'
import { grade4Sentences, grade4Dialogues } from './grade4'
import { grade5Sentences, grade5Dialogues } from './grade5'
import { grade6Sentences, grade6Dialogues } from './grade6'

// 创建年级数据映射
const sentenceMap: Record<Grade, Sentence[]> = {
  [Grade.ONE]: grade1Sentences,
  [Grade.TWO]: grade2Sentences,
  [Grade.THREE]: grade3Sentences,
  [Grade.FOUR]: grade4Sentences,
  [Grade.FIVE]: grade5Sentences,
  [Grade.SIX]: grade6Sentences
}

const dialogueMap: Record<Grade, Dialogue[]> = {
  [Grade.ONE]: grade1Dialogues,
  [Grade.TWO]: grade2Dialogues,
  [Grade.THREE]: grade3Dialogues,
  [Grade.FOUR]: grade4Dialogues,
  [Grade.FIVE]: grade5Dialogues,
  [Grade.SIX]: grade6Dialogues
}

// 获取指定年级的句子
export function getSentencesByGrade(grade: Grade): Sentence[] {
  return sentenceMap[grade] || []
}

// 获取指定年级的对话
export function getDialoguesByGrade(grade: Grade): Dialogue[] {
  return dialogueMap[grade] || []
}

// 获取所有句子
export function getAllSentences(): Sentence[] {
  return Object.values(sentenceMap).flat()
}

// 获取所有对话
export function getAllDialogues(): Dialogue[] {
  return Object.values(dialogueMap).flat()
}

// 根据 ID 获取句子
export function getSentenceById(id: string): Sentence | undefined {
  return getAllSentences().find(s => s.id === id)
}

// 根据 ID 获取对话
export function getDialogueById(id: string): Dialogue | undefined {
  return getAllDialogues().find(d => d.id === id)
}

// 导出所有年级数据
export {
  grade1Sentences,
  grade1Dialogues,
  grade2Sentences,
  grade2Dialogues,
  grade3Sentences,
  grade3Dialogues,
  grade4Sentences,
  grade4Dialogues,
  grade5Sentences,
  grade5Dialogues,
  grade6Sentences,
  grade6Dialogues
}
