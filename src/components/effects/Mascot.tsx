import { useState, useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'

type Mood = 'happy' | 'thinking' | 'proud' | 'sleepy' | 'cheer'

interface MascotProps {
  mood?: Mood
  message?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  floating?: boolean
}

const OWL = {
  happy: {
    body: '🦉',
    eyes: '😊',
    color: 'from-amber-400 to-orange-400',
  },
  thinking: {
    body: '🤔',
    eyes: '🧐',
    color: 'from-purple-400 to-pink-400',
  },
  proud: {
    body: '🎓',
    eyes: '😎',
    color: 'from-yellow-400 to-amber-400',
  },
  sleepy: {
    body: '😴',
    eyes: '🥱',
    color: 'from-blue-400 to-indigo-400',
  },
  cheer: {
    body: '🎉',
    eyes: '🤩',
    color: 'from-green-400 to-emerald-400',
  },
}

const ENCOURAGEMENTS: Record<Mood, string[]> = {
  happy: [
    '今天也要加油哦！💪',
    '来一起学英语吧！📚',
    '哇，你来了！好开心！😊',
    '点击卡片开始学习吧~',
  ],
  thinking: [
    '让我想想...🤔',
    '这个词有点难呢！',
    '仔细看看再回答哦~',
    '不着急，慢慢来！',
  ],
  proud: [
    '太棒了！你真厉害！🎉',
    '又答对啦！继续加油！⭐',
    '你是英语小天才！🌟',
    '我为你感到骄傲！🏆',
  ],
  sleepy: [
    '有点困了...但还是支持你！😴',
    '坚持学习，你一定可以的！',
    '休息一下再继续吧~',
  ],
  cheer: [
    '答对啦！太厉害了！🎊',
    '满分通过！你是最棒的！🏅',
    '连击！势不可挡！🔥',
    '无敌！继续冲击记录！💎',
  ],
}

export function Mascot({ mood = 'happy', message, size = 'md', onClick, floating = false }: MascotProps) {
  const [currentMsg, setCurrentMsg] = useState('')
  const [msgVisible, setMsgVisible] = useState(false)
  const [showMsg, setShowMsg] = useState(true)
  const totalStars = useUserStore((s) => s.progress.totalStars)

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
  }

  useEffect(() => {
    if (message) {
      setCurrentMsg(message)
      setMsgVisible(true)
      setShowMsg(true)
      const t = setTimeout(() => setShowMsg(false), 4000)
      return () => clearTimeout(t)
    } else if (mood !== 'happy' || Math.random() < 0.15) {
      const msgs = ENCOURAGEMENTS[mood]
      setCurrentMsg(msgs[Math.floor(Math.random() * msgs.length)])
      setMsgVisible(true)
      setShowMsg(true)
      const t = setTimeout(() => setShowMsg(false), 4000)
      return () => clearTimeout(t)
    }
  }, [mood, message])

  const handleClick = () => {
    // 随机换一个鼓励语
    const msgs = ENCOURAGEMENTS[mood]
    setCurrentMsg(msgs[Math.floor(Math.random() * msgs.length)])
    setMsgVisible(true)
    setShowMsg(true)
    setTimeout(() => setShowMsg(false), 3000)
    onClick?.()
  }

  return (
    <div className={`relative inline-flex flex-col items-center ${floating ? 'animate-float' : ''}`}>
      {/* 星星徽章 (只在sm尺寸时显示) */}
      {mood === 'proud' && size !== 'sm' && (
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-bounce-in z-10">
          ⭐
        </div>
      )}

      {/* 猫头鹰主体 */}
      <button
        onClick={handleClick}
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${OWL[mood].color} flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer select-none relative`}
        title="我是你的学习伙伴~点我试试！"
      >
        <span className="inline-block">🦉</span>
      </button>

      {/* 对话气泡 */}
      {msgVisible && currentMsg && (
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-white text-gray-700 px-3 py-1.5 rounded-2xl text-xs font-medium shadow-md whitespace-nowrap z-20 transition-all duration-300 border border-gray-100 ${
            showMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          {currentMsg}
          {/* 气泡小三角 */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
        </div>
      )}

      {/* 总星星计数 (只在大尺寸时显示) */}
      {size === 'lg' && totalStars > 0 && (
        <div className="mt-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full">
          ⭐ {totalStars}
        </div>
      )}
    </div>
  )
}
