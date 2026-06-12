import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Volume2, Lightbulb, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Timer, useTimer } from '@/components/ui/Timer'
import { BigStars } from '@/components/ui/StarRating'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { CorrectPopup } from '@/components/effects/Celebration'
import { Celebration } from '@/components/effects/Celebration'
import { Grade, Question } from '@/types'
import { getLevelById } from '@/data/levels'
import { getQuestionsByGrade } from '@/data/questions'
import { useUserStore } from '@/stores/userStore'
import { speechService } from '@/services/speech'
import { playCorrect, playWrong, playCombo, playLevelUp, playConfetti } from '@/utils/sounds'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type GameState = 'playing' | 'result'

export function LevelPlayPage() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = getLevelById(levelId || '')
  const grade = level?.grade || Grade.ONE
  const allQuestions = getQuestionsByGrade(grade)
  const { completeLevel, addWrongQuestion, updateStudyStreak } = useUserStore()
  const [combo, setCombo] = useState(0)
  const [showCorrect, setShowCorrect] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  
  const [gameState, setGameState] = useState<GameState>('playing')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  
  const timer = useTimer(level?.timeLimit || 120, () => {
    handleFinish()
  })
  
  useEffect(() => {
    if (level) {
      // 随机选择题目
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
      setQuestions(shuffled.slice(0, level.questionCount))
      timer.start()
    }
  }, [level])
  
  const currentQuestion = questions[currentIndex]
  
  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return
    
    setAnswers({ ...answers, [currentQuestion.id]: answer })
    
    const isCorrect = answer === currentQuestion.answer
    if (!isCorrect) {
      addWrongQuestion(currentQuestion.id)
      playWrong()
      setCombo(0)
    } else {
      const newCombo = combo + 1
      setCombo(newCombo)
      if (newCombo >= 3) {
        playCombo(newCombo)
        setShowCorrect(true)
        setTimeout(() => setShowCorrect(false), 1500)
      } else {
        playCorrect()
      }
    }
    
    // 自动进入下一题
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setShowExplanation(false)
      } else {
        handleFinish()
      }
    }, 1000)
  }
  
  const handleFinish = () => {
    timer.pause()
    
    // 计算正确数量
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correct++
      }
    })
    setCorrectCount(correct)
    
    // 计算星星
    const percentage = correct / questions.length
    let stars = 0
    if (percentage >= 0.6) stars = 1
    if (percentage >= 0.8) stars = 2
    if (percentage >= 1) stars = 3
    
    if (level && stars > 0) {
      completeLevel(level.id, stars)
      updateStudyStreak()
    }

    if (stars >= 2) {
      setTimeout(() => {
        playLevelUp()
        playConfetti()
        setShowCelebration(true)
      }, 300)
    }
    
    setGameState('result')
  }
  
  const handleRetry = () => {
    setCurrentIndex(0)
    setAnswers({})
    setShowExplanation(false)
    setCorrectCount(0)
    setGameState('playing')
    
    // 重新随机题目
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled.slice(0, level?.questionCount || 5))
    timer.reset(level?.timeLimit || 120)
    timer.start()
  }
  
  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-xl text-gray-600 mb-4">关卡不存在</p>
          <Link to="/adventure" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-cyan-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform inline-block">
            ← 返回冒险地图
          </Link>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl text-gray-600 mb-2">暂无题目数据</p>
          <p className="text-sm text-gray-400 mb-4">{grade}年级题库为空，请先添加单词</p>
          <button onClick={handleRestart} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-cyan-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform">
            🔄 重试
          </button>
        </div>
      </div>
    )
  }

  // 结果页面
  if (gameState === 'result') {
    const percentage = correctCount / questions.length
    const stars = percentage >= 1 ? 3 : percentage >= 0.8 ? 2 : percentage >= 0.6 ? 1 : 0
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Celebration show={showCelebration} type={stars >= 3 ? 'all' : 'stars'} />
        <Card className="text-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {stars > 0 ? '🎉 恭喜过关！' : '😢 继续努力！'}
          </h2>
          
          <BigStars count={stars} className="mb-8" />
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-green-600">正确</p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-red-600">{questions.length - correctCount}</p>
              <p className="text-sm text-red-600">错误</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600">{Math.round(percentage * 100)}%</p>
              <p className="text-sm text-blue-600">正确率</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={handleRetry}>
              <RotateCcw size={20} className="mr-2" />
              重新挑战
            </Button>
            <Link to="/adventure">
              <Button>
                返回地图
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
        
        {/* 错题解析 */}
        {questions.filter(q => answers[q.id] !== q.answer).length > 0 && (
          <Card className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">错题解析</h3>
            <div className="space-y-4">
              {questions.filter(q => answers[q.id] !== q.answer).map(q => (
                <div key={q.id} className="p-4 bg-red-50 rounded-xl">
                  <p className="font-medium text-gray-800 mb-2">{q.content}</p>
                  <p className="text-sm text-red-600 mb-2">
                    你的答案：{answers[q.id]} | 正确答案：{q.answer}
                  </p>
                  <p className="text-sm text-gray-600">{q.explanation}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
  }

  // 答题页面
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CorrectPopup show={showCorrect} combo={combo} />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{level.name}</h2>
          <p className="text-sm text-gray-500">第 {currentIndex + 1} / {questions.length} 题</p>
        </div>
        <Timer seconds={timer.seconds} warning={timer.seconds < 30} />
      </div>
      
      {/* Progress */}
      <ProgressBar 
        value={currentIndex + 1} 
        max={questions.length} 
        color="cyan"
        className="mb-6"
      />

      {/* Question Card */}
      {currentQuestion && (
        <Card className="mb-6">
          {/* Question Type */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium">
              {currentQuestion.type === 'word_choice' ? '单词选择' :
               currentQuestion.type === 'listen_choice' ? '听音选词' :
               currentQuestion.type === 'word_spelling' ? '单词拼写' :
               currentQuestion.type === 'fill_blank' ? '填空题' : '其他'}
            </span>
          </div>
          
          {/* Question Content */}
          <div className="text-center mb-8">
            {/* 听音题播放按钮 */}
            {currentQuestion.type === 'listen_choice' && currentQuestion.audioText && (
              <div className="mb-6">
                <AudioPlayer text={currentQuestion.audioText} size="lg" />
                <p className="text-sm text-gray-500 mt-2">点击播放发音</p>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-gray-800">
              {currentQuestion.content}
            </h3>
          </div>
          
          {/* Options */}
          {currentQuestion.options && (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === option
                const isCorrect = option === currentQuestion.answer
                const showResult = answers[currentQuestion.id] !== undefined
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className={twMerge(
                      clsx(
                        'p-4 rounded-xl text-lg font-medium transition-all',
                        'border-2',
                        !showResult && 'hover:border-orange-300 hover:bg-orange-50',
                        showResult && isCorrect && 'border-green-500 bg-green-50 text-green-700',
                        showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 text-red-700',
                        !showResult && 'border-gray-200'
                      )
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          )}
          
          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-start gap-2">
                <Lightbulb className="text-yellow-500 mt-1" size={20} />
                <div>
                  <p className="font-medium text-yellow-700 mb-1">解析</p>
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
      
      {/* Controls */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          <Lightbulb size={20} className="mr-2" />
          {showExplanation ? '隐藏解析' : '显示提示'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => {
            if (currentIndex < questions.length - 1) {
              setCurrentIndex(currentIndex + 1)
              setShowExplanation(false)
            } else {
              handleFinish()
            }
          }}
        >
          {currentIndex < questions.length - 1 ? '下一题' : '完成'}
          <ChevronRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
