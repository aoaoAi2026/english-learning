import { getWordBreakdown } from '@/utils/wordParts'

interface WordBreakdownProps {
  word: string
  compact?: boolean
}

export function WordBreakdown({ word, compact = false }: WordBreakdownProps) {
  const breakdown = getWordBreakdown(word)

  if (compact) {
    return (
      <div className="text-xs text-orange-600 font-semibold tracking-wide">
        {breakdown.display}
      </div>
    )
  }

  return (
    <div className="bg-orange-50 rounded-2xl p-5 mb-4 border border-orange-100">
      <h3 className="font-bold text-gray-800 mb-3">🧩 词根词缀拆词记忆</h3>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {breakdown.parts.map((part, index) => (
          <div key={`${part}-${index}`} className="flex items-center gap-2">
            <span className="px-4 py-2 bg-white rounded-xl text-orange-700 font-bold shadow-sm">
              {part}
            </span>
            {index < breakdown.parts.length - 1 && (
              <span className="text-orange-400 font-bold">·</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-2xl font-black text-orange-600 tracking-wider mb-2">
        {breakdown.display}
      </div>
      <p className="text-sm text-gray-600">{breakdown.explanation}</p>
    </div>
  )
}
