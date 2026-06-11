import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProgress, UserSettings, WrongQuestion, Grade, ExamResult } from '@/types'

interface UserState {
  // 用户进度
  progress: UserProgress
  // 用户设置
  settings: UserSettings
  // 考试历史
  examHistory: ExamResult[]
  
  // 进度相关方法
  setCurrentGrade: (grade: Grade) => void
  completeLevel: (levelId: string, stars: number) => void
  learnWord: (wordId: string) => void
  addWrongQuestion: (questionId: string, questionType?: 'word' | 'sentence' | 'dialogue' | 'general') => void
  markWrongQuestionMastered: (questionId: string) => void
  incrementConsecutiveCorrect: (questionId: string) => boolean
  resetConsecutiveCorrect: (questionId: string) => void
  addAchievement: (achievementId: string) => void
  updateStudyStreak: () => void
  addStudyTime: (minutes: number) => void
  
  // 设置相关方法
  setVoiceType: (type: 'US' | 'UK') => void
  setSpeechRate: (rate: number) => void
  toggleSound: () => void
  setTheme: (theme: 'light' | 'dark') => void
  
  // 考试历史相关方法
  addExamResult: (result: ExamResult) => void
  
  // 重置方法
  resetProgress: () => void
}

// 默认用户进度
const defaultProgress: UserProgress = {
  currentGrade: Grade.ONE,
  completedLevels: [],
  stars: {},
  wordsLearned: [],
  wrongQuestions: [],
  achievements: [],
  studyStreak: 0,
  lastStudyDate: '',
  totalStudyTime: 0,
  totalStars: 0
}

// 默认用户设置
const defaultSettings: UserSettings = {
  voiceType: 'US',
  speechRate: 0.8,
  soundEnabled: true,
  theme: 'light'
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,
      settings: defaultSettings,
      examHistory: [],

      // 进度相关方法
      setCurrentGrade: (grade) => {
        set((state) => ({
          progress: { ...state.progress, currentGrade: grade }
        }))
      },

      completeLevel: (levelId, stars) => {
        set((state) => {
          const newStars = { ...state.progress.stars, [levelId]: stars }
          const completedLevels = state.progress.completedLevels.includes(levelId)
            ? state.progress.completedLevels
            : [...state.progress.completedLevels, levelId]
          const totalStars = Object.values(newStars).reduce((sum, s) => sum + s, 0)
          
          return {
            progress: {
              ...state.progress,
              completedLevels,
              stars: newStars,
              totalStars
            }
          }
        })
      },

      learnWord: (wordId) => {
        set((state) => {
          if (state.progress.wordsLearned.includes(wordId)) {
            return state
          }
          return {
            progress: {
              ...state.progress,
              wordsLearned: [...state.progress.wordsLearned, wordId]
            }
          }
        })
      },

      addWrongQuestion: (questionId, questionType = 'general') => {
        set((state) => {
          const existing = state.progress.wrongQuestions.find(w => w.questionId === questionId)
          if (existing) {
            return {
              progress: {
                ...state.progress,
                wrongQuestions: state.progress.wrongQuestions.map(w =>
                  w.questionId === questionId
                    ? { ...w, wrongCount: w.wrongCount + 1, lastWrongDate: new Date().toISOString(), consecutiveCorrect: 0 }
                    : w
                )
              }
            }
          }
          const newWrong: WrongQuestion = {
            questionId,
            wrongCount: 1,
            lastWrongDate: new Date().toISOString(),
            mastered: false,
            consecutiveCorrect: 0,
            questionType
          }
          return {
            progress: {
              ...state.progress,
              wrongQuestions: [...state.progress.wrongQuestions, newWrong]
            }
          }
        })
      },

      markWrongQuestionMastered: (questionId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            wrongQuestions: state.progress.wrongQuestions.map(w =>
              w.questionId === questionId ? { ...w, mastered: true } : w
            )
          }
        }))
      },

      incrementConsecutiveCorrect: (questionId) => {
        let reachedMastery = false
        set((state) => {
          const updated = state.progress.wrongQuestions.map(w => {
            if (w.questionId !== questionId) return w
            const newCount = w.consecutiveCorrect + 1
            if (newCount >= 3) {
              reachedMastery = true
              return { ...w, consecutiveCorrect: newCount, mastered: true }
            }
            return { ...w, consecutiveCorrect: newCount }
          })
          return {
            progress: {
              ...state.progress,
              wrongQuestions: updated
            }
          }
        })
        return reachedMastery
      },

      resetConsecutiveCorrect: (questionId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            wrongQuestions: state.progress.wrongQuestions.map(w =>
              w.questionId === questionId ? { ...w, consecutiveCorrect: 0 } : w
            )
          }
        }))
      },

      addAchievement: (achievementId) => {
        set((state) => {
          if (state.progress.achievements.includes(achievementId)) {
            return state
          }
          return {
            progress: {
              ...state.progress,
              achievements: [...state.progress.achievements, achievementId]
            }
          }
        })
      },

      updateStudyStreak: () => {
        set((state) => {
          const today = new Date().toDateString()
          const lastDate = state.progress.lastStudyDate ? new Date(state.progress.lastStudyDate).toDateString() : ''
          
          if (lastDate === today) {
            return state
          }
          
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          
          let newStreak = state.progress.studyStreak
          if (lastDate === yesterday.toDateString()) {
            newStreak += 1
          } else if (lastDate !== today) {
            newStreak = 1
          }
          
          return {
            progress: {
              ...state.progress,
              studyStreak: newStreak,
              lastStudyDate: new Date().toISOString()
            }
          }
        })
      },

      addStudyTime: (minutes) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalStudyTime: state.progress.totalStudyTime + minutes
          }
        }))
      },

      // 设置相关方法
      setVoiceType: (type) => {
        set((state) => ({
          settings: { ...state.settings, voiceType: type }
        }))
      },

      setSpeechRate: (rate) => {
        set((state) => ({
          settings: { ...state.settings, speechRate: rate }
        }))
      },

      toggleSound: () => {
        set((state) => ({
          settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled }
        }))
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme }
        }))
      },

      // 考试历史相关方法
      addExamResult: (result) => {
        set((state) => ({
          examHistory: [...state.examHistory, result]
        }))
      },

      // 重置方法
      resetProgress: () => {
        set({
          progress: defaultProgress,
          examHistory: []
        })
      }
    }),
    {
      name: 'english-learning-storage'
    }
  )
)
