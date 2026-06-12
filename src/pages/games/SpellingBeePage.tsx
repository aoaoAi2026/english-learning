import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Volume2, SkipForward } from 'lucide-react'
import { Grade } from '@/types'
import { getWordsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'
import { speechService } from '@/services/speech'

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SpellingBeePage() {
  const grade = useUserStore(s => s.progress.currentGrade) || Grade.ONE
  const allWords = getWordsByGrade(grade)

  const [wordQueue, setWordQueue] = useState<typeof allWords>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null)
  const [shakeWord, setShakeWord] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const confettiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pool = shuffleArray(allWords).slice(0, 10)
    setWordQueue(pool)
  }, [allWords])

  const currentWord = wordQueue[currentIndex]
  const totalLetters = currentWord ? currentWord.text.split('') : []
  const maxAttempts = Math.max(3, totalLetters.length)

  const playWord = useCallback(() => {
    if (currentWord) {
      speechService.speakWord(currentWord.text, 0.7)
    }
  }, [currentWord])

  useEffect(() => {
    if (currentWord && currentIndex === 0) {
      setTimeout(() => playWord(), 500)
    }
  }, [currentWord, currentIndex, playWord])

  const handleLetterInput = (letter: string) => {
    if (showResult) return
    setSelectedLetters(prev => {
      const next = [...prev, letter]
      const target = currentWord?.text.toLowerCase() || ''
      const joined = next.join('')

      if (joined.length >= target.length) {
        // Check answer
        if (joined === target) {
          handleCorrect()
        } else {
          handleWrong(next)
        }
        return []
      }

      // Check if partial match
      if (!target.startsWith(joined)) {
        handleWrong(next)
        return []
      }

      return next
    })
    inputRef.current?.focus()
  }

  const handleCorrect = () => {
    setShowResult('correct')
    setScore(s => s + 10 + combo * 5)
    setCombo(c => c + 1)
    playCorrectSound()
    spawnConfetti()
    setTimeout(() => nextWord(), 1500)
  }

  const handleWrong = (letters?: string[]) => {
    setShowResult('wrong')
    setShakeWord(true)
    setAttempts(a => {
      const next = a + 1
      if (next >= maxAttempts) {
        setTimeout(() => {
          setCombo(0)
          setSelectedLetters([])
          setTimeout(() => nextWord(), 600)
        }, 1200)
      } else {
        setTimeout(() => {
          setShowResult(null)
          setSelectedLetters([])
          setShakeWord(false)
        }, 800)
      }
      return next
    })
    playWrongSound()
  }

  const nextWord = () => {
    if (currentIndex + 1 >= wordQueue.length) {
      setGameComplete(true)
    } else {
      setCurrentIndex(i => i + 1)
      setAttempts(0)
      setShowResult(null)
      setShakeWord(false)
      setHintUsed(false)
      setSelectedLetters([])
      setTimeout(() => playWord(), 400)
    }
  }

  const skipWord = () => {
    setScore(s => Math.max(0, s - 3))
    setCombo(0)
    nextWord()
  }

  const showHint = () => {
    setHintUsed(true)
    setScore(s => Math.max(0, s - 5))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showResult) return
    if (/^[a-zA-Z]$/.test(e.key)) {
      handleLetterInput(e.key.toLowerCase())
    }
    if (e.key === 'Backspace') {
      setSelectedLetters(prev => prev.slice(0, -1))
    }
  }

  const restartGame = () => {
    const pool = shuffleArray(allWords).slice(0, 10)
    setWordQueue(pool)
    setCurrentIndex(0)
    setAttempts(0)
    setScore(0)
    setCombo(0)
    setShowResult(null)
    setShakeWord(false)
    setGameComplete(false)
    setHintUsed(false)
    setSelectedLetters([])
    setTimeout(() => playWord(), 500)
  }

  if (!currentWord && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🐝</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="max-w-lg mx-auto px-4 py-6" ref={confettiRef}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/games" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
            <span>返回游戏中心</span>
          </Link>
          <button onClick={restartGame} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-600">
            <RotateCcw size={18} />
            <span>重新开始</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">🐝</div>
          <h1 className="text-3xl font-bold text-gray-800">拼写蜜蜂</h1>
          <p className="text-gray-500 text-sm">听发音，拼出正确的单词</p>
        </div>

        {/* Score & Progress */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm text-center">
            <div className="text-yellow-500 font-bold text-xl">⭐ {score}</div>
            <div className="text-xs text-gray-400">得分</div>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm text-center">
            <div className="text-orange-500 font-bold text-xl">{currentIndex + 1}/{wordQueue.length}</div>
            <div className="text-xs text-gray-400">进度</div>
          </div>
          {combo > 1 && (
            <div className="bg-white rounded-2xl px-5 py-3 shadow-sm text-center animate-pulse-glow">
              <div className="text-pink-500 font-bold text-xl">🔥 x{combo}</div>
              <div className="text-xs text-gray-400">连击</div>
            </div>
          )}
        </div>

        {!gameComplete && (
          <>
            {/* Word Card */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg mb-6 text-center ${shakeWord ? 'animate-shake' : ''}`}>
              {/* Meaning hint */}
              <div className="text-sm text-gray-400 mb-2">这个单词的意思是：</div>
              <div className="text-2xl font-bold text-gray-700 mb-4">{currentWord.meaning}</div>

              {/* Phonetic hint */}
              {hintUsed && (
                <div className="text-sm text-amber-500 mb-3 animate-fade-in">
                  🔔 {currentWord.phonetic}
                </div>
              )}

              {/* Letter display */}
              <div className="flex justify-center gap-2 mb-4 flex-wrap">
                {totalLetters.map((letter, idx) => {
                  const isGuessed = idx < selectedLetters.length
                  const guessed = selectedLetters[idx] || ''
                  const isCorrect = isGuessed && guessed.toLowerCase() === letter.toLowerCase()
                  return (
                    <div
                      key={idx}
                      className={`
                        w-10 h-14 rounded-xl flex items-center justify-center text-xl font-bold
                        border-2 transition-all duration-300
                        ${isGuessed
                          ? isCorrect
                            ? 'bg-green-100 border-green-400 text-green-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                          : 'bg-gray-50 border-gray-200 text-gray-300'
                        }
                      `}
                    >
                      {isGuessed ? guessed.toUpperCase() : '_'}
                    </div>
                  )
                })}
              </div>

              {/* Result feedback */}
              {showResult === 'correct' && (
                <div className="text-green-500 font-bold text-lg animate-bounce-in">✅ 太棒了！</div>
              )}
              {showResult === 'wrong' && (
                <div className="text-red-500 text-sm animate-fade-in">
                  还剩 {maxAttempts - attempts} 次尝试
                </div>
              )}

              {/* Play audio button */}
              <button
                onClick={playWord}
                className="mt-4 px-6 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors inline-flex items-center gap-2"
              >
                <Volume2 size={18} />
                再听一遍 🔊
              </button>
            </div>

            {/* Virtual Keyboard */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-sm mb-4">
              {KEYBOARD_ROWS.map((row, ri) => (
                <div key={ri} className="flex justify-center gap-1.5 mb-1.5">
                  {row.map(letter => {
                    const used = selectedLetters.includes(letter)
                    return (
                      <button
                        key={letter}
                        onClick={() => handleLetterInput(letter)}
                        disabled={showResult !== null || used}
                        className={`
                          w-9 h-12 rounded-xl font-bold text-lg transition-all
                          ${used
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50 active:scale-90 shadow-sm'
                          }
                        `}
                      >
                        {letter.toUpperCase()}
                      </button>
                    )
                  })}
                </div>
              ))}
              {/* Delete key */}
              <div className="flex justify-center gap-1.5 mt-1.5">
                <button
                  onClick={() => setSelectedLetters(prev => prev.slice(0, -1))}
                  disabled={selectedLetters.length === 0 || showResult !== null}
                  className="px-6 py-2 rounded-xl font-bold text-sm bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 active:scale-90 transition-all disabled:opacity-30"
                >
                  ⌫ 删除
                </button>
                <button
                  onClick={skipWord}
                  disabled={showResult !== null}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 active:scale-90 transition-all"
                >
                  <SkipForward size={16} />
                </button>
              </div>
            </div>

            {/* Hint button */}
            <div className="text-center">
              {!hintUsed && (
                <button
                  onClick={showHint}
                  className="text-sm text-amber-500 hover:text-amber-600 underline transition-colors"
                >
                  💡 显示音标提示 (-5分)
                </button>
              )}
            </div>

            {/* Hidden input for physical keyboard */}
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              className="absolute opacity-0 w-0 h-0"
              autoFocus
            />
          </>
        )}

        {/* Game Complete */}
        {gameComplete && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center animate-bounce-in">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">游戏结束！</h2>
            <div className="text-4xl font-bold text-yellow-500 mb-2">⭐ {score}</div>
            <p className="text-gray-500 mb-2">总分</p>
            <div className="flex justify-center gap-2 my-4">
              {score >= 100 && <span className="text-3xl">🥇</span>}
              {score >= 60 && score < 100 && <span className="text-3xl">🥈</span>}
              {score < 60 && <span className="text-3xl">🥉</span>}
              <span className="text-2xl">
                {score >= 120 ? '完美拼写王！' : score >= 80 ? '拼写小能手！' : '继续加油哦！'}
              </span>
            </div>
            <button
              onClick={restartGame}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
            >
              🔄 再来一轮
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function playCorrectSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [523, 659, 784, 1047].forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sine'; o.frequency.value = freq; g.gain.value = 0.12; o.start(ctx.currentTime + i * 0.1); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3); o.stop(ctx.currentTime + i * 0.1 + 0.3) }) } catch {}
}
function playWrongSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'square'; o.frequency.value = 180; g.gain.value = 0.08; o.start(); o.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.3); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); o.stop(ctx.currentTime + 0.3) } catch {}
}
function spawnConfetti() {} // Placeholder - visual feedback via CSS classes
