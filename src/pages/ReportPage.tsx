import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useUserStore } from '@/stores/userStore'
import { getAllQuestions } from '@/data/questions'
import { getAllWords } from '@/data/words'
import { Trophy, Flame, Star, Clock, BookOpen, Target, XCircle, CheckCircle, ArrowLeft, TrendingUp, BookMarked } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type TabType = 'overview' | 'wrong' | 'history'

export function ReportPage() {
  const { progress, examHistory } = useUserStore()
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState<TabType>('overview')

  const allQuestions = getAllQuestions()
  const allWords = getAllWords()

  // 统计数据
  const totalWordsLearned = progress.wordsLearned.length
  const totalLevelsCompleted = progress.completedLevels.length
  const totalStars = progress.totalStars
  const totalStudyTime = progress.totalStudyTime
  const totalWrong = progress.wrongQuestions.length
  const masteredWrong = progress.wrongQuestions.filter(w => w.mastered).length

  const tabs: { key: TabType; label: string; icon: typeof Trophy }[] = [
    { key: 'overview', label: '学习概览', icon: Target },
    { key: 'wrong', label: '错题本', icon: XCircle },
    { key: 'history', label: '考试记录', icon: Clock }
  ]

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} 分钟`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours} 小时 ${mins} 分` : `${hours} 小时`
  }

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
            <h1 className="text-2xl font-bold text-gray-800">📊 学习报告</h1>
            <p className="text-sm text-gray-500">追踪你的学习进度，查漏补缺</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={twMerge(
                  clsx(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all text-sm',
                    selectedTab === tab.key
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:shadow-md'
                  )
                )}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Stats */}
            <Card className="bg-gradient-to-br from-orange-500 to-cyan-400 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90 mb-1">你获得的星星</div>
                  <div className="text-5xl font-bold">{totalStars}</div>
                  <div className="text-sm opacity-90 mt-2">继续努力，加油！⭐</div>
                </div>
                <div className="text-6xl opacity-50">🌟</div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Star className="text-orange-500" size={20} />
                </div>
                <p className="text-xl font-bold text-gray-800">{totalStars}</p>
                <p className="text-xs text-gray-500">获得星星</p>
              </Card>

              <Card className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Trophy className="text-cyan-500" size={20} />
                </div>
                <p className="text-xl font-bold text-gray-800">{totalLevelsCompleted}</p>
                <p className="text-xs text-gray-500">完成关卡</p>
              </Card>

              <Card className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-green-500" size={20} />
                </div>
                <p className="text-xl font-bold text-gray-800">{totalWordsLearned}</p>
                <p className="text-xs text-gray-500">学习单词</p>
              </Card>

              <Card className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-red-100 rounded-xl flex items-center justify-center">
                  <Flame className="text-red-500" size={20} />
                </div>
                <p className="text-xl font-bold text-gray-800">{progress.studyStreak}</p>
                <p className="text-xs text-gray-500">连续学习(天)</p>
              </Card>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-purple-500" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">学习时长</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatTime(totalStudyTime)}
                </div>
                <div className="text-xs text-gray-500">每天坚持一点点</div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookMarked className="text-orange-500" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">错题统计</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {masteredWrong}/{totalWrong}
                </div>
                <div className="text-xs text-gray-500">已掌握 / 总计</div>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-orange-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">学习进度</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700 font-medium">📚 单词学习</span>
                    <span className="text-sm text-gray-800 font-bold">{totalWordsLearned}/{allWords.length}</span>
                  </div>
                  <ProgressBar value={totalWordsLearned} max={allWords.length} color="orange" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700 font-medium">🎮 关卡完成</span>
                    <span className="text-sm text-gray-800 font-bold">{totalLevelsCompleted} 关</span>
                  </div>
                  <ProgressBar value={totalLevelsCompleted} max={24} color="cyan" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700 font-medium">📕 错题掌握</span>
                    <span className="text-sm text-gray-800 font-bold">
                      {totalWrong > 0
                        ? `${Math.round((masteredWrong / totalWrong) * 100)}%`
                        : '0%'}
                    </span>
                  </div>
                  <ProgressBar value={masteredWrong} max={totalWrong || 1} color="green" />
                </div>
              </div>
            </Card>

            {/* Action Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/wrongbook"
                className="block rounded-2xl p-5 bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">去错题本</div>
                    <div className="text-xl font-bold">巩固错题</div>
                    <div className="text-xs opacity-80 mt-1">{totalWrong - masteredWrong} 题待攻克</div>
                  </div>
                  <XCircle size={32} className="opacity-80" />
                </div>
              </Link>

              <Link
                to="/"
                className="block rounded-2xl p-5 bg-gradient-to-br from-cyan-500 to-teal-400 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">开始学习</div>
                    <div className="text-xl font-bold">继续闯关</div>
                    <div className="text-xs opacity-80 mt-1">今天也要加油哦</div>
                  </div>
                  <Trophy size={32} className="opacity-80" />
                </div>
              </Link>
            </div>

            {/* Achievements */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-yellow-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">成就徽章</h3>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: '🌟', name: '初学者', unlocked: totalStars >= 1 },
                  { icon: '⭐', name: '小明星', unlocked: totalStars >= 10 },
                  { icon: '🏆', name: '冠军', unlocked: totalLevelsCompleted >= 5 },
                  { icon: '📚', name: '学霸', unlocked: totalWordsLearned >= 50 },
                  { icon: '🔥', name: '坚持者', unlocked: progress.studyStreak >= 7 },
                  { icon: '💯', name: '满分王', unlocked: false },
                  { icon: '🎯', name: '神射手', unlocked: (totalWrong - masteredWrong) === 0 && totalLevelsCompleted > 0 },
                  { icon: '🚀', name: '火箭', unlocked: totalLevelsCompleted >= 20 }
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      clsx(
                        'text-center p-3 rounded-xl transition-all',
                        achievement.unlocked
                          ? 'bg-yellow-50 shadow-sm'
                          : 'bg-gray-100 opacity-50'
                      )
                    )}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="text-xs text-gray-600">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Wrong Questions Tab */}
        {selectedTab === 'wrong' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">错题本</h3>
                <p className="text-sm text-gray-500">共 {progress.wrongQuestions.filter(w => !w.mastered).length} 题</p>
              </div>
              <Link
                to="/wrongbook"
                className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
              >
                去练习 →
              </Link>
            </div>

            {progress.wrongQuestions.filter(w => !w.mastered).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-gray-500">太棒了！没有错题</p>
              </div>
            ) : (
              <div className="space-y-3">
                {progress.wrongQuestions
                  .filter(w => !w.mastered)
                  .slice(0, 10)
                  .map(wq => {
                    const question = allQuestions.find(q => q.id === wq.questionId)
                    return (
                      <Link
                        key={wq.questionId}
                        to="/wrongbook"
                        className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                            错误 {wq.wrongCount} 次
                          </span>
                          {wq.consecutiveCorrect > 0 && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                              <CheckCircle size={12} />
                              连续答对 {wq.consecutiveCorrect}/3
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">
                          {question?.content || '题目详情'}
                        </p>
                        <p className="text-xs text-gray-500">
                          正确答案：{String(question?.answer || '暂无')}
                        </p>
                      </Link>
                    )
                  })}
              </div>
            )}
          </Card>
        )}

        {/* History Tab */}
        {selectedTab === 'history' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">考试记录</h3>
              <span className="text-sm text-gray-500">共 {examHistory.length} 次</span>
            </div>

            {examHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500">还没有考试记录</p>
              </div>
            ) : (
              <div className="space-y-3">
                {examHistory.slice().reverse().map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        {new Date(exam.date).toLocaleString()}
                      </span>
                      <span className={twMerge(
                        clsx(
                          'px-2 py-1 rounded text-sm font-medium',
                          (exam.correctCount / exam.totalQuestions) >= 0.6
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        )
                      )}>
                        {Math.round((exam.correctCount / exam.totalQuestions) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-800 text-sm">
                        正确 {exam.correctCount}/{exam.totalQuestions}
                      </span>
                      <span className="text-gray-500 text-sm">
                        用时 {Math.floor(exam.timeUsed / 60)}分{exam.timeUsed % 60}秒
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
