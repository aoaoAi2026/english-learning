import { Star } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}

export function StarRating({
  rating,
  maxRating = 3,
  size = 'md',
  interactive = false,
  onChange,
  className
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1)

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value)
    }
  }

  return (
    <div className={twMerge('flex gap-1', className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={twMerge(
            clsx(
              sizeStyles[size],
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200',
              interactive && 'cursor-pointer hover:scale-110 transition-transform'
            )
          )}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  )
}

// 大星星显示（用于结算页面）
interface BigStarsProps {
  count: number
  className?: string
}

export function BigStars({ count, className }: BigStarsProps) {
  return (
    <div className={twMerge('flex gap-3 justify-center', className)}>
      {[1, 2, 3].map((star) => (
        <div
          key={star}
          className={twMerge(
            clsx(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'transition-all duration-500',
              star <= count
                ? 'bg-yellow-400 shadow-lg scale-100'
                : 'bg-gray-200 scale-75 opacity-50'
            )
          )}
          style={{
            animationDelay: `${star * 200}ms`
          }}
        >
          <Star
            className={twMerge(
              'w-10 h-10',
              star <= count ? 'fill-white text-white' : 'fill-gray-400 text-gray-400'
            )}
          />
        </div>
      ))}
    </div>
  )
}
