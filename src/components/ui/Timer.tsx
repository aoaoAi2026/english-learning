import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

interface TimerProps {
  seconds: number
  className?: string
  warning?: boolean
}

export function Timer({ seconds, className, warning = false }: TimerProps) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  const formatTime = (num: number) => num.toString().padStart(2, '0')

  return (
    <div
      className={twMerge(
        clsx(
          'px-4 py-2 rounded-xl font-mono text-2xl font-bold',
          warning
            ? 'bg-red-100 text-red-600 animate-pulse'
            : 'bg-gray-100 text-gray-700',
          className
        )
      )}
    >
      {formatTime(minutes)}:{formatTime(secs)}
    </div>
  )
}

// 倒计时Hook
import { useState, useEffect, useCallback } from 'react'

export function useTimer(initialSeconds: number, onTimeUp?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, onTimeUp])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback((newSeconds?: number) => {
    setSeconds(newSeconds ?? initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    formatted: `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  }
}
