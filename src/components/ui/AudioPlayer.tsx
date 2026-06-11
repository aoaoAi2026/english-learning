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

// 检查是否支持 Web Speech API
function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 
         'speechSynthesis' in window && 
         typeof SpeechSynthesisUtterance !== 'undefined'
}

// 获取英语语音
function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null
  
  try {
    const voices = window.speechSynthesis.getVoices()
    if (!voices || voices.length === 0) return null
    
    // 优先选择美式英语
    const preferred = voices.find(v => /en-US/i.test(v.lang)) || 
                     voices.find(v => /en-GB/i.test(v.lang)) ||
                     voices.find(v => /en/i.test(v.lang)) ||
                     voices[0]
    
    return preferred || null
  } catch {
    return null
  }
}

// 播放单词（直接调用 Web Speech API）
function speakText(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) {
      console.warn('当前浏览器不支持语音合成')
      resolve()
      return
    }

    try {
      // 取消之前的播放
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.85
      utterance.pitch = 1
      utterance.volume = 1
      utterance.lang = 'en-US'
      
      // 设置语音
      const voice = getEnglishVoice()
      if (voice) {
        utterance.voice = voice
      }

      utterance.onend = () => resolve()
      utterance.onerror = (e) => {
        console.warn('语音播放错误:', e)
        resolve()
      }

      window.speechSynthesis.speak(utterance)
      
      // 超时保护（最长3秒）
      setTimeout(() => {
        try {
          const speaking = window.speechSynthesis.speaking
          if (speaking) {
            window.speechSynthesis.cancel()
          }
          resolve()
        } catch {
          resolve()
        }
      }, 3000)
      
    } catch (e) {
      console.warn('语音播放异常:', e)
      resolve()
    }
  })
}

export function AudioPlayer({ 
  text, 
  className, 
  size = 'md',
  variant = 'primary'
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const playingTimer = useRef<number | null>(null)

  // 组件挂载时检测浏览器支持
  useEffect(() => {
    setIsSupported(isSpeechSupported())
    
    // 有些浏览器需要等语音列表加载完成
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.onvoiceschanged = () => {
          setIsSupported(true)
        }
      } catch {
        // 忽略
      }
    }
    
    return () => {
      if (playingTimer.current) {
        clearTimeout(playingTimer.current)
      }
    }
  }, [])

  const handlePlay = () => {
    if (!text) return
    
    // 停止之前的播放
    if (playingTimer.current) {
      clearTimeout(playingTimer.current)
    }
    
    // 设置播放状态（即使不支持也给用户反馈）
    setIsPlaying(true)
    
    // 播放语音 - 关键：不要用 async/await 等待
    // 移动端浏览器要求播放必须在用户点击的同步事件中
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // 直接同步播放，不等待Promise
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.85
        utterance.pitch = 1
        utterance.volume = 1
        utterance.lang = 'en-US'
        
        // 尝试获取英语语音
        try {
          const voices = window.speechSynthesis.getVoices()
          const enVoice = voices.find(v => /en/i.test(v.lang))
          if (enVoice) {
            utterance.voice = enVoice
          }
        } catch {
          // 忽略语音选择错误
        }
        
        utterance.onend = () => setIsPlaying(false)
        utterance.onerror = () => setIsPlaying(false)
        
        window.speechSynthesis.speak(utterance)
        
        // 超时保护
        const duration = Math.max(1000, text.length * 150)
        playingTimer.current = (typeof window !== 'undefined' ? window : globalThis as any).setTimeout(() => {
          setIsPlaying(false)
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            try {
              window.speechSynthesis.cancel()
            } catch {
              // 忽略
            }
          }
        }, duration)
      } else {
        // 不支持时也给出提示
        const duration = Math.max(1000, text.length * 150)
        playingTimer.current = (typeof window !== 'undefined' ? window : globalThis as any).setTimeout(() => {
          setIsPlaying(false)
        }, duration)
      }
    } catch (e) {
      console.warn('语音播放异常:', e)
      const duration = Math.max(1000, text.length * 150)
      playingTimer.current = (typeof window !== 'undefined' ? window : globalThis as any).setTimeout(() => {
        setIsPlaying(false)
      }, duration)
    }
  }

  return (
    <button
      onClick={handlePlay}
      className={twMerge(
        clsx(
          'rounded-full flex items-center justify-center',
          'transition-all duration-200 active:scale-95',
          sizeStyles[size],
          variant === 'primary'
            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
            : 'bg-cyan-400 hover:bg-cyan-500 text-white shadow-md hover:shadow-lg',
          isPlaying && 'animate-pulse',
          !isSupported && 'opacity-70',
          className
        )
      )}
      title={isSupported ? '点击播放发音' : '当前浏览器可能不支持语音播放'}
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

// 带音量控制的播放器
interface AudioPlayerWithControlProps {
  text: string
  className?: string
}

export function AudioPlayerWithControl({ text, className }: AudioPlayerWithControlProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playingTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (playingTimer.current) {
        clearTimeout(playingTimer.current)
      }
    }
  }, [])

  const handlePlay = () => {
    if (!text) return
    
    if (playingTimer.current) {
      clearTimeout(playingTimer.current)
    }
    
    setIsPlaying(true)
    speakText(text)
    
    const duration = Math.max(1000, text.length * 150)
    playingTimer.current = (typeof window !== 'undefined' ? window : globalThis as any).setTimeout(() => {
      setIsPlaying(false)
    }, duration)
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
