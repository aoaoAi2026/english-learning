import { useEffect, useState } from 'react'
import { Trophy, Star, Zap, Target, Award, Sparkles } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  desc: string
  emoji: string
  icon: typeof Trophy
}

const ACHIEVEMENTS: Record<string, Achievement> = {
  firstWord: { id: 'firstWord', title: '初出茅庐', desc: '学会第1个单词', emoji: '🌱', icon: Star },
  tenWords: { id: 'tenWords', title: '单词小达人', desc: '学会10个单词', emoji: '📚', icon: Award },
  fiftyWords: { id: 'fiftyWords', title: '词汇小高手', desc: '学会50个单词', emoji: '🎓', icon: Trophy },
  hundredWords: { id: 'hundredWords', title: '百词斩', desc: '学会100个单词', emoji: '⚔️', icon: Zap },
  firstLevel: { id: 'firstLevel', title: '闯关新星', desc: '通过第1关', emoji: '🗺️', icon: Target },
  fiveLevels: { id: 'fiveLevels', title: '冒险勇士', desc: '通过5关', emoji: '🛡️', icon: Trophy },
  streak3: { id: 'streak3', title: '三日坚持', desc: '连续学习3天', emoji: '🔥', icon: Zap },
  streak7: { id: 'streak7', title: '一周学霸', desc: '连续学习7天', emoji: '👑', icon: Trophy },
}

interface AchievementToastProps {
  type: string
  show: boolean
  onClose?: () => void
}

export function AchievementToast({ type, show, onClose }: AchievementToastProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const achievement = ACHIEVEMENTS[type]

  useEffect(() => {
    if (show && achievement) {
      setVisible(true)
      setClosing(false)
      const t = setTimeout(() => {
        setClosing(true)
        setTimeout(() => { setVisible(false); onClose?.() }, 500)
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [show, type])

  if (!visible || !achievement) return null

  const Icon = achievement.icon || Trophy

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-500 ${
      closing ? 'opacity-0 translate-y-[-20px] scale-90' : 'opacity-100 translate-y-0 scale-100'
    }`}>
      <div className="animate-celebration-bounce bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 px-6 py-4 flex items-center gap-4 min-w-[280px]">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 flex items-center justify-center shadow-lg">
            <span className="text-3xl">{achievement.emoji}</span>
          </div>
          <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-400 animate-spin-slow" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Icon size={16} className="text-yellow-500" />
            <span className="text-xs font-bold text-yellow-600 uppercase tracking-wide">成就解锁</span>
          </div>
          <p className="text-base font-extrabold text-gray-800">{achievement.title}</p>
          <p className="text-xs text-gray-500">{achievement.desc}</p>
        </div>
      </div>
    </div>
  )
}

// 检查并触发成就
export function checkAchievements(
  learnedWords: number,
  completedLevels: number,
  streak: number,
  callback: (type: string) => void
) {
  const achieved = new Set<string>()
  
  if (learnedWords >= 1) achieved.add('firstWord')
  if (learnedWords >= 10) achieved.add('tenWords')
  if (learnedWords >= 50) achieved.add('fiftyWords')
  if (learnedWords >= 100) achieved.add('hundredWords')
  if (completedLevels >= 1) achieved.add('firstLevel')
  if (completedLevels >= 5) achieved.add('fiveLevels')
  if (streak >= 3) achieved.add('streak3')
  if (streak >= 7) achieved.add('streak7')

  return achieved
}
