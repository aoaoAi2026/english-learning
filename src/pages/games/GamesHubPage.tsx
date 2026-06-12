import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Brain, Pencil, Search, Shuffle, FerrisWheel, Star, Trophy, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

const games = [
  {
    id: 'memory',
    title: '记忆翻牌',
    icon: Brain,
    description: '翻开卡片，找到英文单词和中文的配对！',
    emoji: '🧠',
    bg: 'from-pink-400 to-rose-400',
    cardBg: 'bg-pink-50 border-pink-200 hover:border-pink-300',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    stars: 3,
    age: '适合所有年级',
  },
  {
    id: 'spelling',
    title: '拼写蜜蜂',
    icon: Pencil,
    description: '听单词发音，拼出正确的单词！',
    emoji: '🐝',
    bg: 'from-amber-400 to-orange-400',
    cardBg: 'bg-amber-50 border-amber-200 hover:border-amber-300',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    stars: 4,
    age: '适合3-6年级',
  },
  {
    id: 'wordsearch',
    title: '单词大搜索',
    icon: Search,
    description: '在字母网格中找出隐藏的英文单词！',
    emoji: '🔍',
    bg: 'from-emerald-400 to-teal-400',
    cardBg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    stars: 3,
    age: '适合所有年级',
  },
  {
    id: 'scramble',
    title: '字母消消乐',
    icon: Shuffle,
    description: '把打乱的字母重新排列成正确单词！',
    emoji: '🔤',
    bg: 'from-indigo-400 to-purple-400',
    cardBg: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-500',
    stars: 4,
    age: '适合3-6年级',
  },
  {
    id: 'spinwheel',
    title: '幸运大转盘',
    icon: FerrisWheel,
    description: '转动转盘赢取星星奖励！每天3次！',
    emoji: '🎡',
    bg: 'from-red-400 to-orange-400',
    cardBg: 'bg-red-50 border-red-200 hover:border-red-300',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    stars: 2,
    age: '适合所有年级',
    badge: '🔥热门',
  },
]

export function GamesHubPage() {
  const { progress } = useUserStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <Star size={18} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-600">{progress.totalStars}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="text-yellow-500" size={28} />
            <Trophy className="text-amber-500" size={28} />
            <Sparkles className="text-yellow-500" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🎮 趣味小游戏
          </h1>
          <p className="text-gray-500">
            边玩边学，让英语学习更有趣！
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer border-2 relative overflow-hidden group ${game.cardBg}`}
            >
              {/* Badge */}
              {game.badge && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {game.badge}
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 ${game.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{game.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: Math.min(game.stars, 5) }).map((_, i) => (
                        <span key={i} className="text-sm">⭐</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">难度</span>
                    <span className="text-xs text-gray-400 ml-auto">{game.age}</span>
                  </div>
                </div>
              </div>

              {/* Start button hint */}
              <div className="mt-4 flex justify-end">
                <span className={`text-sm font-medium ${game.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  开始玩 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center">
          <h3 className="font-bold text-gray-700 mb-2">💡 小提示</h3>
          <p className="text-sm text-gray-500">
            每个游戏都会用到你正在学习的单词！<br />
            多玩游戏可以加深记忆，让单词记得更牢哦！
          </p>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-white text-gray-600 rounded-xl hover:bg-gray-50 shadow-sm transition-all"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
