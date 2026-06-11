import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { WordBreakdown } from '@/components/ui/WordBreakdown'
import { Grade } from '@/types'
import { getWordsByGrade, getUnitsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'

export function WordsPage() {
  const { gradeId } = useParams()
  const grade = parseInt(gradeId || '1') as Grade
  const words = getWordsByGrade(grade)
  const units = getUnitsByGrade(grade)
  const { learnWord, progress } = useUserStore()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  
  const filteredWords = selectedUnit 
    ? words.filter(w => w.unit === selectedUnit)
    : words
    
  const currentWord = filteredWords[currentIndex]
  
  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  
  const handleLearned = () => {
    if (currentWord) {
      learnWord(currentWord.id)
    }
    handleNext()
  }

  if (!currentWord || filteredWords.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-xl text-gray-600">暂无单词数据</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-xl">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/grade/${grade}`} className="text-orange-600 hover:text-orange-700 font-medium">
            ← 返回
          </Link>
          <div className="text-gray-600 font-medium">
            {currentIndex + 1} / {filteredWords.length}
          </div>
        </div>

        {/* Unit Filter */}
        {units.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button
              onClick={() => { setSelectedUnit(null); setCurrentIndex(0) }}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                selectedUnit === null
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-orange-50 shadow'
              }`}
            >
              全部
            </button>
            {units.map((unit) => (
              <button
                key={unit}
                onClick={() => { setSelectedUnit(unit); setCurrentIndex(0) }}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedUnit === unit
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 shadow'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        )}

        {/* Word Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-orange-100 to-cyan-100 p-8">
            {/* Word Header with Audio */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl font-bold text-gray-800">
                {currentWord.text}
              </h1>
              <AudioPlayer text={currentWord.text} size="lg" />
            </div>
            
            <p className="text-2xl text-gray-600 text-center mb-4">
              {currentWord.phonetic}
            </p>
            
            <div className="text-center mb-6">
              <div className="inline-block px-6 py-3 bg-white rounded-2xl shadow-md">
                <p className="text-2xl font-bold text-gray-800">{currentWord.meaning}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <WordBreakdown word={currentWord.text} />

            {/* Example */}
            <div className="bg-cyan-50 rounded-2xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <AudioPlayer text={currentWord.example} size="sm" variant="secondary" />
                <div>
                  <p className="text-lg text-gray-800 mb-2">{currentWord.example}</p>
                  <p className="text-gray-600">{currentWord.exampleMeaning}</p>
                </div>
              </div>
            </div>

            {/* Memory Tips */}
            {currentWord.memoryTips && currentWord.memoryTips.length > 0 && (
              <div className="bg-yellow-50 rounded-2xl p-5 mb-4">
                <h3 className="font-bold text-gray-800 mb-3">💡 记忆技巧</h3>
                {currentWord.memoryTips.map((tip, i) => (
                  <p key={i} className="text-gray-700 mb-2">· {tip.content}</p>
                ))}
              </div>
            )}

            {/* Category */}
            {currentWord.category && (
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-xl text-orange-700 font-medium mb-4">
                {currentWord.category}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            上一个
          </button>

          <button
            onClick={handleLearned}
            className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            已学会，下一个
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredWords.length - 1}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一个
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            已学会 {progress.wordsLearned?.length || 0} 个单词
          </p>
        </div>
      </div>
    </div>
  )
}
