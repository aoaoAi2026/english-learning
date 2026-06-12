// 声音初始化组件 - 确保移动端能正常播放语音
import { useState, useEffect } from 'react'
import { Volume2 } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SoundInitProps {
  onInit?: () => void
}

export function SoundInit({ onInit }: SoundInitProps) {
  const [initialized, setInitialized] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // 检查是否已经初始化过
    const hasInit = localStorage.getItem('soundInitialized')
    if (!hasInit) {
      setShowHint(true)
    }
  }, [])

  const handleInit = () => {
    // 初始化语音系统
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // 获取语音列表
      const voices = window.speechSynthesis.getVoices()

      // 如果没有加载，先触发加载
      if (voices.length === 0) {
        window.speechSynthesis.getVoices()
      }

      // 播放一个无声的测试音频来解锁音频上下文
      const utterance = new SpeechSynthesisUtterance(' ')
      utterance.volume = 0
      window.speechSynthesis.speak(utterance)
      window.speechSynthesis.cancel()
    }

    // 保存初始化状态
    localStorage.setItem('soundInitialized', 'true')
    setInitialized(true)
    setShowHint(false)
    onInit?.()
  }

  // 如果已经初始化或不需要提示，不显示
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
