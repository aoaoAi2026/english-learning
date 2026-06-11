import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, MessageSquare, FileText, AlertCircle, CheckCircle2, RotateCcw, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/stores/userStore'
import { getAllQuestions } from '@/data/questions'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type FilterType = 'all' | 'word' | 'sentence' | 'dialogue' | 'general'

const filterOptions: { key: FilterType; label: string; icon: typeof BookOpen; color: string }[] = [
  { key: 'all', label: '全部', icon: Filter, color: 'bg-gray-500' },
  { key: 'word', label: '单词', icon: BookOpen, color: 'bg-orange-500' },
  { key: 'sentence', label: '句子', icon: FileText, color: 'bg-cyan-500' },
  { key: 'dialogue', label: '对话', icon: MessageSquare, color: 'bg-purple-500' },
  { key: 'general', label: '综合', icon: AlertCircle, color: 'bg-blue-500' }
]

interface PracticeState {
  isOpen: boolean
  questionId: string | null
  selectedAnswer: string | null
  showResult: boolean
  isCorrect: boolean
}

export function WrongBookPage() {
  const { progress, incrementConsecutiveCorrect, resetConsecutiveCorrect, markWrongQuestionMastered } = useUserStore()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [practice, setPractice] = useState<PracticeState>({
    isOpen: false,
    questionId: null,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false
  })
  const [justMastered, setJustMastered] = useState<string | null>(null)

  const allQuestions = getAllQuestions()

  // 活跃错题：未掌握的
  const activeWrongQuestions = progress.wrongQuestions.filter(w => !w.mastered)

  // 已掌握错题
  const masteredWrongQuestions = progress.wrongQuestions.filter(w => w.mastered)

  // 过滤后的列表
  const filteredWrong = activeFilter === 'all'
    ? activeWrongQuestions
    : activeWrongQuestions.filter(w => w.questionType === activeFilter)

  // 获取题目详情
  const getQuestionDetail = (questionId: string) => {
    return allQuestions.find(q => q.id === questionId)
  }

  const startPractice = (questionId: string) => {
    setPractice({
      isOpen: true,
      questionId,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false
    })
  }

  const closePractice = () => {
    setPractice({
      isOpen: false,
      questionId: null,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false
    })
  }

  const submitAnswer = () => {
    if (!practice.questionId || !practice.selectedAnswer) return
    const question = getQuestionDetail(practice.questionId)
    if (!question) return

    const isCorrect = practice.selectedAnswer === question.answer
    setPractice(prev => ({ ...prev, showResult: true, isCorrect }))

    if (isCorrect) {
      const reachedMastery = incrementConsecutiveCorrect(practice.questionId)
      if (reachedMastery) {
        setJustMastered(practice.questionId)
        setTimeout(() => setJustMastered(null), 2000)
      }
    } else {
      resetConsecutiveCorrect(practice.questionId)
    }
  }

  const currentQuestion = practice.questionId ? getQuestionDetail(practice.questionId) : null
  const currentWrong = practice.questionId ? activeWrongQuestions.find(w => w.questionId === practice.questionId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="text-gray-600" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📕 错题本</h1>
            <p className="text-sm text-gray-500">巩固错题，不留知识盲点</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-orange-600">{activeWrongQuestions.length}</div>
            <div className="text-xs text-gray-500">待攻克错题</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-cyan-600">{masteredWrongQuestions.length}</div>
            <div className="text-xs text-gray-500">已掌握</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-green-600">
              {progress.wrongQuestions.length > 0
                ? Math.round((masteredWrongQuestions.length / progress.wrongQuestions.length) * 100)
                : 0}%
            </div>
            <div className="text-xs text-gray-500">掌握率</div>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterOptions.map(opt => {
            const Icon = opt.icon
            return (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={twMerge(
                  clsx(
                    'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    activeFilter === opt.key
                      ? `${opt.color} text-white shadow-md`
                      : 'bg-white text-gray-600 hover:shadow-md'
                  )
                )}
              >
                <Icon size={16} />
                {opt.label}
              </button>
            )
          })}
        </div>

        {/* Question List */}
        {filteredWrong.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {activeFilter === 'all' ? '太棒了！没有错题' : '该类别没有错题'}
            </h3>
            <p className="text-gray-500">
              {activeFilter === 'all'
                ? '继续保持，你做得非常好！'
                : '换个筛选条件看看吧~'}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredWrong.map((wq) => {
              const question = getQuestionDetail(wq.questionId)
              const typeInfo = filterOptions.find(o => o.key === wq.questionType) || filterOptions[4]
              const TypeIcon = typeInfo.icon
              const isMasteredAnimation = justMastered === wq.questionId

              return (
                <Card
                  key={wq.questionId}
                  className={twMerge(
                    clsx(
                      'transition-all duration-300',
                      isMasteredAnimation && 'ring-2 ring-green-400 bg-green-50'
                    )
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={twMerge(clsx(typeInfo.color, 'flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-white'))}>
                        <TypeIcon size={12} />
                        {typeInfo.label}
                      </span>
                      <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                        错误 {wq.wrongCount} 次
                      </span>
                      {wq.consecutiveCorrect > 0 && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          连续答对 {wq.consecutiveCorrect}/3
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(wq.lastWrongDate).toLocaleDateString()}
                    </span>
                  </div>

                  {question && (
                    <>
                      <p className="font-bold text-gray-800 mb-3 text-base">
                        {question.content}
                      </p>

                      {question.options && question.options.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {question.options.map((opt, idx) => (
                            <div
                              key={idx}
                              className={twMerge(
                                clsx(
                                  'text-sm px-3 py-2 rounded-lg',
                                  opt === question.answer
                                    ? 'bg-green-50 text-green-700 font-medium border border-green-200'
                                    : 'bg-gray-50 text-gray-600'
                                )
                              )}
                            >
                              {String.fromCharCode(65 + idx)}. {opt}
                              {opt === question.answer && (
                                <CheckCircle2 className="inline ml-2 text-green-500" size={14} />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-cyan-50 rounded-xl p-3 mb-4">
                        <div className="text-xs text-cyan-600 font-medium mb-1">💡 解析</div>
                        <div className="text-sm text-gray-700">{question.explanation}</div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">连续答对3次自动标记为已掌握</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => startPractice(wq.questionId)}
                      className="flex items-center gap-1.5"
                    >
                      <RotateCcw size={14} />
                      重新练习
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Mastered Section */}
        {masteredWrongQuestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={20} />
              已掌握 ({masteredWrongQuestions.length})
            </h2>
            <Card className="bg-green-50/50">
              <div className="space-y-2">
                {masteredWrongQuestions.map((wq) => {
                  const question = getQuestionDetail(wq.questionId)
                  return (
                    <div
                      key={wq.questionId}
                      className="flex items-center justify-between p-3 bg-white rounded-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">
                          {question?.content || wq.questionId}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-green-600 ml-3 shrink-0">
                        <CheckCircle2 size={14} />
                        已掌握
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Practice Modal */}
      {practice.isOpen && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">🔄 错题练习</h3>
                <button
                  onClick={closePractice}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {currentWrong && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                    连续答对: {currentWrong.consecutiveCorrect}/3
                  </span>
                </div>
              )}

              <p className="font-bold text-gray-800 mb-4 text-base">
                {currentQuestion.content}
              </p>

              {currentQuestion.options && currentQuestion.options.length > 0 && (
                <div className="space-y-2 mb-6">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = practice.selectedAnswer === opt
                    const isCorrectAnswer = opt === currentQuestion.answer
                    const showCorrectness = practice.showResult

                    let style = 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                    if (isSelected) {
                      style = 'bg-orange-100 text-orange-800 border-2 border-orange-400'
                    }
                    if (showCorrectness) {
                      if (isCorrectAnswer) {
                        style = 'bg-green-100 text-green-800 border-2 border-green-400'
                      } else if (isSelected && !practice.isCorrect) {
                        style = 'bg-red-100 text-red-800 border-2 border-red-400'
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => !practice.showResult && setPractice(prev => ({ ...prev, selectedAnswer: opt }))}
                        className={twMerge(
                          clsx(
                            'w-full text-left text-sm px-4 py-3 rounded-xl transition-all',
                            style,
                            !practice.showResult && 'cursor-pointer',
                            practice.showResult && 'cursor-default'
                          )
                        )}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                        {showCorrectness && isCorrectAnswer && (
                          <CheckCircle2 className="inline ml-2 text-green-600" size={16} />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {practice.showResult && (
                <div
                  className={twMerge(
                    clsx(
                      'rounded-xl p-4 mb-4',
                      practice.isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    )
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {practice.isCorrect ? (
                      <><CheckCircle2 className="text-green-600" size={20} /><span className="font-bold text-green-700">回答正确！</span></>
                    ) : (
                      <><AlertCircle className="text-red-600" size={20} /><span className="font-bold text-red-700">回答错误</span></>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">正确答案：</span>{String(currentQuestion.answer)}
                  </div>
                  <div className="text-sm text-gray-700 bg-white rounded-lg p-3">
                    <span className="text-cyan-600 font-medium">💡 解析：</span>
                    {currentQuestion.explanation}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={closePractice}
                  className="flex-1"
                >
                  关闭
                </Button>
                {!practice.showResult ? (
                  <Button
                    variant="primary"
                    onClick={submitAnswer}
                    disabled={!practice.selectedAnswer}
                    className="flex-1"
                  >
                    提交答案
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      closePractice()
                    }}
                    className="flex-1"
                  >
                    继续
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
