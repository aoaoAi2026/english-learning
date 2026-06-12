import { Grade, GradeNames } from '@/types'
import { useUserStore } from '@/stores/userStore'
import { playClick } from '@/utils/sounds'

interface GradeSelectorProps {
  value: Grade
  onChange: (grade: Grade) => void
  compact?: boolean
}

const GRADE_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣']
const GRADE_COLORS = [
  'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
  'bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100',
  'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100',
  'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
  'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
  'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
]
const GRADE_COLORS_ACTIVE = [
  'bg-red-500 text-white border-red-500',
  'bg-cyan-500 text-white border-cyan-500',
  'bg-yellow-500 text-white border-yellow-500',
  'bg-purple-500 text-white border-purple-500',
  'bg-orange-500 text-white border-orange-500',
  'bg-emerald-500 text-white border-emerald-500',
]

export function GradeSelector({ value, onChange, compact = false }: GradeSelectorProps) {
  return (
    <div className={compact ? 'flex gap-1.5 flex-wrap' : 'flex gap-2 flex-wrap justify-center'}>
      {[Grade.ONE, Grade.TWO, Grade.THREE, Grade.FOUR, Grade.FIVE, Grade.SIX].map((grade, idx) => {
        const isActive = grade === value
        return (
          <button
            key={grade}
            onClick={() => { playClick(); onChange(grade) }}
            className={`transition-all duration-200 border-2 rounded-xl font-medium ${
              compact
                ? `px-3 py-1 text-xs ${isActive ? GRADE_COLORS_ACTIVE[idx] : GRADE_COLORS[idx]}`
                : `px-4 py-2 text-sm ${isActive ? `${GRADE_COLORS_ACTIVE[idx]} shadow-md scale-105` : GRADE_COLORS[idx]}`
            }`}
          >
            <span className="mr-1">{GRADE_EMOJIS[idx]}</span>
            {compact ? GradeNames[grade].replace('年级', '') : GradeNames[grade]}
          </button>
        )
      })}
    </div>
  )
}
