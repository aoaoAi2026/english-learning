import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Volume2, SkipForward, Lightbulb, Timer } from 'lucide-react'
import { Grade } from '@/types'
import { getWordsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'
import { speechService } from '@/services/speech'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function scrambleWord(word: string): string[] {
  const letters = word.split('')
  let scrambled = shuffleArray(letters)
  // Make sure it's actually scrambled
  if (scrambled.join('') === word && word.length > 2) {
    [scrambled[0], scrambled[1]] = [scrambled[1], scrambled[0]]
  }
  return scrambled
}

export function WordScramblePage() {
  const grade = useUserStore(s => s.progress.currentGrade) || Grade.ONE
  const allWords = getWordsByGrade(grade)

  const [wordQueue, setWordQueue] = useState<typeof allWords>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrambled, setScrambled] = useState<string[]>([])
  const [userAnswer, setUserAnswer] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null)
  const [shakeLetters, setShakeLetters] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showLetterHint, setShowLetterHint] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const pool = shuffleArray(allWords.filter(w => w.text.length >= 3 && w.text.length <= 8)).slice(0, 12)
    setWordQueue(pool)
  }, [allWords])

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      timerRef.current = setInterval(() => setElapsedTime(t => t + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [gameStarted, gameComplete])

  useEffect(() => {
    if (wordQueue.length > 0 && currentIndex < wordQueue.length) {
      const word = wordQueue[currentIndex]
      setScrambled(scrambleWord(word.text))
      setUserAnswer([])
      setShowResult(null)
      setShowLetterHint(false)
    }
  }, [wordQueue, currentIndex])

  const currentWord = wordQueue[currentIndex]

  const selectLetter = (index: number) => {
    if (showResult || !gameStarted) return
    if (!gameStarted) setGameStarted(true)
    setUserAnswer(prev => [...prev, scrambled[index]])
    setScrambled(prev => prev.filter((_, i) => i !== index))
  }

  const deselectLetter = (index: number) => {
    if (showResult) return
    setScrambled(prev => [...prev, userAnswer[index]])
    setUserAnswer(prev => prev.filter((_, i) => i !== index))
  }

  const clearAnswer = () => {
    if (showResult) return
    setScrambled(prev => [...prev, ...userAnswer])
    setUserAnswer([])
  }

  const checkAnswer = useCallback(() => {
    if (!currentWord || userAnswer.length === 0) return
    const answer = userAnswer.join('').toLowerCase()
    const correct = currentWord.text.toLowerCase()

    if (answer === correct) {
      setShowResult('correct')
      const bonus = hintsUsed === 0 ? 15 : 10
      setScore(s => s + bonus + combo * 3)
      setCombo(c => c + 1)
      playCorrectSound()
      setTimeout(() => nextWord(), 1500)
    } else if (userAnswer.length >= correct.length) {
      setShowResult('wrong')
      setShakeLetters(true)
      setCombo(0)
      playWrongSound()
      setTimeout(() => {
        setShakeLetters(false)
        setShowResult(null)
        // Return letters to scrambled area
        setScrambled(prev => [...prev, ...userAnswer])
        setUserAnswer([])
      }, 1000)
    }
  }, [userAnswer, currentWord, combo, hintsUsed])

  useEffect(() => {
    if (currentWord && userAnswer.length === currentWord.text.length) {
      checkAnswer()
    }
  }, [userAnswer.length, currentWord, checkAnswer])

  const nextWord = () => {
    if (currentIndex + 1 >= wordQueue.length) {
      setGameComplete(true)
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      setCurrentIndex(i => i + 1)
      setHintsUsed(0)
      setShowLetterHint(false)
    }
  }

  const skipWord = () => {
    setScore(s => Math.max(0, s - 5))
    setCombo(0)
    nextWord()
  }

  const showHint = () => {
    setHintsUsed(h => h + 1)
    setShowLetterHint(true)
    setScore(s => Math.max(0, s - 3))
  }

  const playAudio = () => {
    if (currentWord) speechService.speakWord(currentWord.text, 0.7)
  }

  const restartGame = () => {
    const pool = shuffleArray(allWords.filter(w => w.text.length >= 3 && w.text.length <= 8)).slice(0, 12)
    setWordQueue(pool)
    setCurrentIndex(0)
    setScore(0)
    setCombo(0)
    setShowResult(null)
    setShakeLetters(false)
    setGameComplete(false)
    setHintsUsed(0)
    setShowLetterHint(false)
    setElapsedTime(0)
    setGameStarted(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (!currentWord && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🔤</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <div className="max-w-lg mx-auto px-4 py-6">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔤 字母消消乐
          </h1>
          <p className="text-gray-500 text-sm">把打乱的字母重新排列成正确的单词</p>
        </div>

        {/* Score & Progress */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm text-center">
            <div className="text-indigo-500 font-bold text-xl">⭐ {score}</div>
            <div className="text-xs text-gray-400">得分</div>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm text-center">
            <div className="text-violet-500 font-bold text-xl">{currentIndex + 1}/{wordQueue.length}</div>
            <div className="text-xs text-gray-400">进度</div>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2">
            <Timer size={16} className="text-blue-500" />
            <div className="text-blue-500 font-bold text-xl">{formatTime(elapsedTime)}</div>
          </div>
        </div>

        {!gameComplete && (
          <>
            {/* Clue */}
            <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 text-center">
              <div className="text-sm text-gray-400 mb-1">这个单词的意思是：</div>
              <div className="text-2xl font-bold text-gray-700 mb-3">{currentWord.meaning}</div>

              {showLetterHint && (
                <div className="text-sm text-indigo-500 mb-2 animate-fade-in">
                  💡 第一个字母是：<span className="font-bold text-lg">{currentWord.text[0].toUpperCase()}</span>
                </div>
              )}

              {/* Answer area */}
              <div className={`flex justify-center gap-2 mb-4 flex-wrap min-h-[56px] ${shakeLetters ? 'animate-shake' : ''}`}>
                {Array.from({ length: currentWord.text.length }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => userAnswer[idx] ? deselectLetter(idx) : null}
                    className={`
                      w-10 h-14 rounded-xl border-2 flex items-center justify-center
                      text-xl font-bold transition-all duration-200
                      ${userAnswer[idx]
                        ? showResult === 'correct'
                          ? 'bg-green-100 border-green-400 text-green-700 cursor-pointer hover:bg-green-200 scale-110'
                          : showResult === 'wrong'
                            ? 'bg-red-100 border-red-400 text-red-700'
                            : 'bg-indigo-50 border-indigo-300 text-indigo-700 cursor-pointer hover:bg-indigo-100'
                        : 'bg-gray-50 border-dashed border-gray-300'
                      }
                    `}
                  >
                    {userAnswer[idx]?.toUpperCase() || ''}
                  </div>
                ))}
              </div>

              {/* Result */}
              {showResult === 'correct' && (
                <div className="text-green-500 font-bold animate-bounce-in">
                  ✅ 正确！+{hintsUsed === 0 ? 15 : 10}分
                  {combo > 1 && <span className="text-orange-500 ml-2">🔥 x{combo}</span>}
                </div>
              )}
              {showResult === 'wrong' && (
                <div className="text-red-500 text-sm">再试试看！</div>
              )}

              {/* Audio button */}
              <button
                onClick={playAudio}
                className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors inline-flex items-center gap-2"
              >
                <Volume2 size={16} />
                听发音
              </button>
            </div>

            {/* Scrambled letters */}
            <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
              <div className="flex justify-center gap-2 flex-wrap min-h-[56px]">
                {scrambled.map((letter, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectLetter(idx)}
                    disabled={showResult !== null}
                    className="
                      w-12 h-14 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400
                      text-white font-bold text-xl shadow-md
                      hover:shadow-lg hover:scale-110 active:scale-90
                      transition-all duration-200 disabled:opacity-50
                    "
                  >
                    {letter.toUpperCase()}
                  </button>
                ))}
              </div>
              {scrambled.length > 0 && (
                <div className="text-center mt-3">
                  <button
                    onClick={clearAnswer}
                    disabled={userAnswer.length === 0 || showResult !== null}
                    className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    清空重选
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <button
                onClick={showHint}
                disabled={showLetterHint}
                className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <Lightbulb size={16} />
                提示 (-3)
              </button>
              <button
                onClick={skipWord}
                disabled={showResult !== null}
                className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                <SkipForward size={16} />
                跳过 (-5)
              </button>
            </div>
          </>
        )}

        {/* Game Complete */}
        {gameComplete && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center animate-bounce-in">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">游戏结束！</h2>
            <div className="text-4xl font-bold text-indigo-500 mb-1">⭐ {score}</div>
            <p className="text-gray-400 mb-2">总分 · 用时 {formatTime(elapsedTime)}</p>
            <div className="flex justify-center gap-2 my-4">
              {score >= 120 && <span className="text-3xl">🥇</span>}
              {score >= 80 && score < 120 && <span className="text-3xl">🥈</span>}
              {score < 80 && <span className="text-3xl">🥉</span>}
              <span className="text-lg font-medium text-gray-600">
                {score >= 150 ? '你是词汇大师！' : score >= 100 ? '拼词小天才！' : '继续加油哦！'}
              </span>
            </div>
            <button
              onClick={restartGame}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
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
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [523, 659, 784].forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sine'; o.frequency.value = freq; g.gain.value = 0.12; o.start(ctx.currentTime + i * 0.12); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3); o.stop(ctx.currentTime + i * 0.12 + 0.3) }) } catch {}
}
function playWrongSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sawtooth'; o.frequency.value = 150; g.gain.value = 0.06; o.start(); o.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.25); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25); o.stop(ctx.currentTime + 0.25) } catch {}
}
