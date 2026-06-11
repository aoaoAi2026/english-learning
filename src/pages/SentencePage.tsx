import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { Grade, GradeNames } from '@/types'
import { getSentencesByGrade } from '@/data/sentences'
import { useUserStore } from '@/stores/userStore'

export function SentencePage() {
  const { gradeId } = useParams()
  const grade = parseInt(gradeId || '1') as Grade
  const sentences = getSentencesByGrade(grade)
  const { addWrongQuestion } = useUserStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentSentence = sentences[currentIndex]

  const handleSelect = (option: string) => {
    if (isAnswered) return

    setSelectedAnswer(option)
    setIsAnswered(true)

    const answer = currentSentence.blanks?.[0]?.answer || ''
    const correct = option === answer
    setIsCorrect(correct)

    if (!correct) {
      addWrongQuestion(currentSentence.id)
    }
  }

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  if (!currentSentence || sentences.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl text-gray-600 mb-4">
            {GradeNames[grade]}暂无句子练习数据
          </p>
          <Link
            to={`/grade/${grade}`}
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            ← 返回年级主页
          </Link>
        </div>
      </div>
    )
  }

  const options = currentSentence.words || []
  const correctAnswer = currentSentence.blanks?.[0]?.answer || ''
  const sentenceParts = currentSentence.text.split('____')

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-800'
    }
    if (option === correctAnswer) {
      return 'bg-green-50 border-green-400 text-green-800'
    }
    if (option === selectedAnswer && option !== correctAnswer) {
      return 'bg-red-50 border-red-400 text-red-800'
    }
    return 'bg-gray-50 border-gray-200 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/grade/${grade}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← 返回
          </Link>
          <div className="text-gray-600 font-medium">
            {currentIndex + 1} / {sentences.length}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Unit & Difficulty Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {currentSentence.unit && (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              {currentSentence.unit}
            </span>
          )}
          {currentSentence.difficulty && (
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
              {'⭐'.repeat(currentSentence.difficulty)}
            </span>
          )}
        </div>

        {/* Sentence Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-orange-100 to-cyan-100 p-8">
            {/* Sentence with Audio */}
            <div className="flex items-start justify-center gap-4 mb-6">
              <AudioPlayer text={currentSentence.text} size="lg" />
              <div className="flex-1">
                <div className="flex items-center justify-center gap-1 flex-wrap text-2xl md:text-3xl font-bold text-gray-800 text-center">
                  {sentenceParts.map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < sentenceParts.length - 1 && (
                        <span className="inline-block mx-1 px-3 py-1 bg-orange-500 text-white rounded-xl min-w-[4rem]">
                          {isAnswered ? correctAnswer : '?'}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-lg text-gray-600 text-center mt-4">
                  {currentSentence.meaning}
                </p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
              选择正确答案
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {options.map((option, index) => (
                <button
                  key={option + index}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all duration-200 ${getOptionStyle(
                    option
                  )}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{option}</span>
                    {isAnswered && option === correctAnswer && (
                      <CheckCircle size={20} className="text-green-500" />
                    )}
                    {isAnswered && option === selectedAnswer && option !== correctAnswer && (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {isAnswered && (
              <div
                className={`mt-6 p-5 rounded-2xl ${
                  isCorrect
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle size={24} className="text-green-500 mt-0.5" />
                  ) : (
                    <XCircle size={24} className="text-red-500 mt-0.5" />
                  )}
                  <div>
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {isCorrect ? '回答正确！' : '回答错误'}
                    </h3>
                    {currentSentence.explanation && (
                      <p className="text-gray-700">
                        <span className="font-medium">解析：</span>
                        {currentSentence.explanation}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="text-gray-700 mt-1">
                        <span className="font-medium">正确答案：</span>
                        {correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
          >
            <ChevronLeft size={20} />
            上一句
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === sentences.length - 1}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一句
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {GradeNames[grade]} · 共 {sentences.length} 个句子
          </p>
        </div>
      </div>
    </div>
  )
}
