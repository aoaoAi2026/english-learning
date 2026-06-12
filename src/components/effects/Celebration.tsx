import { useEffect, useState, useCallback } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  delay: number
  duration: number
  size: number
  rotation: number
}

const EMOJIS = ['⭐', '🌟', '✨', '🎉', '🎊', '💫', '🌈', '🎈', '🦋', '🌸', '💖', '🏆']

interface CelebrationProps {
  show: boolean
  type?: 'stars' | 'confetti' | 'hearts' | 'all'
  onComplete?: () => void
}

export function Celebration({ show, type = 'stars', onComplete }: CelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  const emojiSet = type === 'stars' ? ['⭐', '🌟', '✨', '💫']
    : type === 'confetti' ? ['🎉', '🎊', '🌈', '🎈']
    : type === 'hearts' ? ['💖', '❤️', '💕', '💝', '💗']
    : EMOJIS

  const generate = useCallback(() => {
    const items: Particle[] = []
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: -10 - Math.random() * 20,
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 2,
        size: 16 + Math.random() * 24,
        rotation: (Math.random() - 0.5) * 720,
      })
    }
    setParticles(items)
  }, [type])

  useEffect(() => {
    if (show) {
      generate()
      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setParticles([])
    }
  }, [show, generate, onComplete])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-celebration-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--spin': `${p.rotation}deg`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  )
}

// 小型的正确弹窗特效
interface CorrectPopupProps {
  show: boolean
  word?: string
  combo?: number
}

export function CorrectPopup({ show, word, combo = 0 }: CorrectPopupProps) {
  const [visible, setVisible] = useState(false)
  const [animClass, setAnimClass] = useState('')

  useEffect(() => {
    if (show) {
      setVisible(true)
      setAnimClass('animate-bounce-in')
      const t = setTimeout(() => {
        setAnimClass('animate-float-up opacity-0')
      }, 800)
      const t2 = setTimeout(() => setVisible(false), 2000)
      return () => { clearTimeout(t); clearTimeout(t2) }
    } else {
      setVisible(false)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] flex items-center justify-center">
      <div className={`${animClass} text-center transition-all`}>
        <div className="text-5xl mb-2">🎉</div>
        <div className="text-3xl font-extrabold text-green-500 drop-shadow-lg">
          正确!
        </div>
        {combo > 1 && (
          <div className="mt-1 text-lg font-bold text-orange-400 animate-wiggle">
            🔥 {combo}连击!
          </div>
        )}
        {word && (
          <div className="mt-1 text-lg text-gray-600">{word}</div>
        )}
      </div>
    </div>
  )
}
