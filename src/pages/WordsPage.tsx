import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Maximize2, Minus, Search, X } from 'lucide-react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { WordBreakdown } from '@/components/ui/WordBreakdown'
import { GradeSelector } from '@/components/ui/GradeSelector'
import { Grade, Word } from '@/types'
import { getWordsByGrade, getAllWords, getUnitsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'
import { playCorrect, playClick } from '@/utils/sounds'
import { getWordEmoji } from '@/utils/wordIcons'
import { FloatingEmojis } from '@/components/effects/FloatingEmojis'

const ALL_GRADE = -1 as const

export function WordsPage() {
  const { learnWord, progress, setCurrentGrade } = useUserStore()
  const [grade, setGrade] = useState<Grade | typeof ALL_GRADE>(progress.currentGrade || Grade.ONE)
  const [showAll, setShowAll] = useState(false)
  
  const words = useMemo(() => showAll ? getAllWords() : getWordsByGrade((grade as Grade) || Grade.ONE), [grade, showAll])
  const units = useMemo(() => {
    if (showAll) {
      const allUnits = new Set(getAllWords().map(w => w.unit).filter(Boolean))
      return Array.from(allUnits) as string[]
    }
    return getUnitsByGrade((grade as Grade) || Grade.ONE)
  }, [grade, showAll])
  
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchText, setSearchText] = useState('')
  
  const filteredWords = searchText
    ? words.filter(w => 
        w.text.toLowerCase().includes(searchText.toLowerCase()) ||
        w.meaning.includes(searchText)
      )
    : selectedUnit 
      ? words.filter(w => w.unit === selectedUnit)
      : words
    
  const currentWord = selectedWord || filteredWords[currentIndex]

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      const next = currentIndex + 1
      setCurrentIndex(next)
      setSelectedWord(filteredWords[next])
    }
  }
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1
      setCurrentIndex(prev)
      setSelectedWord(filteredWords[prev])
    }
  }
  
  const handleLearned = () => {
    if (currentWord) {
      learnWord(currentWord.id)
      playCorrect()
    }
    handleNext()
  }

  const handleGradeChange = (newGrade: Grade | typeof ALL_GRADE) => {
    if (newGrade === ALL_GRADE) {
      setShowAll(true)
      setCurrentIndex(0)
      setSelectedUnit(null)
      setSelectedWord(null)
      setSearchText('')
      return
    }
    setShowAll(false)
    setGrade(newGrade)
    setCurrentGrade(newGrade)
    setCurrentIndex(0)
    setSelectedUnit(null)
    setSelectedWord(null)
    setSearchText('')
  }

  const openWord = (word: Word, index: number) => {
    setSelectedWord(word)
    setCurrentIndex(index)
  }

  const closeDetail = () => {
    setSelectedWord(null)
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-xl text-gray-600">暂无单词数据</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-xl">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <FloatingEmojis count={8} />
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" onClick={playClick} className="text-orange-600 hover:text-orange-700 font-medium">
            ← 首页
          </Link>
          <div className="text-gray-600 font-medium text-sm">
            共 {filteredWords.length} 个单词
          </div>
        </div>

        {/* Grade Selector */}
        <div className="mb-4 flex items-center gap-2">
          <GradeSelector value={(grade as Grade) || Grade.ONE} onChange={(g) => handleGradeChange(g)} compact />
          <button
            onClick={() => handleGradeChange(ALL_GRADE)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
              showAll
                ? 'bg-gradient-to-r from-orange-500 to-cyan-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-orange-50 shadow-sm border border-gray-200'
            }`}
          >
            📚 全部年级
          </button>
        </div>

        {/* Search + Unit Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={e => { setSearchText(e.target.value); setSelectedWord(null); setCurrentIndex(0) }}
              placeholder="搜索单词或中文含义..."
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          {!searchText && units.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { setSelectedUnit(null); setCurrentIndex(0); setSelectedWord(null) }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedUnit === null
                    ? 'bg-orange-500 text-white shadow'
                    : 'bg-white text-gray-600 hover:bg-orange-50 shadow-sm'
                }`}
              >
                全部
              </button>
              {units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => { setSelectedUnit(unit); setCurrentIndex(0); setSelectedWord(null) }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedUnit === unit
                      ? 'bg-orange-500 text-white shadow'
                      : 'bg-white text-gray-600 hover:bg-orange-50 shadow-sm'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Word Grid / Detail Toggle */}
        {selectedWord ? (
          // === Detail Card View ===
          <div>
            <button
              onClick={closeDetail}
              className="mb-3 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <Minus size={14} /> 收起详情，查看列表
            </button>
            
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-orange-100 to-cyan-100 p-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-6xl">{getWordEmoji(currentWord.text)}</span>
                  <h1 className="text-5xl font-bold text-gray-800">{currentWord.text}</h1>
                  <AudioPlayer text={currentWord.text} size="lg" />
                </div>
                <p className="text-2xl text-gray-600 text-center mb-4">{currentWord.phonetic}</p>
                <div className="text-center mb-6">
                  <div className="inline-block px-6 py-3 bg-white rounded-2xl shadow-md">
                    <p className="text-2xl font-bold text-gray-800">{currentWord.meaning}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <WordBreakdown word={currentWord.text} />
                <div className="bg-cyan-50 rounded-2xl p-5 mb-4">
                  <div className="flex items-start gap-4">
                    <AudioPlayer text={currentWord.example} size="sm" variant="secondary" />
                    <div>
                      <p className="text-lg text-gray-800 mb-2">{currentWord.example}</p>
                      <p className="text-gray-600">{currentWord.exampleMeaning}</p>
                    </div>
                  </div>
                </div>
                {currentWord.memoryTips && currentWord.memoryTips.length > 0 && (
                  <div className="bg-yellow-50 rounded-2xl p-5 mb-4">
                    <h3 className="font-bold text-gray-800 mb-3">💡 记忆技巧</h3>
                    {currentWord.memoryTips.map((tip, i) => (
                      <p key={i} className="text-gray-700 mb-2">· {tip.content}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} /> 上一个
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
                下一个 <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          // === Grid View ===
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
            {filteredWords.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                没有找到匹配的单词
              </div>
            )}
            {filteredWords.map((word, index) => {
              const emoji = getWordEmoji(word.text)
              return (
              <button
                key={word.id}
                onClick={() => openWord(word, index)}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 text-left w-full group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-lg font-extrabold text-gray-800 group-hover:text-orange-600 transition-colors block truncate">
                      {word.text}
                    </span>
                    <WordBreakdown word={word.text} compact />
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 rounded text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    详情
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1.5 line-clamp-1">{word.meaning}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" 
                      style={{ width: `${progress.wordsLearned?.includes(word.id) ? 100 : 0}%` }} 
                    />
                  </div>
                  <AudioPlayer text={word.text} size="sm" />
                </div>
              </button>
            )})}
          </div>
        )}

        {/* Progress Bar */}
        {!selectedWord && (
          <div className="mt-6">
            <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ 
                  width: `${((progress.wordsLearned?.filter((id: string) => 
                    filteredWords.some(w => w.id === id)
                  ).length || 0) / Math.max(filteredWords.length, 1)) * 100}%` 
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              已学会 {progress.wordsLearned?.length || 0} 个单词
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
