import { Volume2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface AudioPlayerProps {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

const sizeStyles = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20'
}

const iconSizes = {
  sm: 20,
  md: 28,
  lg: 40
}

function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' &&
         'speechSynthesis' in window &&
         typeof SpeechSynthesisUtterance !== 'undefined'
}

function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null
  try {
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) return null
    return voices.find(v => /en-US/i.test(v.lang)) ||
           voices.find(v => /en-GB/i.test(v.lang)) ||
           voices.find(v => /en/i.test(v.lang)) || null
  } catch { return null }
}

// 播放单词：Web Speech 直接播，Google TTS 作为后台备用（国内用户听 Web Speech）
function speakText(text: string): Promise<void> {
  return new Promise((resolve) => {
    const trimmed = text.trim().substring(0, 200)

    // 主引擎：Web Speech API（低延迟，桌面/移动端均有英文语音）
    if (isSpeechSupported()) {
      try {
        const s = window.speechSynthesis
        const u = new SpeechSynthesisUtterance(trimmed)
        u.rate = 1.05
        u.pitch = 1
        u.volume = 1
        u.lang = 'en-US'
        const voice = getEnglishVoice()
        if (voice) u.voice = voice

        u.onend = () => resolve()
        u.onerror = () => resolve()

        s.speak(u)

        // 超时保护
        setTimeout(() => resolve(), 8000)
        return
      } catch { /* fall through */ }
    }

    // 兜底：Google TTS
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(trimmed)}&tl=en&client=gtx`
    try {
      const audio = new Audio(url)
      audio.volume = 1
      audio.playbackRate = 1.15
      audio.onended = () => resolve()
      audio.onerror = () => resolve()
      audio.play()?.catch(() => resolve())
      setTimeout(() => resolve(), 8000)
    } catch { resolve() }
  })
}

export function AudioPlayer({
  text,
  className,
  size = 'md',
  variant = 'primary'
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playingTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => { if (playingTimer.current) clearTimeout(playingTimer.current) }
  }, [])

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!text) return
    if (playingTimer.current) clearTimeout(playingTimer.current)

    setIsPlaying(true)
    speakText(text).then(() => setIsPlaying(false))

    playingTimer.current = window.setTimeout(() => setIsPlaying(false), 5000)
  }

  return (
    <button
      onClick={handlePlay}
      className={twMerge(
        clsx(
          sizeStyles[size],
          'rounded-full flex items-center justify-center',
          'transition-all duration-150 active:scale-90',
          'touch-manipulation select-none border-none outline-none cursor-pointer',
          variant === 'primary'
            ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-600 text-white shadow-md hover:shadow-lg'
            : 'bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-500 text-white shadow-md hover:shadow-lg',
          isPlaying && 'animate-pulse scale-105',
          className,
        )
      )}
      title="点击播放发音"
      aria-label={`播放 ${text} 的发音`}
      type="button"
    >
      {isPlaying ? (
        <div className="flex gap-0.5">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
    </button>
  )
}

interface AudioPlayerWithControlProps {
  text: string
  className?: string
}

export function AudioPlayerWithControl({ text, className }: AudioPlayerWithControlProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playingTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => { if (playingTimer.current) clearTimeout(playingTimer.current) }
  }, [])

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!text) return
    if (playingTimer.current) clearTimeout(playingTimer.current)

    setIsPlaying(true)
    speakText(text).then(() => setIsPlaying(false))

    playingTimer.current = (typeof window !== 'undefined' ? window : globalThis as any).setTimeout(() => {
      setIsPlaying(false)
    }, 5000)
  }

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <button
        onClick={handlePlay}
        className={twMerge(
          clsx(
            'w-12 h-12 rounded-full flex items-center justify-center',
            'bg-orange-500 text-white shadow-md',
            'transition-all duration-200 hover:bg-orange-600 hover:shadow-lg active:scale-95',
            isPlaying && 'animate-pulse'
          )
        )}
      >
        {isPlaying ? (
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <Volume2 size={24} />
        )}
      </button>
    </div>
  )
}
