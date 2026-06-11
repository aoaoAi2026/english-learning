import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookOpen, Mic, Gamepad2, FileText, ArrowLeft, Library, PenTool, MessageCircle } from 'lucide-react'
import { Grade, GradeNames } from '@/types'
import { useUserStore } from '@/stores/userStore'
import { getLevelsByGrade } from '@/data/levels'
import { getWordsByGrade } from '@/data/words'
import { getSentencesByGrade, getDialoguesByGrade } from '@/data/sentences'
import { WordBreakdown } from '@/components/ui/WordBreakdown'

export function GradeHomePage() {
  const { gradeId } = useParams()
  const grade = parseInt(gradeId || '1') as Grade
  const { progress, setCurrentGrade } = useUserStore()
  
  useEffect(() => {
    setCurrentGrade(grade)
  }, [grade, setCurrentGrade])
  
  const levels = getLevelsByGrade(grade)
  const words = getWordsByGrade(grade)
  const sentences = getSentencesByGrade(grade)
  const dialogues = getDialoguesByGrade(grade)
  
  const completedLevels = levels.filter(l => progress.completedLevels.includes(l.id)).length
  const learnedWords = words.filter(w => progress.wordsLearned.includes(w.id)).length
  
  const modules = [
    {
      title: '单词学习',
      icon: BookOpen,
      path: 'words',
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      hover: 'hover:border-orange-300',
      description: `${words.length}个单词等你学习`,
      progress: (learnedWords / words.length) * 100
    },
    {
      title: '音标学习',
      icon: Mic,
      path: 'phonics',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-300',
      description: '48个国际音标',
      progress: 0
    },
    {
      title: '闯关游戏',
      icon: Gamepad2,
      path: 'adventure',
      bg: 'bg-cyan-100',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      hover: 'hover:border-cyan-300',
      description: `${levels.length}个关卡等你挑战`,
      progress: (completedLevels / levels.length) * 100
    },
    {
      title: '句子练习',
      icon: PenTool,
      path: 'sentences',
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      hover: 'hover:border-orange-300',
      description: `${sentences.length}个句子填空练习`,
      progress: 0
    },
    {
      title: '情景对话',
      icon: MessageCircle,
      path: 'dialogue',
      bg: 'bg-cyan-100',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      hover: 'hover:border-cyan-300',
      description: `${dialogues.length}个情景对话练习`,
      progress: 0
    },
    {
      title: '模拟考试',
      icon: FileText,
      path: 'exam',
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-300',
      description: '自动生成试卷',
      progress: 0
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
        </div>

        {/* Grade Title */}
        <div className="text-center mb-8">
          <div className="inline-block p-5 bg-gradient-to-br from-orange-500 to-cyan-400 rounded-3xl shadow-xl mb-4">
            <span className="text-4xl">{['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'][grade - 1]}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {GradeNames[grade]}
          </h1>
          <p className="text-gray-600">
            已学习 {learnedWords}/{words.length} 个单词 · 完成 {completedLevels}/{levels.length} 个关卡
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {modules.map((module) => (
            <Link
              key={module.path}
              to={`/grade/${grade}/${module.path}`}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-2 ${module.border} ${module.hover}`}
            >
              <div className={`w-16 h-16 mb-4 ${module.bg} rounded-2xl flex items-center justify-center`}>
                <module.icon className={module.text} size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {module.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {module.description}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${module.bg.replace('100', '500')} rounded-full transition-all duration-500`}
                  style={{ width: `${module.progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {Math.round(module.progress)}% 完成
              </div>
            </Link>
          ))}
        </div>

        {/* Words Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Library className="text-orange-500" size={24} />
            今日单词
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {words.slice(0, 4).map((word) => (
              <Link
                key={word.id}
                to={`/grade/${grade}/words`}
                className="bg-orange-50 rounded-xl p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer block"
              >
                <div className="text-lg font-bold text-orange-700 mb-1">
                  {word.text}
                </div>
                <WordBreakdown word={word.text} compact />
                <div className="text-xs text-gray-500">
                  {word.meaning}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            ← 选择其他年级
          </Link>
        </div>
      </div>
    </div>
  )
}
