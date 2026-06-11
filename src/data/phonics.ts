import { Phonics } from '@/types'

// 48个国际音标
export const phonicsData: Phonics[] = [
  // 元音 - 单元音
  {
    symbol: '/iː/',
    type: 'vowel',
    exampleWords: ['see', 'tea', 'me', 'be'],
    description: '长元音，发音时舌尖抵下齿，舌前部抬高，嘴唇向两旁展开',
    mouthShape: '嘴角向两边展开，像微笑一样'
  },
  {
    symbol: '/ɪ/',
    type: 'vowel',
    exampleWords: ['it', 'is', 'this', 'big'],
    description: '短元音，发音短促，舌前部稍抬高',
    mouthShape: '嘴唇微张，比/iː/放松'
  },
  {
    symbol: '/e/',
    type: 'vowel',
    exampleWords: ['pen', 'bed', 'red', 'yes'],
    description: '短元音，舌尖抵下齿，舌前部稍抬起',
    mouthShape: '嘴巴半开，舌头平放'
  },
  {
    symbol: '/æ/',
    type: 'vowel',
    exampleWords: ['cat', 'hat', 'map', 'bag'],
    description: '短元音，舌尖抵下齿，嘴巴张大',
    mouthShape: '嘴巴张大，像咬大苹果一样'
  },
  {
    symbol: '/ɑː/',
    type: 'vowel',
    exampleWords: ['car', 'far', 'star', 'arm'],
    description: '长元音，嘴巴张大，舌身平放',
    mouthShape: '嘴巴张大，舌头放平'
  },
  {
    symbol: '/ɒ/',
    type: 'vowel',
    exampleWords: ['hot', 'dog', 'box', 'stop'],
    description: '短元音，嘴巴圆，舌后部稍抬起',
    mouthShape: '嘴巴圆小，像吹蜡烛'
  },
  {
    symbol: '/ɔː/',
    type: 'vowel',
    exampleWords: ['door', 'four', 'more', 'ball'],
    description: '长元音，嘴巴圆，舌后部抬高',
    mouthShape: '嘴巴圆大，嘴唇突出'
  },
  {
    symbol: '/ʊ/',
    type: 'vowel',
    exampleWords: ['book', 'good', 'look', 'put'],
    description: '短元音，嘴巴圆小，舌后部抬起',
    mouthShape: '嘴巴圆小，嘴唇微突'
  },
  {
    symbol: '/uː/',
    type: 'vowel',
    exampleWords: ['too', 'food', 'moon', 'school'],
    description: '长元音，嘴巴圆小，舌后部抬高',
    mouthShape: '嘴巴圆小，嘴唇向前突出'
  },
  {
    symbol: '/ʌ/',
    type: 'vowel',
    exampleWords: ['cup', 'bus', 'but', 'sun'],
    description: '短元音，嘴巴半开，舌中部稍抬起',
    mouthShape: '嘴巴半开，舌头放松'
  },
  {
    symbol: '/ɜː/',
    type: 'vowel',
    exampleWords: ['bird', 'girl', 'word', 'work'],
    description: '长元音，嘴巴半开，舌中部抬起',
    mouthShape: '嘴巴半开，舌头中部抬起'
  },
  {
    symbol: '/ə/',
    type: 'vowel',
    exampleWords: ['about', 'teacher', 'paper', 'banana'],
    description: '短元音，嘴巴半开，舌中部稍抬起，最轻松的音',
    mouthShape: '嘴巴微张，舌头完全放松'
  },

  // 元音 - 双元音
  {
    symbol: '/eɪ/',
    type: 'vowel',
    exampleWords: ['day', 'say', 'make', 'cake'],
    description: '双元音，从/e/滑向/ɪ/',
    mouthShape: '先嘴巴半开，再向两边展开'
  },
  {
    symbol: '/aɪ/',
    type: 'vowel',
    exampleWords: ['my', 'time', 'like', 'bike'],
    description: '双元音，从/a/滑向/ɪ/',
    mouthShape: '先嘴巴张大，再向两边展开'
  },
  {
    symbol: '/ɔɪ/',
    type: 'vowel',
    exampleWords: ['boy', 'toy', 'coin', 'voice'],
    description: '双元音，从/ɔ/滑向/ɪ/',
    mouthShape: '先嘴巴圆，再向两边展开'
  },
  {
    symbol: '/aʊ/',
    type: 'vowel',
    exampleWords: ['now', 'how', 'house', 'mouse'],
    description: '双元音，从/a/滑向/ʊ/',
    mouthShape: '先嘴巴张大，再变圆'
  },
  {
    symbol: '/əʊ/',
    type: 'vowel',
    exampleWords: ['go', 'no', 'home', 'phone'],
    description: '双元音，从/ə/滑向/ʊ/',
    mouthShape: '先嘴巴半开，再变圆突出'
  },
  {
    symbol: '/ɪə/',
    type: 'vowel',
    exampleWords: ['ear', 'here', 'near', 'dear'],
    description: '双元音，从/ɪ/滑向/ə/',
    mouthShape: '先向两边展开，再放松'
  },
  {
    symbol: '/eə/',
    type: 'vowel',
    exampleWords: ['air', 'hair', 'care', 'fair'],
    description: '双元音，从/e/滑向/ə/',
    mouthShape: '先嘴巴半开，再放松'
  },
  {
    symbol: '/ʊə/',
    type: 'vowel',
    exampleWords: ['sure', 'pure', 'tour', 'poor'],
    description: '双元音，从/ʊ/滑向/ə/',
    mouthShape: '先嘴巴圆，再放松'
  },

  // 辅音 - 爆破音
  {
    symbol: '/p/',
    type: 'consonant',
    exampleWords: ['pen', 'map', 'cup', 'pig'],
    description: '清辅音，双唇紧闭，突然张开',
    mouthShape: '双唇紧闭，然后突然张开，像吹蜡烛'
  },
  {
    symbol: '/b/',
    type: 'consonant',
    exampleWords: ['bag', 'big', 'bus', 'book'],
    description: '浊辅音，双唇紧闭，突然张开',
    mouthShape: '双唇紧闭，然后突然张开，声带振动'
  },
  {
    symbol: '/t/',
    type: 'consonant',
    exampleWords: ['tea', 'cat', 'sit', 'top'],
    description: '清辅音，舌尖抵上齿龈，突然离开',
    mouthShape: '舌尖抵住上齿龈，然后突然离开'
  },
  {
    symbol: '/d/',
    type: 'consonant',
    exampleWords: ['dog', 'bed', 'red', 'day'],
    description: '浊辅音，舌尖抵上齿龈，突然离开',
    mouthShape: '舌尖抵住上齿龈，然后突然离开，声带振动'
  },
  {
    symbol: '/k/',
    type: 'consonant',
    exampleWords: ['cat', 'book', 'like', 'key'],
    description: '清辅音，舌后部抵软腭，突然离开',
    mouthShape: '舌后部抬起抵住软腭，然后突然离开'
  },
  {
    symbol: '/g/',
    type: 'consonant',
    exampleWords: ['go', 'big', 'dog', 'good'],
    description: '浊辅音，舌后部抵软腭，突然离开',
    mouthShape: '舌后部抬起抵住软腭，然后突然离开，声带振动'
  },

  // 辅音 - 摩擦音
  {
    symbol: '/f/',
    type: 'consonant',
    exampleWords: ['fish', 'five', 'leaf', 'food'],
    description: '清辅音，上齿咬下唇',
    mouthShape: '上齿轻咬下唇，气流从缝隙中挤出'
  },
  {
    symbol: '/v/',
    type: 'consonant',
    exampleWords: ['very', 'love', 'five', 'have'],
    description: '浊辅音，上齿咬下唇',
    mouthShape: '上齿轻咬下唇，声带振动'
  },
  {
    symbol: '/θ/',
    type: 'consonant',
    exampleWords: ['think', 'three', 'mouth', 'thank'],
    description: '清辅音，舌尖放在上下齿之间',
    mouthShape: '舌尖放在上下齿之间，气流从缝隙中挤出'
  },
  {
    symbol: '/ð/',
    type: 'consonant',
    exampleWords: ['this', 'that', 'mother', 'they'],
    description: '浊辅音，舌尖放在上下齿之间',
    mouthShape: '舌尖放在上下齿之间，声带振动'
  },
  {
    symbol: '/s/',
    type: 'consonant',
    exampleWords: ['sun', 'see', 'bus', 'yes'],
    description: '清辅音，舌尖靠近上齿龈',
    mouthShape: '舌尖靠近上齿龈，气流从缝隙中挤出'
  },
  {
    symbol: '/z/',
    type: 'consonant',
    exampleWords: ['zoo', 'zero', 'is', 'his'],
    description: '浊辅音，舌尖靠近上齿龈',
    mouthShape: '舌尖靠近上齿龈，声带振动'
  },
  {
    symbol: '/ʃ/',
    type: 'consonant',
    exampleWords: ['she', 'ship', 'fish', 'shoe'],
    description: '清辅音，舌身抬起靠近硬腭',
    mouthShape: '舌身抬起靠近硬腭，嘴唇微圆'
  },
  {
    symbol: '/ʒ/',
    type: 'consonant',
    exampleWords: ['television', 'pleasure', 'vision'],
    description: '浊辅音，舌身抬起靠近硬腭',
    mouthShape: '舌身抬起靠近硬腭，嘴唇微圆，声带振动'
  },
  {
    symbol: '/h/',
    type: 'consonant',
    exampleWords: ['he', 'hat', 'hot', 'happy'],
    description: '清辅音，声门打开',
    mouthShape: '嘴巴张开，像哈气一样'
  },
  {
    symbol: '/r/',
    type: 'consonant',
    exampleWords: ['red', 'run', 'car', 'tree'],
    description: '浊辅音，舌尖向上卷起',
    mouthShape: '舌尖向上卷起，不接触任何部位'
  },

  // 辅音 - 破擦音
  {
    symbol: '/tʃ/',
    type: 'consonant',
    exampleWords: ['chair', 'teacher', 'lunch', 'much'],
    description: '清辅音，先发/t/再发/ʃ/',
    mouthShape: '舌尖抵住上齿龈，然后舌身抬起'
  },
  {
    symbol: '/dʒ/',
    type: 'consonant',
    exampleWords: ['page', 'orange', 'bridge', 'age'],
    description: '浊辅音，先发/d/再发/ʒ/',
    mouthShape: '舌尖抵住上齿龈，然后舌身抬起，声带振动'
  },

  // 辅音 - 鼻音
  {
    symbol: '/m/',
    type: 'consonant',
    exampleWords: ['map', 'mom', 'name', 'time'],
    description: '浊辅音，双唇紧闭，气流从鼻腔出来',
    mouthShape: '双唇紧闭，气流从鼻腔出来'
  },
  {
    symbol: '/n/',
    type: 'consonant',
    exampleWords: ['no', 'pen', 'sun', 'name'],
    description: '浊辅音，舌尖抵上齿龈，气流从鼻腔出来',
    mouthShape: '舌尖抵住上齿龈，气流从鼻腔出来'
  },
  {
    symbol: '/ŋ/',
    type: 'consonant',
    exampleWords: ['sing', 'ring', 'think', 'bank'],
    description: '浊辅音，舌后部抵软腭，气流从鼻腔出来',
    mouthShape: '舌后部抬起抵住软腭，气流从鼻腔出来'
  },

  // 辅音 - 半元音
  {
    symbol: '/l/',
    type: 'consonant',
    exampleWords: ['leg', 'look', 'ball', 'tall'],
    description: '浊辅音，舌尖抵上齿龈',
    mouthShape: '舌尖抵住上齿龈，气流从舌两侧出来'
  },
  {
    symbol: '/w/',
    type: 'consonant',
    exampleWords: ['we', 'way', 'want', 'what'],
    description: '浊辅音，双唇收圆并突出',
    mouthShape: '双唇收圆并向前突出'
  },
  {
    symbol: '/j/',
    type: 'consonant',
    exampleWords: ['yes', 'you', 'year', 'yellow'],
    description: '浊辅音，舌前部抬起靠近硬腭',
    mouthShape: '舌前部抬起靠近硬腭，嘴巴微张'
  }
]

// 获取元音
export function getVowels(): Phonics[] {
  return phonicsData.filter(p => p.type === 'vowel')
}

// 获取辅音
export function getConsonants(): Phonics[] {
  return phonicsData.filter(p => p.type === 'consonant')
}

// 根据符号获取音标
export function getPhonicsBySymbol(symbol: string): Phonics | undefined {
  return phonicsData.find(p => p.symbol === symbol)
}
