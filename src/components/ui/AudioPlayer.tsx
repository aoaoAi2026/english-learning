import { Volume2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 判断是否运行在 Capacitor 原生 APK 中
function isNativeApp(): boolean {
  try {
    // @ts-ignore
    return typeof window !== 'undefined' && window.Capacitor &&
      // @ts-ignore
      ['android', 'ios'].includes(window.Capacitor?.getPlatform?.() ?? '')
  } catch { return false }
}

// Capacitor 原生 TTS 插件（只在 APK 里加载时才用）
async function speakNative(text: string): Promise<boolean> {
  try {
    // @ts-ignore - 动态 import，PC 浏览器不会走到这里
    const { TextToSpeech } = await import('@capacitor-community/text-to-speech')
    await TextToSpeech.speak({
      text: text,
      lang: 'en-US',
      rate: 1.05,
      pitch: 1,
      volume: 1,
    })
    return true
  } catch (e) {
    console.warn('[AudioPlayer] native TTS failed:', e)
    return false
  }
}

// Web Speech API（浏览器 & WebView 里可用，桌面 Chrome 正常发音）
function speakWeb(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' ||
        !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined') {
      resolve(false)
      return
    }
    try {
      const s = window.speechSynthesis
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 1.05
      u.pitch = 1
      u.volume = 1
      u.lang = 'en-US'

      let resolved = false
      const done = (ok: boolean) => { if (!resolved) { resolved = true; resolve(ok) } }

      u.onend = () => done(true)
      u.onerror = () => done(false)

      s.cancel()
      s.speak(u)

      // 超时保护
      setTimeout(() => done(false), 6000)
    } catch { resolve(false) }
  })
}

// 在线 TTS（Google 翻译 TTS，兜底用）
function speakOnline(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') { resolve(false); return }
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=gtx`
      const audio = new Audio(url)
      audio.volume = 1

      let resolved = false
      const finish = (ok: boolean) => { if (!resolved) { resolved = true; resolve(ok) } }
      audio.onended = () => finish(true)
      audio.onerror = () => finish(false)
      setTimeout(() => finish(false), 8000)
      audio.play()?.catch(() => finish(false))
    } catch { resolve(false) }
  })
}

// 统一的发音入口：APK → 原生 TTS；否则 Web Speech API；都失败 → 在线 TTS
async function speakText(text: string): Promise<void> {
  const trimmed = text.trim().substring(0, 200)
  if (!trimmed) return

  // 1) APK 里优先用原生 TTS
  if (isNativeApp()) {
    const ok = await speakNative(trimmed)
    if (ok) return
    // 原生失败，继续尝试 Web Speech 或 在线 TTS
  }

  // 2) Web Speech API（桌面浏览器、移动浏览器都支持）
  const webOk = await speakWeb(trimmed)
  if (webOk) return

  // 3) 兜底：在线 TTS
  await speakOnline(trimmed)
}

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
    speakText(text).finally(() => setIsPlaying(false))

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

    setIsPlaying(true)
    speakText(text).finally(() => setIsPlaying(false))
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
