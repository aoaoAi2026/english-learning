import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

const PRIZES = [
  { label: '⭐ +3', emoji: '⭐', color: 'from-yellow-300 to-amber-400', value: 3, type: 'stars' as const },
  { label: '⭐ +5', emoji: '🌟', color: 'from-yellow-400 to-orange-400', value: 5, type: 'stars' as const },
  { label: '⭐ +10', emoji: '💫', color: 'from-pink-400 to-rose-400', value: 10, type: 'stars' as const },
  { label: '再来一次', emoji: '🔄', color: 'from-blue-400 to-cyan-400', value: 0, type: 'spin_again' as const },
  { label: '⭐ +2', emoji: '✨', color: 'from-purple-400 to-violet-400', value: 2, type: 'stars' as const },
  { label: '⭐ +8', emoji: '💎', color: 'from-emerald-400 to-teal-400', value: 8, type: 'stars' as const },
  { label: '⭐ +1', emoji: '🎯', color: 'from-gray-400 to-slate-400', value: 1, type: 'stars' as const },
  { label: '⭐ +15', emoji: '👑', color: 'from-red-400 to-pink-400', value: 15, type: 'stars' as const },
]

const SEGMENT_ANGLE = 360 / PRIZES.length

export function SpinWheelPage() {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<(typeof PRIZES)[0] | null>(null)
  const [spinsLeft, setSpinsLeft] = useState(() => {
    const today = new Date().toDateString()
    const saved = localStorage.getItem(`spin-wheel-${today}`)
    return saved ? parseInt(saved) : 3
  })
  const [showResult, setShowResult] = useState(false)

  const spin = useCallback(() => {
    if (spinning || spinsLeft <= 0) return

    setSpinning(true)
    setResult(null)
    setShowResult(false)

    const newSpinsLeft = spinsLeft - 1
    setSpinsLeft(newSpinsLeft)
    const today = new Date().toDateString()
    localStorage.setItem(`spin-wheel-${today}`, newSpinsLeft.toString())

    // Random prize index
    const prizeIndex = Math.floor(Math.random() * PRIZES.length)
    // Calculate rotation to land on the prize
    const targetAngle = 360 - (prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2)
    const fullSpins = 5 * 360 // Multiple full rotations for dramatic effect
    const newRotation = rotation + fullSpins + targetAngle - (rotation % 360)

    setRotation(newRotation)

    setTimeout(() => {
      setSpinning(false)
      setResult(PRIZES[prizeIndex])
      setShowResult(true)
    }, 4000)
  }, [spinning, spinsLeft, rotation])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50">
      <div className="max-w-lg mx-auto px-4 py-6 text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/games" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
            <span>返回游戏中心</span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎡 幸运大转盘
        </h1>
        <p className="text-gray-500 mb-2">转动转盘赢取星星奖励！</p>
        <div className="text-sm text-orange-500 font-medium mb-6">
          今日剩余次数：{spinsLeft} 次
        </div>

        {/* Wheel Container */}
        <div className="relative mx-auto mb-8" style={{ width: 320, height: 320 }}>
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden shadow-2xl transition-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? '4s' : '0.3s',
              transitionTimingFunction: spinning ? 'cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'ease',
            }}
          >
            {PRIZES.map((prize, idx) => {
              const startAngle = idx * SEGMENT_ANGLE
              const endAngle = startAngle + SEGMENT_ANGLE
              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180
              const midAngle = (startAngle + endAngle) / 2
              const midRad = (midAngle * Math.PI) / 180
              const r = 140

              return (
                <div
                  key={idx}
                  className={`absolute w-full h-full bg-gradient-to-br ${prize.color}`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.sin(startRad)}% ${50 - 50 * Math.cos(startRad)}%, ${50 + 50 * Math.sin(endRad)}% ${50 - 50 * Math.cos(endRad)}%)`,
                  }}
                >
                  <span
                    className="absolute text-white font-bold text-sm drop-shadow-md"
                    style={{
                      left: `${50 + (r / 200) * 80 * Math.sin(midRad)}%`,
                      top: `${50 - (r / 200) * 80 * Math.cos(midRad)}%`,
                      transform: `translate(-50%, -50%) rotate(${midAngle}deg)`,
                    }}
                  >
                    {prize.emoji}<br/>{prize.label}
                  </span>
                </div>
              )
            })}
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-inner flex items-center justify-center border-4 border-yellow-300">
              <Sparkles size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={spinning || spinsLeft <= 0}
          className={`
            px-12 py-4 rounded-3xl font-bold text-xl shadow-lg transition-all
            ${spinning || spinsLeft <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-xl hover:scale-105 active:scale-95 animate-pulse-glow'
            }
          `}
        >
          {spinning ? '🎰 转动中...' : spinsLeft <= 0 ? '今天次数用完啦' : '🎯 开始转！'}
        </button>

        {/* Result Modal */}
        {showResult && result && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4">{result.emoji === '🔄' ? '🎉' : result.emoji}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {result.type === 'spin_again' ? '再来一次！' : '恭喜获得！'}
              </h2>
              <p className="text-3xl font-bold text-orange-500 mb-4">
                {result.label}
              </p>
              {result.type === 'spin_again' && (
                <p className="text-gray-500 mb-4">已自动增加一次转动机会</p>
              )}
              <button
                onClick={() => {
                  if (result.type === 'spin_again') {
                    setSpinsLeft(s => s + 1)
                    const today = new Date().toDateString()
                    localStorage.setItem(`spin-wheel-${today}`, (spinsLeft + 1).toString())
                  }
                  setShowResult(false)
                  setResult(null)
                }}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
              >
                {spinsLeft > 0 || (result.type === 'spin_again') ? '🎯 继续转' : '👍 好的'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
