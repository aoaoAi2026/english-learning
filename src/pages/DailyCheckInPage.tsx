import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, Star, Gift, Calendar } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { Mascot } from '@/components/effects/Mascot'
import { Celebration } from '@/components/effects/Celebration'
import { playClick, playStar, playConfetti } from '@/utils/sounds'

const REWARDS = [2, 3, 5, 3, 2, 5, 8, 3, 5, 3, 2, 10, 3, 5, 15]

const DAY_EMOJIS = ['🌱', '📖', '✏️', '🎵', '🌈', '🎯', '💎']

export function DailyCheckInPage() {
  const { progress, updateStudyStreak } = useUserStore()
  const [checkedIn, setCheckedIn] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [earnedStars, setEarnedStars] = useState(0)
  const streak = progress.studyStreak || 0
  const [todayIndex] = useState(() => new Date().getDate() % 15)
  const [greetingMood, setGreetingMood] = useState<'happy' | 'cheer'>('happy')

  const isCheckedToday = () => {
    const lastDate = progress.lastStudyDate
      ? new Date(progress.lastStudyDate).toDateString()
      : ''
    return lastDate === new Date().toDateString()
  }

  useEffect(() => {
    if (isCheckedToday()) {
      setCheckedIn(true)
    }
  }, [])

  const handleCheckIn = () => {
    if (checkedIn) return
    playClick()
    updateStudyStreak()
    const reward = REWARDS[todayIndex]
    setEarnedStars(reward)
    setCheckedIn(true)

    setTimeout(() => {
      playStar()
      setShowCelebration(true)
      playConfetti()
      setGreetingMood('cheer')
    }, 300)
  }

  const today = new Date()
  const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][today.getDay()]
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`

  // 生成一周的假打卡数据
  const weekDays = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    weekDays.push({
      date: d,
      label: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
      isToday: i === 0,
      checked: i === 0 && checkedIn ? true : i > 0 && Math.random() > 0.4,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <Celebration show={showCelebration} type="stars" onComplete={() => setShowCelebration(false)} />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white pb-8 pt-4 px-4 rounded-b-[2.5rem] shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/" onClick={playClick}>
              <ArrowLeft size={22} />
            </Link>
            <span className="font-bold text-lg">每日签到</span>
            <div className="ml-auto flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Flame size={16} />
              <span className="font-bold">{streak}天</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-5xl mb-2">📅</p>
            <p className="text-lg font-bold">{dayOfWeek}</p>
            <p className="text-sm opacity-90">{dateStr}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        {/* 吉祥物 */}
        <div className="flex justify-center -mt-8 mb-3">
          <Mascot
            mood={greetingMood}
            message={checkedIn ? `获得${earnedStars}颗星星!` : '快来签到领星星吧!'}
            size="md"
            floating
          />
        </div>

        {/* 签到按钮 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-4">
          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className={`w-full py-5 rounded-2xl text-xl font-extrabold transition-all duration-300 shadow-lg ${
              checkedIn
                ? 'bg-green-100 text-green-500 cursor-default'
                : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white hover:scale-105 hover:shadow-xl active:scale-95 animate-heartbeat'
            }`}
          >
            {checkedIn ? (
              <span className="flex items-center justify-center gap-2">
                ✅ 今日已签到 <Star size={22} className="text-yellow-500" fill="currentColor" />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🎁 签到领星星
              </span>
            )}
          </button>

          {/* 今日奖励 */}
          <div className="mt-4 text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
              checkedIn ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
            }`}>
              <Gift size={16} />
              今日奖励：<span className="text-lg">{REWARDS[todayIndex]} ⭐</span>
            </div>
          </div>
        </div>

        {/* 本周打卡 */}
        <div className="bg-white rounded-3xl p-5 shadow-md mb-4">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-amber-500" />
            本周记录
          </h3>
          <div className="flex justify-between">
            {weekDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-xs text-gray-400">{d.label}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                  d.checked
                    ? d.isToday
                      ? 'bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-md'
                      : 'bg-green-100 text-green-500'
                    : d.isToday
                      ? 'bg-gray-100 text-gray-400 border-2 border-dashed border-orange-300'
                      : 'bg-gray-50 text-gray-300'
                }`}>
                  {d.checked ? '✅' : d.isToday && !checkedIn ? '?' : '·'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 连续打卡奖励预览 */}
        <div className="bg-white rounded-3xl p-5 shadow-md mb-4">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Flame size={18} className="text-red-400" />
            连续打卡额外奖励
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { days: 3, reward: 5, emoji: '🥉', achieved: streak >= 3 },
              { days: 7, reward: 10, emoji: '🥈', achieved: streak >= 7 },
              { days: 15, reward: 20, emoji: '🥇', achieved: streak >= 15 },
              { days: 30, reward: 50, emoji: '👑', achieved: streak >= 30 },
            ].map((item) => (
              <div
                key={item.days}
                className={`text-center p-2 rounded-xl border-2 transition-all ${
                  item.achieved
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-gray-100 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-gray-600">{item.days}天</div>
                <div className={`text-xs font-bold ${item.achieved ? 'text-yellow-500' : 'text-gray-400'}`}>
                  +{item.reward}⭐
                </div>
                {item.achieved && <div className="text-[10px] text-green-500 mt-0.5">已达成</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center pb-6">
          <p className="text-sm text-gray-300">
            每天签到都能获得星星奖励！
          </p>
        </div>
      </div>
    </div>
  )
}
