import { Link, useParams } from 'react-router-dom'
import { Lock, CheckCircle, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Grade } from '@/types'
import { getLevelsByGrade } from '@/data/levels'
import { useUserStore } from '@/stores/userStore'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function AdventurePage() {
  const { gradeId } = useParams()
  const grade = parseInt(gradeId || '1') as Grade
  const levels = getLevelsByGrade(grade)
  const { progress } = useUserStore()
  
  const isLevelUnlocked = (levelId: string, prerequisite?: string) => {
    if (!prerequisite) return true
    return progress.completedLevels.includes(prerequisite)
  }
  
  const getLevelStars = (levelId: string) => {
    return progress.stars[levelId] || 0
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎮 闯关大冒险
        </h1>
        <p className="text-gray-600">
          完成关卡获得星星，解锁更多挑战！
        </p>
      </div>

      {/* World Map */}
      <div className="relative">
        {/* Path Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {levels.map((level, index) => {
            if (index === 0) return null
            const prevLevel = levels[index - 1]
            const x1 = ((index - 1) % 3) * 33.33 + 16.67
            const y1 = Math.floor((index - 1) / 3) * 50 + 25
            const x2 = (index % 3) * 33.33 + 16.67
            const y2 = Math.floor(index / 3) * 50 + 25
            
            const isCompleted = progress.completedLevels.includes(prevLevel.id)
            
            return (
              <line
                key={`line-${level.id}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={isCompleted ? '#F97316' : '#E5E7EB'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={isCompleted ? '0' : '8 8'}
              />
            )
          })}
        </svg>

        {/* Level Nodes */}
        <div className="grid grid-cols-3 gap-8 relative" style={{ zIndex: 1 }}>
          {levels.map((level, index) => {
            const unlocked = isLevelUnlocked(level.id, level.prerequisite)
            const completed = progress.completedLevels.includes(level.id)
            const stars = getLevelStars(level.id)
            
            return (
              <Link
                key={level.id}
                to={unlocked ? `/grade/${grade}/adventure/${level.id}` : '#'}
                className={twMerge(!unlocked && 'pointer-events-none')}
              >
                <Card
                  hover={unlocked}
                  className={twMerge(
                    clsx(
                      'text-center relative overflow-hidden',
                      !unlocked && 'opacity-60'
                    )
                  )}
                >
                  {/* Background Pattern */}
                  <div className={twMerge(
                    clsx(
                      'absolute inset-0 opacity-10',
                      completed
                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                        : unlocked
                          ? 'bg-gradient-to-br from-orange-400 to-cyan-400'
                          : 'bg-gray-300'
                    )
                  )} />

                  {/* Status Icon */}
                  <div className="absolute top-3 right-3">
                    {!unlocked && <Lock className="text-gray-400" size={20} />}
                    {completed && <CheckCircle className="text-green-500" size={20} />}
                  </div>

                  {/* Level Icon */}
                  <div className={twMerge(
                    clsx(
                      'w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg',
                      completed
                        ? 'bg-green-100'
                        : unlocked
                          ? 'bg-gradient-to-br from-orange-100 to-cyan-100'
                          : 'bg-gray-100'
                    )
                  )}>
                    {level.icon}
                  </div>

                  {/* Level Info */}
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    第{level.order}关
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {level.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {level.description}
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={twMerge(
                          clsx(
                            star <= stars
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          )
                        )}
                      />
                    ))}
                  </div>

                  {/* Question Count */}
                  <p className="text-xs text-gray-400 mt-3">
                    {level.questionCount}题 · {Math.floor(level.timeLimit / 60)}分钟
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <span className="text-sm text-gray-500">未解锁</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-cyan-400 rounded" />
          <span className="text-sm text-gray-500">可挑战</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-sm text-gray-500">已完成</span>
        </div>
      </div>
    </div>
  )
}
