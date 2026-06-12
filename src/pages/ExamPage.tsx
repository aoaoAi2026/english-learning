import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, CheckCircle, XCircle, Clock, BarChart, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Timer, useTimer } from '@/components/ui/Timer'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { GradeSelector } from '@/components/ui/GradeSelector'
import { Grade, Question, ExamResult } from '@/types'
import { getQuestionsByGrade } from '@/data/questions'
import { useUserStore } from '@/stores/userStore'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ExamState = 'setup' | 'playing' | 'result'

export function ExamPage() {
  const { addExamResult, addWrongQuestion, progress, setCurrentGrade } = useUserStore()
  const [grade, setGrade] = useState<Grade>(progress.currentGrade || Grade.ONE)
  const allQuestions = getQuestionsByGrade(grade)
  
  const [examState, setExamState] = useState<ExamState>('setup')
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(600)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  
  const timer = useTimer(timeLimit, () => {
    handleFinish()
  })
  
  const startExam = () => {
    // 随机选择题目
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled.slice(0, questionCount))
    setCurrentIndex(0)
    setAnswers({})
    setExamState('playing')
    timer.reset(timeLimit)
    timer.start()
  }
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentIndex]
    if (!currentQuestion) return
    
    setAnswers({ ...answers, [currentQuestion.id]: answer })
    
    // 如果错误，记录到错题本
    if (answer !== currentQuestion.answer) {
      addWrongQuestion(currentQuestion.id)
    }
  }
  
  const handleFinish = () => {
    timer.pause()
    
    // 计算结果
    let correctCount = 0
    const questionResults = questions.map(q => {
      const isCorrect = answers[q.id] === q.answer
      if (isCorrect) correctCount++
      return {
        questionId: q.id,
        userAnswer: answers[q.id] || '',
        isCorrect
      }
    })
    
    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString(),
      grade,
      totalQuestions: questions.length,
      correctCount,
      timeUsed: timeLimit - timer.seconds,
      questions: questionResults
    }
    
    setExamResult(result)
    addExamResult(result)
    setExamState('result')
  }
  
  const currentQuestion = questions[currentIndex]
  
  // 设置页面
  if (examState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center">
            <Play className="text-white" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">模拟考试</h2>
          <p className="text-gray-600 mb-8">自动生成试卷，测试你的英语水平</p>
          
          <div className="space-y-6 text-left">
            {/* 年级选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择难度</label>
              <GradeSelector value={grade} onChange={(g) => { setGrade(g); setCurrentGrade(g) }} compact />
            </div>

            {/* 题目数量 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                题目数量
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={twMerge(
                      clsx(
                        'flex-1 py-2 rounded-xl font-medium transition-all',
                        questionCount === count
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )
                    )}
                  >
                    {count}题
                  </button>
                ))}
              </div>
            </div>
            
            {/* 时间限制 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                时间限制
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map(minutes => (
                  <button
                    key={minutes}
                    onClick={() => setTimeLimit(minutes * 60)}
                    className={twMerge(
                      clsx(
                        'flex-1 py-2 rounded-xl font-medium transition-all',
                        timeLimit === minutes * 60
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )
                    )}
                  >
                    {minutes}分钟
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <Button
            onClick={startExam}
            className="w-full mt-8"
            size="lg"
          >
            开始考试
          </Button>
        </Card>
      </div>
    )
  }
  
  // 结果页面
  if (examState === 'result' && examResult) {
    const percentage = (examResult.correctCount / examResult.totalQuestions) * 100
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center p-8 mb-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <BarChart className="text-white" size={48} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">考试完成！</h2>
          <p className="text-gray-600 mb-8">
            用时 {Math.floor(examResult.timeUsed / 60)}分{examResult.timeUsed % 60}秒
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">{examResult.correctCount}</p>
              <p className="text-sm text-green-600">正确</p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-red-600">{examResult.totalQuestions - examResult.correctCount}</p>
              <p className="text-sm text-red-600">错误</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600">{Math.round(percentage)}%</p>
              <p className="text-sm text-blue-600">正确率</p>
            </div>
          </div>
          
          <Button onClick={() => setExamState('setup')}>
            再考一次
          </Button>
        </Card>
        
        {/* 详细解析 */}
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">详细解析</h3>
          <div className="space-y-4">
            {questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.answer
              return (
                <div
                  key={q.id}
                  className={twMerge(
                    clsx(
                      'p-4 rounded-xl',
                      isCorrect ? 'bg-green-50' : 'bg-red-50'
                    )
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={twMerge(
                      clsx(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      )
                    )}>
                      {isCorrect ? (
                        <CheckCircle className="text-white" size={18} />
                      ) : (
                        <XCircle className="text-white" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {q.content}
                      </p>
                      <p className={twMerge(
                        clsx(
                          'text-sm mb-2',
                          isCorrect ? 'text-green-600' : 'text-red-600'
                        )
                      )}>
                        你的答案：{answers[q.id] || '未作答'} 
                        {!isCorrect && ` | 正确答案：${q.answer}`}
                      </p>
                      <p className="text-sm text-gray-600">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }
  
  // 答题页面
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">第 {currentIndex + 1} / {questions.length} 题</p>
        </div>
        <div className="flex items-center gap-4">
          <Timer seconds={timer.seconds} warning={timer.seconds < 60} />
          <Button variant="danger" size="sm" onClick={handleFinish}>
            交卷
          </Button>
        </div>
      </div>
      
      {/* Progress */}
      <ProgressBar 
        value={currentIndex + 1} 
        max={questions.length} 
        color="green"
        className="mb-6"
      />
      
      {/* Question Card */}
      {currentQuestion && (
        <Card className="mb-6">
          <div className="text-center mb-8">
            {currentQuestion.type === 'listen_choice' && currentQuestion.audioText && (
              <div className="mb-6">
                <AudioPlayer text={currentQuestion.audioText} size="lg" />
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-800">
              {currentQuestion.content}
            </h3>
          </div>
          
          {currentQuestion.options && (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={twMerge(
                    clsx(
                      'p-4 rounded-xl text-lg font-medium transition-all',
                      'border-2',
                      answers[currentQuestion.id] === option
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    )
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </Card>
      )}
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          上一题
        </Button>
        
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={twMerge(
                clsx(
                  'w-8 h-8 rounded-lg font-medium transition-all',
                  index === currentIndex
                    ? 'bg-green-500 text-white'
                    : answers[questions[index].id]
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                )
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <Button
          variant="secondary"
          onClick={() => currentIndex < questions.length - 1 && setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === questions.length - 1}
        >
          下一题
        </Button>
      </div>
    </div>
  )
}
