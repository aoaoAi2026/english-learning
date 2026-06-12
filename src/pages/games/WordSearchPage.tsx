import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Search, Timer } from 'lucide-react'
import { Grade } from '@/types'
import { getWordsByGrade } from '@/data/words'
import { useUserStore } from '@/stores/userStore'

const GRID_SIZE = 10

interface WordPosition {
  word: string
  meaning: string
  row: number
  col: number
  direction: 'h' | 'v' | 'd'
  found: boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function WordSearchPage() {
  const grade = useUserStore(s => s.progress.currentGrade) || Grade.ONE
  const allWords = getWordsByGrade(grade)

  const generatePuzzle = useCallback(() => {
    // Select shorter words that fit the grid
    const candidates = allWords.filter(w => w.text.length >= 3 && w.text.length <= 8)
    const selected = shuffleArray(candidates).slice(0, 8)

    // Create empty grid
    const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => '')
    )

    const directions: ('h' | 'v' | 'd')[] = ['h', 'v', 'd']
    const positions: WordPosition[] = []

    for (const wordObj of selected) {
      const word = wordObj.text.toLowerCase().replace(/[^a-z]/g, '')
      if (!word) continue

      const attempts = shuffleArray(
        Array.from({ length: GRID_SIZE * GRID_SIZE * directions.length }, (_, i) => ({
          row: Math.floor(i / GRID_SIZE) % GRID_SIZE,
          col: Math.floor(i / (GRID_SIZE * directions.length)) % GRID_SIZE,
          dir: directions[i % directions.length],
        }))
      )

      let placed = false
      for (const attempt of attempts) {
        const { row, col, dir } = attempt
        const dr = dir === 'v' ? 1 : dir === 'd' ? 1 : 0
        const dc = dir === 'h' ? 1 : dir === 'd' ? 1 : 0

        if (row + dr * (word.length - 1) >= GRID_SIZE || col + dc * (word.length - 1) >= GRID_SIZE) continue

        let canPlace = true
        for (let i = 0; i < word.length; i++) {
          const r = row + dr * i
          const c = col + dc * i
          if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            canPlace = false
            break
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            grid[row + dr * i][col + dc * i] = word[i]
          }
          positions.push({ word: word.toUpperCase(), meaning: wordObj.meaning, row, col, direction: dir, found: false })
          placed = true
          break
        }
      }

      if (!placed) continue
    }

