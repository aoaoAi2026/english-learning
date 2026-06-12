import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import { Mascot } from '@/components/effects/Mascot'
import { AchievementToast, checkAchievements } from '@/components/effects/AchievementToast'
import { playClick } from '@/utils/sounds'
import { getAllLevels } from '@/data/levels'
import { getAllWords } from '@/data/words'
import { useState, useEffect, useCallback } from 'react'

const FLOATING_EMOJIS = ['⭐', '🌈', '🎵', '🌸', '🦋', '💫', '🎈', '📖', '🦉', '🎨']
const BUBBLES = ['☁️', '☁️', '☁️', '💭', '💭']

const FUN_FACTS = [
  '🍎 "Apple" 是英语中最常用的水果单词之一',
  '🐝 蜜蜂的英文 "bee" 只有三个字母，很简单吧',
  '🌈 "Rainbow" = rain(雨) + bow(弓)，雨后的弓就是彩虹',
  '🦋 蝴蝶 "butterfly" 直译是"黄油+飞"，因为以前人们以为蝴蝶偷吃黄油',
  '📖 英语中字母 "e" 出现频率最高，大约每8个字母就有一个e',
  '🐱 小猫 "kitten" 和大猫 "cat" 是两个不同的单词哦',
  '⭐ "Goodbye" 来自古英语 "God be with ye"（愿上帝与你同在）的缩写',
]

