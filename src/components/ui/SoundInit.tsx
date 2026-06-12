// 声音初始化组件 - 确保移动端能正常播放语音
import { useState, useEffect } from 'react'
import { Volume2 } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { initAudio } from '@/utils/sounds'

interface SoundInitProps {
  onInit?: () => void
}

export function SoundInit({ onInit }: SoundInitProps) {
  const [initialized, setInitialized] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const hasInit = localStorage.getItem('soundInitialized')
    if (!hasInit) {
      setShowHint(true)
    }
  }, [])

  const handleInit = () => {
    // 1) 解锁 Web Audio（共享 AudioContext）
    initAudio()

    // 2) 解锁 Web Speech API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      try {
        const u = new SpeechSynthesisUtterance(' ')
        u.volume = 0
        window.speechSynthesis.speak(u)
      } catch {}
    }

    // 3) 解锁 HTML5 Audio
    try {
      const a = new Audio()
      a.play().catch(() => {})
    } catch {}

    localStorage.setItem('soundInitialized', 'true')
    setInitialized(true)
    setShowHint(false)
    onInit?.()
  }

  if (!showHint || initialized) return null

  return (
    <button
      onClick={handleInit}
      className={twMerge(
        clsx(
          'fixed bottom-4 right-4 z-50',
          'bg-gradient-to-r from-orange-500 to-amber-500',
          'text-white px-4 py-3 rounded-full',
          'shadow-lg hover:shadow-xl',
          'flex items-center gap-2',
          'animate-bounce'
        )
      )}
    >
      <Volume2 size={24} />
      <span className="font-medium">点击启用声音</span>
    </button>
  )
}