    // Fill empty cells
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === '') {
          grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
        }
      }
    }

    return { grid, positions }
  }, [allWords])

  const [puzzle, setPuzzle] = useState(generatePuzzle)
  const [wordPositions, setWordPositions] = useState(puzzle.positions)
  const [grid, setGrid] = useState(puzzle.grid)
  const [selection, setSelection] = useState<{ start: [number, number]; end: [number, number] } | null>(null)
  const [foundCount, setFoundCount] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())
  const [mouseDown, setMouseDown] = useState(false)
  const [startCell, setStartCell] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const timer = setInterval(() => setElapsedTime(t => t + 1), 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameComplete])

  useEffect(() => {
    if (foundCount === wordPositions.length && foundCount > 0) {
      setGameComplete(true)
      setMessage('🎉 太厉害了！你找到了所有单词！')
    }
  }, [foundCount, wordPositions.length])

  const handleMouseDown = (row: number, col: number) => {
    if (gameComplete) return
    if (!gameStarted) setGameStarted(true)
    setMouseDown(true)
    setStartCell([row, col])
    setSelectedCells(new Set([`${row},${col}`]))
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseDown || !startCell || gameComplete) return
    const [sr, sc] = startCell
    const cells = new Set<string>()

    // Only allow horizontal, vertical, or diagonal lines
    const dr = row - sr
    const dc = col - sc

    if (dr === 0) {
      // Horizontal
      const minC = Math.min(sc, col)
      const maxC = Math.max(sc, col)
      for (let c = minC; c <= maxC; c++) cells.add(`${sr},${c}`)
    } else if (dc === 0) {
      // Vertical
      const minR = Math.min(sr, row)
      const maxR = Math.max(sr, row)
      for (let r = minR; r <= maxR; r++) cells.add(`${r},${sc}`)
    } else if (Math.abs(dr) === Math.abs(dc)) {
      // Diagonal
      const steps = Math.abs(dr)
      const stepR = dr > 0 ? 1 : -1
      const stepC = dc > 0 ? 1 : -1
      for (let i = 0; i <= steps; i++) cells.add(`${sr + stepR * i},${sc + stepC * i}`)
    }

    setSelectedCells(cells)
  }

  const handleMouseUp = () => {
    if (!mouseDown || !startCell || gameComplete) return
    setMouseDown(false)

    // Check if selection matches any word
    const cells = Array.from(selectedCells).map(s => s.split(',').map(Number) as [number, number])
    if (cells.length < 3) {
      setSelectedCells(new Set())
      setStartCell(null)
      return
    }

    const selectedWord = cells.map(([r, c]) => grid[r][c]).join('')

    for (let i = 0; i < wordPositions.length; i++) {
      const wp = wordPositions[i]
      if (wp.found) continue

      const wordCells: [number, number][] = []
      const dr = wp.direction === 'v' ? 1 : wp.direction === 'd' ? 1 : 0
      const dc = wp.direction === 'h' ? 1 : wp.direction === 'd' ? 1 : 0

      for (let j = 0; j < wp.word.length; j++) {
        wordCells.push([wp.row + dr * j, wp.col + dc * j])
      }

      const wordCellSet = new Set(wordCells.map(([r, c]) => `${r},${c}`))
      const selectedSet = new Set(cells.map(([r, c]) => `${r},${c}`))

      if (wordCellSet.size === selectedSet.size && [...wordCellSet].every(c => selectedSet.has(c))) {
        const updated = [...wordPositions]
        updated[i] = { ...updated[i], found: true }
        setWordPositions(updated)
        setFoundCount(f => f + 1)
        setMessage(`✅ 找到了 "${wp.word}" - ${wp.meaning}`)
        playCorrectSound()
        setTimeout(() => setMessage(''), 2000)
        break
      }
    }

    setTimeout(() => {
      setSelectedCells(new Set())
      setStartCell(null)
    }, 100)
  }

  const restartGame = () => {
    const newPuzzle = generatePuzzle()
    setPuzzle(newPuzzle)
    setWordPositions(newPuzzle.positions)
    setGrid(newPuzzle.grid)
    setFoundCount(0)
    setElapsedTime(0)
    setGameStarted(false)
    setGameComplete(false)
    setMessage('')
    setSelectedCells(new Set())
    setStartCell(null)
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getCellClass = (row: number, col: number) => {
    const key = `${row},${col}`
    const isSelected = selectedCells.has(key)
    const isFound = wordPositions.some(wp => {
      if (!wp.found) return false
      const dr = wp.direction === 'v' ? 1 : wp.direction === 'd' ? 1 : 0
      const dc = wp.direction === 'h' ? 1 : wp.direction === 'd' ? 1 : 0
      for (let i = 0; i < wp.word.length; i++) {
        if (wp.row + dr * i === row && wp.col + dc * i === col) return true
      }
      return false
    })

    if (isFound) return 'bg-green-200 text-green-800 border-green-400'
    if (isSelected) return 'bg-purple-200 text-purple-800 border-purple-400'
    return 'bg-white text-gray-700 border-gray-200 hover:bg-purple-50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔍 单词大搜索
          </h1>
          <p className="text-gray-500 text-sm">在字母网格中找出隐藏的单词</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="bg-white rounded-2xl px-4 py-2 shadow-sm flex items-center gap-2">
            <Timer size={18} className="text-cyan-500" />
            <span className="font-bold text-cyan-600">{formatTime(elapsedTime)}</span>
          </div>
          <div className="bg-white rounded-2xl px-4 py-2 shadow-sm flex items-center gap-2">
            <Search size={18} className="text-emerald-500" />
            <span className="font-bold text-emerald-600">{foundCount}/{wordPositions.length}</span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center mb-3">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium animate-bounce-in inline-block">
              {message}
            </span>
          </div>
        )}

        {/* Grid */}
        <div
          className="grid gap-1 mb-6 select-none mx-auto w-fit"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          onMouseLeave={() => setMouseDown(false)}
        >
          {grid.map((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                className={`
                  w-9 h-9 sm:w-11 sm:h-11 border-2 rounded-lg flex items-center justify-center
                  font-bold text-lg uppercase cursor-pointer transition-all duration-150
                  active:scale-90 ${getCellClass(ri, ci)}
                `}
                onMouseDown={() => handleMouseDown(ri, ci)}
                onMouseEnter={() => handleMouseEnter(ri, ci)}
                onMouseUp={handleMouseUp}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {/* Word List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-3 text-center">📋 要找的单词：</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {wordPositions.map((wp, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  wp.found
                    ? 'bg-green-100 text-green-600 line-through'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {wp.word} <span className="text-xs opacity-60 ml-1">{wp.meaning}</span>
                {wp.found && <span className="ml-1">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Game Complete */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">全部找到！</h2>
              <p className="text-gray-500 mb-4">你真是火眼金睛！</p>
              <div className="bg-emerald-50 rounded-xl p-3 mb-4">
                <div className="text-sm text-emerald-600">用时</div>
                <div className="text-2xl font-bold text-emerald-700">{formatTime(elapsedTime)}</div>
              </div>
              <button
                onClick={restartGame}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
              >
                🔄 再来一局
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-4 bg-white/80 rounded-2xl p-4 text-center text-sm text-gray-500">
          💡 提示：在字母网格中按住鼠标拖动，找出单词（横、竖、斜方向都可以哦！）
        </div>
      </div>
    </div>
  )
}

function playCorrectSound() {
  try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [440, 554, 660].forEach((freq, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type = 'sine'; o.frequency.value = freq; g.gain.value = 0.1; o.start(ctx.currentTime + i * 0.1); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.25); o.stop(ctx.currentTime + i * 0.1 + 0.25) }) } catch {}
}