export function HomePage() {
  const { progress, updateStudyStreak } = useUserStore()
  const navigate = useNavigate()
  const [floatEmojis, setFloatEmojis] = useState<{ id: number; emoji: string; x: number; delay: number; size: number; duration: number }[]>([])
  const [mascotMsg, setMascotMsg] = useState('')
  const [achievement, setAchievement] = useState<string | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [funFact, setFunFact] = useState('')
  const [factIndex, setFactIndex] = useState(0)

  const totalStars = progress.totalStars || 0
  const streak = progress.studyStreak || 0
  const allLevels = getAllLevels()
  const completedLevels = allLevels.filter(l => progress.completedLevels.includes(l.id)).length
  const allWords = getAllWords()
  const learnedWords = allWords.filter(w => progress.wordsLearned.includes(w.id)).length
  const wrongCount = progress.wrongQuestions?.filter(w => !w.mastered).length || 0

  useEffect(() => {
    const items = []
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
        x: Math.random() * 95,
        delay: Math.random() * 10,
        size: 14 + Math.random() * 22,
        duration: 12 + Math.random() * 14,
      })
    }
    setFloatEmojis(items)

    const msgs = [
      '来一起探险吧！🚀',
      '今天学点什么好呢？🤔',
      '哇！你已经很棒了！💪',
      '点击卡片开始学习~',
      `你已经学了 ${learnedWords} 个单词啦！🎉`,
      `闯过了 ${completedLevels} 关，真厉害！🏆`,
    ]
    setMascotMsg(msgs[Math.floor(Math.random() * msgs.length)])

    setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])
  }, [])

  // 成就检查
  useEffect(() => {
    const achieved = checkAchievements(learnedWords, completedLevels, streak, () => {})
    const known = JSON.parse(localStorage.getItem('shown_achievements') || '[]')
    for (const type of Array.from(achieved)) {
      if (!known.includes(type)) {
        setAchievement(type)
        setShowAchievement(true)
        known.push(type)
        localStorage.setItem('shown_achievements', JSON.stringify(known))
        break
      }
    }
  }, [learnedWords, completedLevels, streak])

  const cycleFunFact = () => {
    const next = (factIndex + 1) % FUN_FACTS.length
    setFactIndex(next)
    setFunFact(FUN_FACTS[next])
  }

  const isTodayChecked = () => {
    const lastDate = progress.lastStudyDate
      ? new Date(progress.lastStudyDate).toDateString()
      : ''
    return lastDate === new Date().toDateString()
  }

  const learningZones = [
    { title: '单词天地', emoji: '📖', desc: `${allWords.length}个词汇`, path: '/words', bg: 'from-orange-400 to-amber-500', icon: '🐘' },
    { title: '发音工厂', emoji: '🎵', desc: '48个国际音标', path: '/phonics', bg: 'from-purple-400 to-pink-500', icon: '🎤' },
    { title: '句子工坊', emoji: '✏️', desc: '填空造句练习', path: '/sentences', bg: 'from-cyan-400 to-blue-500', icon: '💬' },
    { title: '对话乐园', emoji: '🎭', desc: '情景对话场景', path: '/dialogue', bg: 'from-green-400 to-emerald-500', icon: '🎪' },
  ]

  const challengeZones = [
    { title: '闯关冒险', emoji: '🏆', desc: `${allLevels.length}个关卡`, path: '/adventure', bg: 'from-red-400 to-orange-500', icon: '🗺️', sub: `${completedLevels}/${allLevels.length} 已通关` },
    { title: '模拟考试', emoji: '📝', desc: '智能出题考试', path: '/exam', bg: 'from-indigo-400 to-violet-500', icon: '🎯', sub: '多难度可选' },
  ]

  const funGames = [
    { title: '记忆翻牌', emoji: '🧠', path: '/games/memory', color: 'bg-pink-100 text-pink-500' },
    { title: '拼写蜜蜂', emoji: '🐝', path: '/games/spelling', color: 'bg-amber-100 text-amber-500' },
    { title: '单词搜索', emoji: '🔍', path: '/games/wordsearch', color: 'bg-emerald-100 text-emerald-500' },
    { title: '字母消消乐', emoji: '🔤', path: '/games/scramble', color: 'bg-indigo-100 text-indigo-500' },
    { title: '幸运转盘', emoji: '🎡', path: '/games/spinwheel', color: 'bg-red-100 text-red-500' },
  ]

  return (
    <div className="min-h-screen bg-kid-gradient relative overflow-hidden">
      <AchievementToast type={achievement || ''} show={showAchievement} onClose={() => setShowAchievement(false)} />
      
      {/* 浮动背景 */}
      {floatEmojis.map((f) => (
        <div key={f.id} className="absolute pointer-events-none select-none"
          style={{
            left: `${f.x}%`, top: '-5%', fontSize: `${f.size}px`,
            animation: `float-up ${f.duration}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`, opacity: 0.3,
          }}>
          {f.emoji}
        </div>
      ))}

      {/* 云朵装饰 */}
      {BUBBLES.map((b, i) => (
        <div key={i} className="absolute pointer-events-none select-none text-4xl opacity-15"
          style={{
            top: `${15 + i * 22}%`,
            left: `${5 + (i % 3) * 40}%`,
            animation: `float ${5 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}>
          {b}
        </div>
      ))}

      <div className="max-w-4xl mx-auto px-4 py-4 relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { playClick(); navigate('/daily-checkin') }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm shadow-md transition-all hover:scale-105 active:scale-95 ${
              isTodayChecked()
                ? 'bg-green-100 text-green-600 border-2 border-green-200'
                : 'bg-white text-orange-500 border-2 border-orange-200 animate-heartbeat'
            }`}
          >
            <span>{isTodayChecked() ? '✅' : '📅'}</span>
            {isTodayChecked() ? '已签到' : '签到领⭐'}
          </button>
          <button onClick={() => { playClick(); navigate('/daily-checkin') }}>
            <Mascot mood="happy" message={mascotMsg} size="sm" floating />
          </button>
        </div>

        {/* Hero */}
        <div className="text-center mb-5">
          <div className="inline-block p-4 bg-gradient-to-br from-orange-400 via-pink-400 to-cyan-400 rounded-3xl shadow-xl animate-rainbow-glow mb-3">
            <span className="text-5xl">🏰</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500">
            英语学习乐园
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">全部小学英语内容 · 边玩边学</p>
          
          {/* Fun Fact */}
          <button 
            onClick={cycleFunFact}
            className="mt-3 mx-auto inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 text-xs text-yellow-700 hover:bg-yellow-100 transition-colors cursor-pointer"
          >
            <span>💡</span> {funFact}
            <span className="text-yellow-400">🔄</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: '⭐', value: totalStars, label: '星星', color: 'text-yellow-500 bg-yellow-50' },
            { icon: '🔥', value: streak, label: '天数', color: 'text-red-500 bg-red-50' },
            { icon: '📚', value: learnedWords, label: '词汇', color: 'text-green-500 bg-green-50' },
            { icon: '🏆', value: completedLevels, label: '通关', color: 'text-purple-500 bg-purple-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-2.5 text-center shadow-sm hover:scale-105 transition-transform cursor-default`}>
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className="text-lg font-extrabold">{s.value}</div>
              <div className="text-[10px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Learning Zones */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🎒</span> 学习区域
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {learningZones.map((zone) => (
              <Link
                key={zone.path}
                to={zone.path}
                onClick={playClick}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-200 relative overflow-hidden rainbow-bottom"
              >
                <div className="absolute top-0 right-0 text-5xl opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500">{zone.icon}</div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${zone.bg} flex items-center justify-center mb-2 shadow-md`}>
                  <span className="text-xl">{zone.emoji}</span>
                </div>
                <div className="font-bold text-gray-800 text-sm mb-0.5">{zone.title}</div>
                <div className="text-xs text-gray-400">{zone.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Challenge Zones */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>⚔️</span> 挑战区域
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {challengeZones.map((zone) => (
              <Link
                key={zone.path}
                to={zone.path}
                onClick={playClick}
                className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-200 relative overflow-hidden rainbow-bottom"
              >
                <div className="absolute top-0 right-0 text-5xl opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500">{zone.icon}</div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${zone.bg} flex items-center justify-center mb-2 shadow-md`}>
                  <span className="text-xl">{zone.emoji}</span>
                </div>
                <div className="font-bold text-gray-800 text-sm mb-0.5">{zone.title}</div>
                <div className="text-xs text-gray-400">{zone.desc}</div>
                {zone.sub && <div className="text-[10px] text-orange-400 font-medium mt-1">{zone.sub}</div>}
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Games Carousel */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🎮</span> 趣味小游戏
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {funGames.map((game) => (
              <Link
                key={game.path}
                to={game.path}
                onClick={playClick}
                className="bg-white rounded-xl p-2.5 shadow-sm hover:shadow-lg hover:scale-110 transition-all duration-200 text-center"
              >
                <div className={`w-9 h-9 mx-auto mb-1 rounded-lg ${game.color} flex items-center justify-center text-lg`}>
                  {game.emoji}
                </div>
                <div className="text-[10px] font-medium text-gray-500">{game.title}</div>
              </Link>
            ))}
          </div>
          <Link to="/games" onClick={playClick} className="block text-center text-xs text-purple-400 hover:text-purple-600 mt-2 font-medium">
            查看全部游戏 →
          </Link>
        </div>

        {/* Bottom Menu */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Link to="/report" onClick={playClick}
            className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all text-center">
            <div className="text-2xl mb-0.5">📊</div>
            <div className="text-xs font-bold text-gray-600">学习报告</div>
          </Link>
          <Link to="/wrongbook" onClick={playClick}
            className="relative bg-white rounded-2xl p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all text-center">
            {wrongCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-bounce-soft">
                {wrongCount}
              </div>
            )}
            <div className="text-2xl mb-0.5">💪</div>
            <div className="text-xs font-bold text-gray-600">巩固训练</div>
          </Link>
          <Link to="/resources" onClick={playClick}
            className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md hover:scale-105 transition-all text-center">
            <div className="text-2xl mb-0.5">🌐</div>
            <div className="text-xs font-bold text-gray-600">资源宝库</div>
          </Link>
        </div>

        <div className="text-center pb-4">
          <p className="text-xs text-gray-300 inline-flex items-center gap-1">
            <span className="animate-bounce-soft">👆</span>
            点击任意卡片开始英语大冒险
            <span className="animate-bounce-soft" style={{ animationDelay: '0.5s' }}>👆</span>
          </p>
        </div>
      </div>
    </div>
  )
}
