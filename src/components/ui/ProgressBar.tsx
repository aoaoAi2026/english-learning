import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: 'orange' | 'cyan' | 'green' | 'purple'
}

const colorStyles = {
  orange: 'bg-orange-500',
  cyan: 'bg-cyan-400',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  showLabel = false,
  color = 'orange'
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={twMerge('w-full', className)}>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={twMerge(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorStyles[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-500 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

// 圆形进度条
interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: 'orange' | 'cyan' | 'green' | 'purple'
  showValue?: boolean
}

const circularColorStyles = {
  orange: '#F97316',
  cyan: '#22D3EE',
  green: '#10B981',
  purple: '#A855F7'
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  color = 'orange',
  showValue = true
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circularColorStyles[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showValue && (
        <span className="absolute text-lg font-bold text-gray-700">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}
