import { getWordBreakdown } from '@/utils/wordParts'
import { Puzzle, ArrowRight, Lightbulb } from 'lucide-react'

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
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 mb-4 border border-orange-200 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Puzzle size={20} className="text-orange-500" />
        词根词缀拆词记忆
        <Lightbulb size={16} className="text-yellow-500" />
      </h3>

      {/* 拆词卡片 */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {breakdown.parts.map((part, index) => (
          <div key={`${part}-${index}`} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className={`
                px-4 py-2.5 rounded-2xl font-extrabold text-lg shadow-md
                ${index === 0 ? 'bg-orange-500 text-white' : ''}
                ${index === 1 ? 'bg-amber-500 text-white' : ''}
                ${index === 2 ? 'bg-rose-500 text-white' : ''}
                ${index >= 3 ? 'bg-purple-500 text-white' : ''}
              `}>
                {part}
              </span>
              {breakdown.partMeanings?.[index] && breakdown.partMeanings[index].meaning !== '音节' && (
                <span className="text-[10px] text-gray-500 mt-1 font-medium max-w-[80px] text-center leading-tight">
                  {breakdown.partMeanings[index].meaning}
                </span>
              )}
            </div>
            {index < breakdown.parts.length - 1 && (
              <ArrowRight size={18} className="text-orange-300" />
            )}
          </div>
        ))}
      </div>

      {/* 组合展示 */}
      <div className="text-center mb-3">
        <span className="text-2xl font-black text-orange-600 tracking-wider">
          {breakdown.display}
        </span>
      </div>

      {/* 解释 */}
      <div className="bg-white rounded-xl p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {breakdown.explanation}
      </div>

      {/* 每个部分的提示 */}
      {breakdown.partMeanings && breakdown.partMeanings.some(p => p.tip && p.meaning !== '音节') && (
        <div className="mt-3 flex flex-wrap gap-2">
          {breakdown.partMeanings.filter(p => p.meaning !== '音节').map((p, i) => (
            <div key={i} className="flex items-center gap-1 bg-white rounded-lg px-2.5 py-1.5 shadow-sm border border-orange-100">
              <span className="text-xs font-bold text-orange-600">{p.part}</span>
              <span className="text-[10px] text-gray-500">=</span>
              <span className="text-xs text-gray-600">{p.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
