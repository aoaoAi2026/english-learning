import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, CheckCircle, Star, ArrowLeft, Trophy, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { GradeSelector } from '@/components/ui/GradeSelector'
import { FloatingEmojis } from '@/components/effects/FloatingEmojis'
import { Grade, GradeNames } from '@/types'
import { getLevelsByGrade, getAllLevels } from '@/data/levels'
import { useUserStore } from '@/stores/userStore'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { playClick } from '@/utils/sounds'

export function AdventurePage() {
  const { progress, setCurrentGrade } = useUserStore()
  const [grade, setGrade] = useState<Grade>(progress.currentGrade || Grade.ONE)
  const [showAll, setShowAll] = useState(false)

  const levels = showAll ? getAllLevels() : getLevelsByGrade(grade)

  const isLevelUnlocked = (levelId: string, prerequisite?: string) => {
    if (!prerequisite) return true
    return progress.completedLevels.includes(prerequisite)
  }

  const getLevelStars = (levelId: string) => {
    return progress.stars[levelId] || 0
  }

  const totalLevels = getAllLevels()
  const totalCompleted = totalLevels.filter(l => progress.completedLevels.includes(l.id)).length
  const totalLevelsCount = totalLevels.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-yellow-50 to-cyan-50">
      <FloatingEmojis count={12} />
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" onClick={playClick} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium">
            <ArrowLeft size={20} />
            首页
          </Link>
          <button
            onClick={() => { playClick(); setShowAll(!showAll) }}
            className={`text-sm font-medium px-3 py-1.5 rounded-xl transition-all ${
              showAll ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {showAll ? '全年级视图' : '按年级查看'}
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            🗺️ 闯关大冒险
            {totalCompleted === totalLevelsCount && <Trophy size={28} className="text-yellow-500 animate-bounce" />}
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1.5 shadow-sm">
            <Sparkles size={16} className="text-yellow-500" />
            <p className="text-gray-600 text-sm font-medium">
              已闯过 <span className="text-orange-500 font-bold">{totalCompleted}</span> / {totalLevelsCount} 关
            </p>
          </div>
        </div>

        {/* Grade Filter */}
        {!showAll && (
          <div className="mb-6">
            <GradeSelector value={grade} onChange={(g) => { setGrade(g); setCurrentGrade(g) }} compact />
          </div>
        )}

        {showAll && (
          <div className="mb-6">
            <p className="text-sm text-gray-400 text-center">正在显示所有年级的关卡</p>
          </div>
        )}

        {/* Adventure Map */}
        <div className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {levels.map((level, index) => {
              if (index === 0) return null
              const prevLevel = levels[index - 1]
              const isSameGrade = level.grade === prevLevel.grade
              const x1 = ((index - 1) % 3) * 33.33 + 16.67
              const y1 = Math.floor((index - 1) / 3) * 50 + 25
              const x2 = (index % 3) * 33.33 + 16.67
              const y2 = Math.floor(index / 3) * 50 + 25
              const isCompleted = progress.completedLevels.includes(prevLevel.id)

              if (!isSameGrade && index % 3 === 0) return null

              return (
                <line
                  key={`line-${level.id}`}
                  x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                  stroke={isCompleted ? '#F97316' : '#E5E7EB'}
                  strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={isCompleted ? '0' : '8 8'}
                />
              )
            })}
          </svg>

          <div className="grid grid-cols-3 gap-4 md:gap-6 relative" style={{ zIndex: 1 }}>
            {levels.map((level) => {
              const unlocked = isLevelUnlocked(level.id, level.prerequisite)
              const completed = progress.completedLevels.includes(level.id)
              const stars = getLevelStars(level.id)

              return (
                <Link
                  key={level.id}
                  to={unlocked ? `/adventure/${level.id}` : '#'}
                  onClick={unlocked ? playClick : undefined}
                  className={twMerge(!unlocked && 'pointer-events-none')}
                >
                  <Card hover={unlocked}
                    className={twMerge(clsx('text-center relative overflow-hidden p-4', !unlocked && 'opacity-60'))}
                  >
                    <div className={twMerge(clsx(
                      'absolute inset-0 opacity-10',
                      completed ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      unlocked ? 'bg-gradient-to-br from-orange-400 to-cyan-400' : 'bg-gray-300'
                    ))} />
                    <div className="absolute top-2 right-2">
                      {!unlocked && <Lock className="text-gray-400" size={18} />}
                      {completed && <CheckCircle className="text-green-500" size={18} />}
                    </div>
                    <div className={twMerge(clsx(
                      'w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-md',
                      completed ? 'bg-green-100' : unlocked ? 'bg-gradient-to-br from-orange-100 to-cyan-100' : 'bg-gray-100'
                    ))}>
                      {level.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">{level.name}</h3>
                    {showAll && (
                      <span className="text-[10px] text-gray-400">{GradeNames[level.grade]}</span>
                    )}
                    <div className="flex justify-center gap-0.5 mt-1">
                      {[1, 2, 3].map((s) => (
                        <Star key={s} size={14}
                          className={clsx(s <= stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200')}
                        />
                      ))}
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-300 rounded" /><span className="text-xs text-gray-400">未解锁</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-cyan-400 rounded" /><span className="text-xs text-gray-400">可挑战</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /><span className="text-xs text-gray-400">已完成</span></div>
        </div>
      </div>
    </div>
  )
}
