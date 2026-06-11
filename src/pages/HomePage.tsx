import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Mic, Gamepad2, FileText, Trophy, Flame, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/stores/userStore'
import { Grade, GradeNames } from '@/types'
import { getLevelsByGrade } from '@/data/levels'
import { getWordsByGrade } from '@/data/words'

const gradeStyles = [
  { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-600', hover: 'hover:bg-red-100', hoverShadow: 'hover:shadow-red-200' },
  { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-600', hover: 'hover:bg-cyan-100', hoverShadow: 'hover:shadow-cyan-200' },
  { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-600', hover: 'hover:bg-yellow-100', hoverShadow: 'hover:shadow-yellow-200' },
  { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-600', hover: 'hover:bg-purple-100', hoverShadow: 'hover:shadow-purple-200' },
  { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-600', hover: 'hover:bg-orange-100', hoverShadow: 'hover:shadow-orange-200' },
  { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-600', hover: 'hover:bg-emerald-100', hoverShadow: 'hover:shadow-emerald-200' }
]

export function HomePage() {
  const { progress } = useUserStore()
  const navigate = useNavigate()
  const currentGrade = progress.currentGrade || Grade.ONE

  const getGradeProgress = (grade: Grade) => {
    const levels = getLevelsByGrade(grade)
    const completedCount = levels.filter(l => progress.completedLevels.includes(l.id)).length
    return {
      total: levels.length,
      completed: completedCount
    }
  }

  const getWordProgress = (grade: Grade) => {
    const words = getWordsByGrade(grade)
    const learnedCount = words.filter(w => progress.wordsLearned.includes(w.id)).length
    return {
      total: words.length,
      learned: learnedCount
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 p-6 bg-gradient-to-br from-orange-500 to-cyan-400 rounded-3xl shadow-xl">
            <span className="text-5xl">📚</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            欢迎来到小学英语乐园
          </h1>
          <p className="text-lg text-gray-600">
            有趣的学习旅程从这里开始！
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-2xl font-bold text-orange-600">{progress.totalStars || 0}</div>
            <div className="text-xs text-gray-500">总星星</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-2xl font-bold text-red-600">{progress.studyStreak || 0}</div>
            <div className="text-xs text-gray-500">连续天数</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-cyan-600">{progress.completedLevels?.length || 0}</div>
            <div className="text-xs text-gray-500">完成关卡</div>
          </div>
        </div>

        {/* Grade Selection */}
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          选择你的年级
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {[Grade.ONE, Grade.TWO, Grade.THREE, Grade.FOUR, Grade.FIVE, Grade.SIX].map((grade, idx) => {
            const gradeProgress = getGradeProgress(grade)
            const wordProgress = getWordProgress(grade)
            const style = gradeStyles[idx]
            
            return (
              <Link
                key={grade}
                to={`/grade/${grade}`}
                className={`${style.bg} ${style.border} border-2 rounded-2xl p-4 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg ${style.hoverShadow} cursor-pointer block`}
              >
                <div className={`text-2xl mb-2 ${style.text}`}>
                  {['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'][idx]}
                </div>
                <div className={`font-bold text-base mb-2 ${style.text}`}>
                  {GradeNames[grade]}
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>{gradeProgress.completed}/{gradeProgress.total} 关卡</div>
                  <div>{wordProgress.learned}/{wordProgress.total} 单词</div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Access */}
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          快速开始
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            to={`/grade/${currentGrade}/words`}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center border-2 border-transparent hover:border-orange-200"
          >
            <div className="w-14 h-14 mx-auto mb-3 bg-orange-100 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-orange-500" size={28} />
            </div>
            <div className="font-bold text-base text-gray-800 mb-1">单词学习</div>
            <div className="text-sm text-gray-500">图文结合记忆</div>
          </Link>

          <Link
            to={`/grade/${currentGrade}/phonics`}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center border-2 border-transparent hover:border-purple-200"
          >
            <div className="w-14 h-14 mx-auto mb-3 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Mic className="text-purple-500" size={28} />
            </div>
            <div className="font-bold text-base text-gray-800 mb-1">音标教学</div>
            <div className="text-sm text-gray-500">发音示范</div>
          </Link>

          <Link
            to={`/grade/${currentGrade}/adventure`}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center border-2 border-transparent hover:border-cyan-200"
          >
            <div className="w-14 h-14 mx-auto mb-3 bg-cyan-100 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="text-cyan-500" size={28} />
            </div>
            <div className="font-bold text-base text-gray-800 mb-1">闯关游戏</div>
            <div className="text-sm text-gray-500">游戏化学习</div>
          </Link>

          <Link
            to={`/grade/${currentGrade}/exam`}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center border-2 border-transparent hover:border-green-200"
          >
            <div className="w-14 h-14 mx-auto mb-3 bg-green-100 rounded-2xl flex items-center justify-center">
              <FileText className="text-green-500" size={28} />
            </div>
            <div className="font-bold text-base text-gray-800 mb-1">模拟考试</div>
            <div className="text-sm text-gray-500">自动出题</div>
          </Link>
        </div>

        {/* Bottom Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link
            to="/report"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center"
          >
            <div className="text-2xl mb-1">📊</div>
            <div className="font-bold text-sm">学习报告</div>
            <div className="text-xs opacity-90">查看进度</div>
          </Link>

          <Link
            to="/wrongbook"
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center"
          >
            <div className="text-2xl mb-1">📕</div>
            <div className="font-bold text-sm">错题本</div>
            <div className="text-xs opacity-90">巩固错题</div>
          </Link>

          <Link
            to="/resources"
            className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer block text-center"
          >
            <div className="text-2xl mb-1">🌐</div>
            <div className="font-bold text-sm">资源导航</div>
            <div className="text-xs opacity-90">学习资源</div>
          </Link>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-400 mb-4">
          💡 点击任意卡片开始学习
        </div>
      </div>
    </div>
  )
}
