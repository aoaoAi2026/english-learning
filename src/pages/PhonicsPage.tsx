import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { phonicsData, getVowels, getConsonants } from '@/data/phonics'
import { Phonics } from '@/types'
import { ttsService } from '@/services/tts'
import { FloatingEmojis } from '@/components/effects/FloatingEmojis'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type TabType = 'all' | 'vowel' | 'consonant'

export function PhonicsPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>('all')
  const [selectedPhonics, setSelectedPhonics] = useState<Phonics | null>(null)
  
  const vowels = getVowels()
  const consonants = getConsonants()
  
  const displayPhonics = selectedTab === 'vowel' 
    ? vowels 
    : selectedTab === 'consonant' 
      ? consonants 
      : phonicsData

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: phonicsData.length },
    { key: 'vowel', label: '元音', count: vowels.length },
    { key: 'consonant', label: '辅音', count: consonants.length }
  ]

  const handlePhonicsClick = (phonics: Phonics) => {
    setSelectedPhonics(phonics)
    ttsService.speak(phonics.exampleWords[0], { rate: 1.0 })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col relative">
      <FloatingEmojis count={6} />
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="text-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          🎵 国际音标学习
        </h1>
        <p className="text-sm text-gray-500">学习48个国际音标，掌握标准发音</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-4 flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={twMerge(
              clsx(
                'px-5 py-2 rounded-xl font-medium text-sm transition-all',
                selectedTab === tab.key
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )
            )}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Main content: left grid + right detail */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left: Phonics Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid md:grid-cols-2 gap-3">
            {displayPhonics.map((phonics) => (
              <Card
                key={phonics.symbol}
                hover
                className={twMerge(
                  clsx(
                    'cursor-pointer border-2 transition-all active:scale-95',
                    selectedPhonics?.symbol === phonics.symbol
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-transparent'
                  )
                )}
                onClick={() => handlePhonicsClick(phonics)}
              >
                <div className="flex items-center gap-3">
                  <div className={twMerge(
                    clsx(
                      'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0',
                      phonics.type === 'vowel'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-cyan-100 text-cyan-600'
                    )
                  )}>
                    {phonics.symbol}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={twMerge(
                        clsx(
                          'px-2 py-0.5 rounded text-xs font-medium',
                          phonics.type === 'vowel'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-cyan-100 text-cyan-600'
                        )
                      )}>
                        {phonics.type === 'vowel' ? '元音' : '辅音'}
                      </span>
                      <p className="text-sm text-gray-600 line-clamp-1">{phonics.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {phonics.exampleWords.map((word, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-700 border border-gray-200 shadow-sm">
                          {word}
                        </span>
                      ))}
                      <AudioPlayer text={phonics.exampleWords[0]} size="sm" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Selected Phonics Detail */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          {selectedPhonics ? (
            <Card className="bg-gradient-to-br from-purple-50 to-cyan-50 sticky top-0">
              <div className="text-center mb-4">
                <div className={twMerge(
                  clsx(
                    'w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl font-bold mb-3 shadow-lg',
                    selectedPhonics.type === 'vowel'
                      ? 'bg-purple-500 text-white'
                      : 'bg-cyan-500 text-white'
                  )
                )}>
                  {selectedPhonics.symbol}
                </div>
                
                <h3 className="text-sm font-bold text-gray-800 mb-2">📝 例词</h3>
                <div className="flex flex-col gap-2 mb-3">
                  {selectedPhonics.exampleWords.map((word, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm">
                      <span className="text-sm font-bold text-gray-800">{word}</span>
                      <AudioPlayer text={word} size="sm" variant={index === 0 ? 'primary' : 'secondary'} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-800 mb-1">发音说明</h3>
                <p className="text-xs text-gray-600">{selectedPhonics.description}</p>
              </div>
              
              {selectedPhonics.mouthShape && (
                <div className="mb-3">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">口型示意</h3>
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <p className="text-xs text-gray-600">{selectedPhonics.mouthShape}</p>
                  </div>
                </div>
              )}
              
              <div className="p-2 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-700">
                  💡 点击播放按钮听例词发音，模仿练习掌握正确发音。
                </p>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              点击左侧音标查看详情
            </div>
          )}
        </div>
      </div>

      {/* Mobile: bottom detail (shown below grid when selected) */}
      {selectedPhonics && (
        <div className="lg:hidden mt-4 flex-shrink-0">
          <Card className="bg-gradient-to-br from-purple-50 to-cyan-50">
            <div className="flex items-start gap-4 mb-3">
              <div className={twMerge(
                clsx(
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-md flex-shrink-0',
                  selectedPhonics.type === 'vowel'
                    ? 'bg-purple-500 text-white'
                    : 'bg-cyan-500 text-white'
                )
              )}>
                {selectedPhonics.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">{selectedPhonics.description}</p>
              </div>
            </div>
            <div className="border-t border-purple-100 pt-3">
              <h4 className="text-xs font-bold text-gray-800 mb-2">📝 例词</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPhonics.exampleWords.map((word, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-sm">
                    <span className="text-sm font-bold text-gray-800">{word}</span>
                    <AudioPlayer text={word} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
      </div>
    </div>
  )
}
