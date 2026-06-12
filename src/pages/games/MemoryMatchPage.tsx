import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Timer } from 'lucide-react'
import { Grade, GradeNames } from '@/types'
import { getWordsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'

interface Card {
  id: number
  pairId: number
  content: string
  type: 'en' | 'zh'
  flipped: boolean
  matched: boolean
}

const EMOJIS = ['🌟', '🎉', '🎊', '💫', '✨', '🏆', '👏', '🥳', '🎯', '💖', '🌈', '⭐']

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function MemoryMatchPage() {
  const { progress } = useUserStore()
  const grade = progress.currentGrade || Grade.ONE
  const words = getWordsByGrade(grade)

  const learnedWords = words.filter(w => progress.wordsLearned.includes(w.id))
  const gameWords = learnedWords.length >= 6
    ? shuffleArray(learnedWords).slice(0, 8)
    : shuffleArray(words).slice(0, 8)

  const generateCards = useCallback((): Card[] => {
    const pairs = gameWords.map((w, i) => [
      { pairId: i, content: w.text, type: 'en' as const },
      { pairId: i, content: w.meaning, type: 'zh' as const },
    ]).flat()
    return shuffleArray(pairs).map((p, idx) => ({
      ...p,
      id: idx,
      flipped: false,
      matched: false,
    }))
  }, [])

  const [cards, setCards] = useState<Card[]>(generateCards)
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lockRef = useRef(false)

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(t => t + 1)
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [gameStarted, gameComplete])

  useEffect(() => {
    if (matchedPairs === gameWords.length && matchedPairs > 0) {
      if (timerRef.current) clearInterval(timerRef.current)
      setGameComplete(true)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [matchedPairs, gameWords.length])

  const handleCardClick = (cardId: number) => {
    if (lockRef.current) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return
    if (!gameStarted) setGameStarted(true)

    const newFlipped = [...flippedIds, cardId]
    setFlippedIds(newFlipped)
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c))
    playFlipSound()

    if (newFlipped.length === 2) {
      lockRef.current = true
      setMoves(m => m + 1)
      const [id1, id2] = newFlipped
      const card1 = cards.find(c => c.id === id1)!
      const card2 = cards.find(c => c.id === id2)!

      if (card1.pairId === card2.pairId) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === id1 || c.id === id2) ? { ...c, matched: true } : c
          ))
          setFlippedIds([])
          setMatchedPairs(m => m + 1)
          lockRef.current = false
          spawnEmojis()
          playCorrectSound()
        }, 400)
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === id1 || c.id === id2) ? { ...c, flipped: false } : c
          ))
          setFlippedIds([])
          lockRef.current = false
          playWrongSound()
        }, 800)
      }
    }
  }

  const spawnEmojis = () => {
    const newEmojis = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 60 + 20,
      y: Math.random() * 40 + 20,
    }))
    setFloatingEmojis(prev => [...prev, ...newEmojis])
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => !newEmojis.find(n => n.id === e.id)))
    }, 1500)
  }

  const restartGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setCards(generateCards())
    setFlippedIds([])
    setMoves(0)
    setMatchedPairs(0)
    setShowCelebration(false)
    setElapsedTime(0)
    setGameStarted(false)
    setGameComplete(false)
    setFloatingEmojis([])
    lockRef.current = false
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const stars = moves <= gameWords.length + 2 ? 3 : moves <= gameWords.length * 2 ? 2 : 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 记忆翻牌
          </h1>
          <p className="text-gray-500">找到英文单词和中文意思的配对</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2">
            <span className="text-xl">👆</span>
            <div>
              <div className="text-xs text-gray-400">步数</div>
              <div className="text-xl font-bold text-purple-600">{moves}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2">
            <Timer size={20} className="text-orange-500" />
            <div>
              <div className="text-xs text-gray-400">用时</div>
              <div className="text-xl font-bold text-orange-600">{formatTime(elapsedTime)}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2">
            <span className="text-xl">✅</span>
            <div>
              <div className="text-xs text-gray-400">配对</div>
              <div className="text-xl font-bold text-green-600">{matchedPairs}/{gameWords.length}</div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map(card => {
            const isEn = card.type === 'en'
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.matched}
                className={`
                  relative aspect-[3/4] rounded-2xl text-center font-bold transition-all duration-300
                  flex items-center justify-center p-2
                  ${card.matched
                    ? 'bg-green-100 border-2 border-green-300 scale-95 cursor-default opacity-80'
                    : card.flipped
                      ? 'bg-white border-2 border-purple-300 shadow-lg scale-105'
                      : 'bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-purple-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer active:scale-95'
                  }
                `}
              >
                {!card.flipped && !card.matched && (
                  <span className="text-3xl">❓</span>
                )}
                {(card.flipped || card.matched) && (
                  <span className={`
                    ${isEn ? 'text-base md:text-lg text-purple-700' : 'text-sm md:text-base text-gray-700'}
                    ${card.matched ? 'text-green-500' : ''}
                  `}>
                    {card.content}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Game Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">太棒了！</h2>
              <p className="text-gray-500 mb-4">你完成了所有配对！</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3].map(i => (
                  <span key={i} className={`text-4xl ${i <= stars ? 'opacity-100 animate-float' : 'opacity-30'}`} style={{ animationDelay: `${i * 0.2}s` }}>
                    ⭐
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                <div className="bg-purple-50 rounded-xl p-3">
                  <div className="text-xs text-purple-500">步数</div>
                  <div className="text-lg font-bold text-purple-700">{moves}</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3">
                  <div className="text-xs text-orange-500">用时</div>
                  <div className="text-lg font-bold text-orange-700">{formatTime(elapsedTime)}</div>
                </div>
              </div>
              <button
                onClick={restartGame}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
              >
                🔄 再玩一次
              </button>
            </div>
          </div>
        )}

        {/* Floating emojis */}
        {floatingEmojis.map(e => (
          <div
            key={e.id}
            className="fixed pointer-events-none z-40 text-3xl animate-float-up"
            style={{ left: `${e.x}%`, top: `${e.y}%`, animationDuration: '1.5s' }}
          >
            {e.emoji}
          </div>
        ))}

        {/* Tip */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center text-sm text-gray-500">
          💡 提示：翻开卡片，找到英文单词和它对应的中文意思！
        </div>
      </div>
    </div>
  )
}

function playFlipSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 600; g.gain.value = 0.1; o.start(); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1); o.stop(ctx.currentTime + 0.1) } catch {}
}
function playCorrectSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [523, 659, 784].forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sine'; o.frequency.value = freq; g.gain.value = 0.15; o.start(ctx.currentTime + i * 0.12); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3); o.stop(ctx.currentTime + i * 0.12 + 0.3) }) } catch {}
}
function playWrongSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'square'; o.frequency.value = 200; g.gain.value = 0.1; o.start(); o.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2); o.stop(ctx.currentTime + 0.2) } catch {}
}
