import { useEffect, useState, useCallback } from 'react'

const emojiPool = ['⭐', '🌟', '💫', '✨', '🎈', '🎉', '🎊', '🦋', '🌈', '💖', '🪄', '🎵', '🍀', '💎', '🔥', '🦄', '🎪', '🏆']

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingEmojis({ count = 8 }: { count?: number }) {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([])

  const generate = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojiPool[Math.floor(Math.random() * emojiPool.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }))
  }, [count])

  useEffect(() => {
    setEmojis(generate())
    const interval = setInterval(() => setEmojis(generate()), 15000)
    return () => clearInterval(interval)
  }, [generate])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute animate-float-emoji opacity-20"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            fontSize: `${e.size}rem`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  )
}
