import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { phonicsData, getVowels, getConsonants } from '@/data/phonics'
import { Phonics } from '@/types'
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎵 国际音标学习
        </h1>
        <p className="text-gray-600">
          学习48个国际音标，掌握标准发音
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={twMerge(
              clsx(
                'px-6 py-3 rounded-xl font-medium transition-all',
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

      {/* Phonics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {displayPhonics.map((phonics) => (
          <Card
            key={phonics.symbol}
            hover
            className={twMerge(
              clsx(
                'cursor-pointer border-2',
                selectedPhonics?.symbol === phonics.symbol
                  ? 'border-purple-500'
                  : 'border-transparent'
              )
            )}
            onClick={() => setSelectedPhonics(phonics)}
          >
            <div className="flex items-center gap-4">
              <div className={twMerge(
                clsx(
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold',
                  phonics.type === 'vowel'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-cyan-100 text-cyan-600'
                )
              )}>
                {phonics.symbol}
              </div>
              <div className="flex-1">
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
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {phonics.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Phonics Detail */}
      {selectedPhonics && (
        <Card className="bg-gradient-to-br from-purple-50 to-cyan-50">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Symbol and Audio */}
            <div className="text-center">
              <div className={twMerge(
                clsx(
                  'w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-5xl font-bold mb-6 shadow-lg',
                  selectedPhonics.type === 'vowel'
                    ? 'bg-purple-500 text-white'
                    : 'bg-cyan-500 text-white'
                )
              )}>
                {selectedPhonics.symbol}
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                <AudioPlayer 
                  text={selectedPhonics.exampleWords[0]} 
                  size="lg" 
                />
                <AudioPlayer 
                  text={selectedPhonics.exampleWords[1] || selectedPhonics.exampleWords[0]} 
                  size="lg" 
                  variant="secondary"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {selectedPhonics.exampleWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-gray-700 shadow-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                发音说明
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedPhonics.description}
              </p>
              
              {selectedPhonics.mouthShape && (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    口型示意
                  </h3>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-600">
                      {selectedPhonics.mouthShape}
                    </p>
                  </div>
                </>
              )}
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-700">
                  💡 提示：点击播放按钮听例词发音，模仿练习可以帮助你掌握正确的发音方式。
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
