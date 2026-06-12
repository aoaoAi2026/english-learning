import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { GradeSelector } from '@/components/ui/GradeSelector'
import { Grade, GradeNames } from '@/types'
import { getDialoguesByGrade } from '@/data/sentences'
import { useUserStore } from '@/stores/userStore'
import { playCorrect, playWrong, playClick } from '@/utils/sounds'

export function DialoguePage() {
  const { addWrongQuestion, progress, setCurrentGrade } = useUserStore()
  const [grade, setGrade] = useState<Grade>(progress.currentGrade || Grade.ONE)
  const dialogues = getDialoguesByGrade(grade)

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentDialogue = dialogues[currentDialogueIndex]
  const currentBlank = currentDialogue?.blanks?.[currentBlankIndex]

  const handleSelect = (option: string) => {
    if (isAnswered || !currentBlank) return

    setSelectedAnswer(option)
    setIsAnswered(true)

    const correct = option === currentBlank.answer
    setIsCorrect(correct)

    if (!correct) {
      addWrongQuestion(currentDialogue.id)
      playWrong()
    } else {
      playCorrect()
    }
  }

  const handleNext = () => {
    if (!currentDialogue) return

    // 如果还有下一个空白，切换到下一个空白
    if (currentBlankIndex < currentDialogue.blanks.length - 1) {
      setCurrentBlankIndex(currentBlankIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      return
    }

    // 否则切换到下一个对话
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1)
      setCurrentBlankIndex(0)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  const handlePrev = () => {
    // 如果当前不是第一个空白，回到上一个空白
    if (currentBlankIndex > 0) {
      setCurrentBlankIndex(currentBlankIndex - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      return
    }

    // 否则回到上一个对话的最后一个空白
    if (currentDialogueIndex > 0) {
      const prevDialogue = dialogues[currentDialogueIndex - 1]
      setCurrentDialogueIndex(currentDialogueIndex - 1)
      setCurrentBlankIndex(prevDialogue.blanks.length - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  if (!currentDialogue || dialogues.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-xl text-gray-600 mb-4">
            {GradeNames[grade]}暂无情景对话数据
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    )
  }

  // 渲染带空白的对话行
  const renderLine = (line: { speaker: 'A' | 'B'; text: string; meaning: string }, lineIdx: number) => {
    const lineHasBlank = currentBlank && currentBlank.lineIndex === lineIdx

    if (!lineHasBlank || !currentBlank) {
      return (
        <div
          className={`p-4 rounded-2xl mb-3 ${
            line.speaker === 'A'
              ? 'bg-orange-50 border-l-4 border-orange-400 ml-0 mr-8'
              : 'bg-cyan-50 border-r-4 border-cyan-400 mr-0 ml-8'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                line.speaker === 'A' ? 'bg-orange-500' : 'bg-cyan-500'
              }`}
            >
              {line.speaker}
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800">{line.text}</p>
              <p className="text-sm text-gray-500 mt-1">{line.meaning}</p>
            </div>
          </div>
        </div>
      )
    }

    // 将句子中的答案替换为空白显示
    const answer = currentBlank.answer
    const words = line.text.split(' ')
    let blankWordIdx = -1
    let foundCount = 0

    // 查找答案词在句子中的位置（简单匹配）
    for (let i = 0; i < words.length; i++) {
      const cleanWord = words[i].toLowerCase().replace(/[^a-z]/g, '')
      if (cleanWord.includes(answer.toLowerCase()) || answer.toLowerCase().includes(cleanWord)) {
        if (foundCount === currentBlank.blankIndex % words.length) {
          blankWordIdx = i
          break
        }
        foundCount++
      }
    }

    // 如果没找到精确匹配，用 blankIndex 作为索引
    if (blankWordIdx === -1) {
      blankWordIdx = currentBlank.blankIndex < words.length ? currentBlank.blankIndex : 0
    }

    const displayText = words.map((word, i) => {
      if (i === blankWordIdx) {
        return (
          <span
            key={i}
            className={`inline-block px-2 py-0.5 mx-1 rounded-lg font-bold ${
              isAnswered
                ? selectedAnswer === answer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-400 text-white'
                : 'bg-orange-500 text-white'
            }`}
          >
            {isAnswered ? answer : '____'}
          </span>
        )
      }
      return <span key={i}>{word}</span>
    })

    // 合成完整句子的发音文本（不带空白）
    const fullAudioText = line.text

    return (
      <div
        className={`p-4 rounded-2xl mb-3 border-2 ${
          line.speaker === 'A'
            ? 'bg-orange-50 border-orange-300 ml-0 mr-8'
            : 'bg-cyan-50 border-cyan-300 mr-0 ml-8'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              line.speaker === 'A' ? 'bg-orange-500' : 'bg-cyan-500'
            }`}
          >
            {line.speaker}
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <AudioPlayer text={fullAudioText} size="sm" variant="secondary" />
              <p className="text-lg font-medium text-gray-800 leading-relaxed">
                {displayText.reduce<JSX.Element[]>((acc, curr, i) => {
                  if (i > 0) acc.push(<span key={`sp-${i}`}> </span>)
                  acc.push(curr)
                  return acc
                }, [])}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-1">{line.meaning}</p>
          </div>
        </div>
      </div>
    )
  }

  const options = currentBlank?.options || []
  const correctAnswer = currentBlank?.answer || ''

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return 'bg-white border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 text-gray-800'
    }
    if (option === correctAnswer) {
      return 'bg-green-50 border-green-400 text-green-800'
    }
    if (option === selectedAnswer && option !== correctAnswer) {
      return 'bg-red-50 border-red-400 text-red-800'
    }
    return 'bg-gray-50 border-gray-200 text-gray-400'
  }

  const isLastItem =
    currentDialogueIndex === dialogues.length - 1 &&
    currentBlankIndex === currentDialogue.blanks.length - 1
  const isFirstItem = currentDialogueIndex === 0 && currentBlankIndex === 0

  // 计算总进度
  let totalBlanks = 0
  for (let i = 0; i < currentDialogueIndex; i++) {
    totalBlanks += dialogues[i].blanks.length
  }
  totalBlanks += currentBlankIndex + 1
  const totalAllBlanks = dialogues.reduce((sum, d) => sum + d.blanks.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" onClick={playClick} className="text-cyan-600 hover:text-cyan-700 font-medium">← 首页</Link>
          <div className="text-gray-600 font-medium">
            对话 {currentDialogueIndex + 1} / {dialogues.length} · 填空{' '}
            {currentBlankIndex + 1} / {currentDialogue.blanks.length}
          </div>
        </div>

        {/* Grade Selector */}
        <div className="mb-4">
          <GradeSelector value={grade} onChange={(g) => { setGrade(g); setCurrentGrade(g); setCurrentDialogueIndex(0); setCurrentBlankIndex(0) }} compact />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(totalBlanks / totalAllBlanks) * 100}%` }}
            />
          </div>
        </div>

        {/* Dialogue Title Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          {/* Dialogue Header */}
          <div className="bg-gradient-to-br from-cyan-100 to-orange-100 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              {currentDialogue.unit && (
                <span className="px-3 py-1 bg-white text-cyan-700 rounded-full text-sm font-medium shadow-sm">
                  {currentDialogue.unit}
                </span>
              )}
              {currentDialogue.difficulty && (
                <span className="px-3 py-1 bg-white text-orange-700 rounded-full text-sm font-medium shadow-sm">
                  {'⭐'.repeat(currentDialogue.difficulty)}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {currentDialogue.title}
            </h1>
            <p className="text-gray-600">{currentDialogue.meaning}</p>
          </div>

          {/* Dialogue Lines */}
          <div className="p-6">
            {currentDialogue.lines.map((line, idx) => (
              <div key={idx}>{renderLine(line, idx)}</div>
            ))}
          </div>
        </div>

        {/* Question Section */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
              选择正确的单词填入空格
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
                    {!isCorrect && (
                      <p className="text-gray-700">
                        <span className="font-medium">正确答案：</span>
                        <span className="font-bold text-green-700">{correctAnswer}</span>
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
            disabled={isFirstItem}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
          >
            <ChevronLeft size={20} />
            上一题
          </button>

          <button
            onClick={handleNext}
            disabled={isLastItem}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一题
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {GradeNames[grade]} · 共 {dialogues.length} 个对话 · {totalAllBlanks} 个填空
          </p>
        </div>
      </div>
    </div>
  )
}
