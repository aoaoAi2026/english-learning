import { Heart, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Description */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📚</span>
            </div>
            <div>
              <p className="font-bold text-gray-800">小学英语乐园</p>
              <p className="text-sm text-gray-500">让英语学习像玩游戏一样有趣</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>专为小学1-6年级学生设计</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>用</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>制作</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="p-3 bg-white rounded-xl">
              <span className="text-2xl">📖</span>
              <p className="mt-1 text-gray-600">单词学习</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <span className="text-2xl">🎵</span>
              <p className="mt-1 text-gray-600">音标教学</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <span className="text-2xl">🎮</span>
              <p className="mt-1 text-gray-600">闯关游戏</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <span className="text-2xl">📝</span>
              <p className="mt-1 text-gray-600">模拟考试</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
