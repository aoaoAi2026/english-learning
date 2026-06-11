import { Word } from '@/types'

// 一年级单词 - 基础词汇
export const grade1Words: Word[] = [
  {
    id: 'g1-w1',
    text: 'apple',
    phonetic: '/ˈæpl/',
    meaning: '苹果',
    example: 'I like to eat an apple.',
    exampleMeaning: '我喜欢吃苹果。',
    unit: '水果',
    memoryTips: [
      { type: 'association', content: 'a(一个) + pple(听起来像"泡泡") → 一个红红的泡泡苹果' },
      { type: 'story', content: '小苹果圆又圆，红红脸蛋真可爱，咬一口甜又脆，营养美味人人爱。' }
    ]
  },
  {
    id: 'g1-w2',
    text: 'banana',
    phonetic: '/bəˈnɑːnə/',
    meaning: '香蕉',
    example: 'The banana is yellow.',
    exampleMeaning: '香蕉是黄色的。',
    unit: '水果',
    memoryTips: [
      { type: 'association', content: 'ba(爸) + nana(奶奶) → 爸爸和奶奶都爱吃香蕉' },
      { type: 'image', content: '想象一根弯弯的黄色香蕉，像弯弯的月亮' }
    ]
  },
  {
    id: 'g1-w3',
    text: 'cat',
    phonetic: '/kæt/',
    meaning: '猫',
    example: 'The cat is sleeping.',
    exampleMeaning: '猫在睡觉。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'cat → 喵喵叫的小猫咪' },
      { type: 'story', content: '小猫咪，喵喵叫，爱吃鱼，爱睡觉，毛茸茸真可爱。' }
    ]
  },
  {
    id: 'g1-w4',
    text: 'dog',
    phonetic: '/dɒɡ/',
    meaning: '狗',
    example: 'I have a dog.',
    exampleMeaning: '我有一只狗。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'dog → 汪汪叫的小狗' },
      { type: 'story', content: '小狗汪汪叫，看家护院好帮手，摇尾巴表示友好。' }
    ]
  },
  {
    id: 'g1-w5',
    text: 'egg',
    phonetic: '/eɡ/',
    meaning: '蛋',
    example: 'I eat an egg for breakfast.',
    exampleMeaning: '我早餐吃一个蛋。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'egg → 圆圆的鸡蛋' },
      { type: 'image', content: '想象一个椭圆形的鸡蛋，外面是壳，里面是蛋白和蛋黄' }
    ]
  },
  {
    id: 'g1-w6',
    text: 'fish',
    phonetic: '/fɪʃ/',
    meaning: '鱼',
    example: 'The fish swims in water.',
    exampleMeaning: '鱼在水里游泳。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'fish → 水里游的小鱼' },
      { type: 'story', content: '小鱼儿，水中游，摇摇尾巴点点头，快乐自在真逍遥。' }
    ]
  },
  {
    id: 'g1-w7',
    text: 'girl',
    phonetic: '/ɡɜːl/',
    meaning: '女孩',
    example: 'She is a good girl.',
    exampleMeaning: '她是个好女孩。',
    unit: '人物',
    memoryTips: [
      { type: 'association', content: 'girl → 扎辫子的小女孩' }
    ]
  },
  {
    id: 'g1-w8',
    text: 'boy',
    phonetic: '/bɔɪ/',
    meaning: '男孩',
    example: 'The boy is playing.',
    exampleMeaning: '男孩在玩耍。',
    unit: '人物',
    memoryTips: [
      { type: 'association', content: 'boy → 活泼的小男孩' }
    ]
  },
  {
    id: 'g1-w9',
    text: 'hand',
    phonetic: '/hænd/',
    meaning: '手',
    example: 'Wash your hands.',
    exampleMeaning: '洗洗你的手。',
    unit: '身体',
    memoryTips: [
      { type: 'association', content: 'hand → 五根手指的手' },
      { type: 'story', content: '小手小手真灵巧，写字画画都靠它，饭前便后要洗手。' }
    ]
  },
  {
    id: 'g1-w10',
    text: 'eye',
    phonetic: '/aɪ/',
    meaning: '眼睛',
    example: 'Close your eyes.',
    exampleMeaning: '闭上你的眼睛。',
    unit: '身体',
    memoryTips: [
      { type: 'association', content: 'eye → 两只圆圆的眼睛' },
      { type: 'image', content: '想象眼睛像两个圆圆的窗户，可以看到美丽的世界' }
    ]
  },
  {
    id: 'g1-w11',
    text: 'nose',
    phonetic: '/nəʊz/',
    meaning: '鼻子',
    example: 'My nose is small.',
    exampleMeaning: '我的鼻子很小。',
    unit: '身体',
    memoryTips: [
      { type: 'association', content: 'nose → 脸中间的鼻子' }
    ]
  },
  {
    id: 'g1-w12',
    text: 'mouth',
    phonetic: '/maʊθ/',
    meaning: '嘴巴',
    example: 'Open your mouth.',
    exampleMeaning: '张开你的嘴巴。',
    unit: '身体',
    memoryTips: [
      { type: 'association', content: 'mouth → 吃东西说话的嘴巴' }
    ]
  },
  {
    id: 'g1-w13',
    text: 'red',
    phonetic: '/red/',
    meaning: '红色',
    example: 'The apple is red.',
    exampleMeaning: '苹果是红色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'red → 红红的苹果' }
    ]
  },
  {
    id: 'g1-w14',
    text: 'blue',
    phonetic: '/bluː/',
    meaning: '蓝色',
    example: 'The sky is blue.',
    exampleMeaning: '天空是蓝色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'blue → 蓝蓝的天空' }
    ]
  },
  {
    id: 'g1-w15',
    text: 'green',
    phonetic: '/ɡriːn/',
    meaning: '绿色',
    example: 'The grass is green.',
    exampleMeaning: '草地是绿色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'green → 绿绿的草地' }
    ]
  },
  {
    id: 'g1-w16',
    text: 'yellow',
    phonetic: '/ˈjeləʊ/',
    meaning: '黄色',
    example: 'The banana is yellow.',
    exampleMeaning: '香蕉是黄色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'yellow → 黄黄的香蕉' }
    ]
  },
  {
    id: 'g1-w17',
    text: 'one',
    phonetic: '/wʌn/',
    meaning: '一',
    example: 'I have one book.',
    exampleMeaning: '我有一本书。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'one → 1，像一根小棍子' }
    ]
  },
  {
    id: 'g1-w18',
    text: 'two',
    phonetic: '/tuː/',
    meaning: '二',
    example: 'I have two hands.',
    exampleMeaning: '我有两只手。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'two → 2，像一只小鸭子' }
    ]
  },
  {
    id: 'g1-w19',
    text: 'three',
    phonetic: '/θriː/',
    meaning: '三',
    example: 'There are three apples.',
    exampleMeaning: '有三个苹果。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'three → 3，像耳朵听声音' }
    ]
  },
  {
    id: 'g1-w20',
    text: 'four',
    phonetic: '/fɔː/',
    meaning: '四',
    example: 'A dog has four legs.',
    exampleMeaning: '狗有四条腿。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'four → 4，像小旗飘啊飘' }
    ]
  },
  {
    id: 'g1-w21',
    text: 'five',
    phonetic: '/faɪv/',
    meaning: '五',
    example: 'I have five fingers.',
    exampleMeaning: '我有五根手指。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'five → 5，像钩子挂东西' }
    ]
  },
  {
    id: 'g1-w22',
    text: 'book',
    phonetic: '/bʊk/',
    meaning: '书',
    example: 'I read a book.',
    exampleMeaning: '我看书。',
    unit: '学习用品',
    memoryTips: [
      { type: 'association', content: 'book → 翻开的书本' },
      { type: 'story', content: '小书本，知识多，翻开看看真有趣，学到本领长智慧。' }
    ]
  },
  {
    id: 'g1-w23',
    text: 'pen',
    phonetic: '/pen/',
    meaning: '钢笔',
    example: 'This is my pen.',
    exampleMeaning: '这是我的钢笔。',
    unit: '学习用品',
    memoryTips: [
      { type: 'association', content: 'pen → 写字的笔' }
    ]
  },
  {
    id: 'g1-w24',
    text: 'pencil',
    phonetic: '/ˈpensl/',
    meaning: '铅笔',
    example: 'I write with a pencil.',
    exampleMeaning: '我用铅笔写字。',
    unit: '学习用品',
    memoryTips: [
      { type: 'association', content: 'pen(笔) + cil → 铅笔' }
    ]
  },
  {
    id: 'g1-w25',
    text: 'ruler',
    phonetic: '/ˈruːlə/',
    meaning: '尺子',
    example: 'Use a ruler to draw a line.',
    exampleMeaning: '用尺子画线。',
    unit: '学习用品',
    memoryTips: [
      { type: 'association', content: 'ruler → 直直的尺子' }
    ]
  },
  {
    id: 'g1-w26',
    text: 'bag',
    phonetic: '/bæɡ/',
    meaning: '书包',
    example: 'My bag is heavy.',
    exampleMeaning: '我的书包很重。',
    unit: '学习用品',
    memoryTips: [
      { type: 'association', content: 'bag → 装东西的袋子' }
    ]
  },
  {
    id: 'g1-w27',
    text: 'mother',
    phonetic: '/ˈmʌðə/',
    meaning: '妈妈',
    example: 'I love my mother.',
    exampleMeaning: '我爱我的妈妈。',
    unit: '家庭',
    memoryTips: [
      { type: 'association', content: 'mother → 亲爱的妈妈' }
    ]
  },
  {
    id: 'g1-w28',
    text: 'father',
    phonetic: '/ˈfɑːðə/',
    meaning: '爸爸',
    example: 'My father is tall.',
    exampleMeaning: '我爸爸很高。',
    unit: '家庭',
    memoryTips: [
      { type: 'association', content: 'father → 高大的爸爸' }
    ]
  },
  {
    id: 'g1-w29',
    text: 'teacher',
    phonetic: '/ˈtiːtʃə/',
    meaning: '老师',
    example: 'The teacher is kind.',
    exampleMeaning: '老师很和蔼。',
    unit: '人物',
    memoryTips: [
      { type: 'association', content: 'teach(教) + er(人) → 教书的人，老师' }
    ]
  },
  {
    id: 'g1-w30',
    text: 'school',
    phonetic: '/skuːl/',
    meaning: '学校',
    example: 'I go to school.',
    exampleMeaning: '我去上学。',
    unit: '场所',
    memoryTips: [
      { type: 'association', content: 'school → 学习的学校' },
      { type: 'story', content: '学校是我家，老师像妈妈，同学像兄妹，快乐学习长本领。' }
    ]
  },
  {
    id: 'g1-w31',
    text: 'water',
    phonetic: '/ˈwɔːtə/',
    meaning: '水',
    example: 'I drink water.',
    exampleMeaning: '我喝水。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'water → 清清的水' }
    ]
  },
  {
    id: 'g1-w32',
    text: 'milk',
    phonetic: '/mɪlk/',
    meaning: '牛奶',
    example: 'Milk is white.',
    exampleMeaning: '牛奶是白色的。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'milk → 白白的牛奶' }
    ]
  },
  {
    id: 'g1-w33',
    text: 'bird',
    phonetic: '/bɜːd/',
    meaning: '鸟',
    example: 'The bird can fly.',
    exampleMeaning: '鸟会飞。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'bird → 天空飞翔的小鸟' }
    ]
  },
  {
    id: 'g1-w34',
    text: 'tree',
    phonetic: '/triː/',
    meaning: '树',
    example: 'The tree is tall.',
    exampleMeaning: '树很高。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'tree → 高高的大树' }
    ]
  },
  {
    id: 'g1-w35',
    text: 'sun',
    phonetic: '/sʌn/',
    meaning: '太阳',
    example: 'The sun is bright.',
    exampleMeaning: '太阳很亮。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'sun → 圆圆的太阳' }
    ]
  },
  {
    id: 'g1-w36',
    text: 'moon',
    phonetic: '/muːn/',
    meaning: '月亮',
    example: 'The moon is round.',
    exampleMeaning: '月亮是圆的。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'moon → 夜空中的月亮' },
      { type: 'story', content: '月亮弯弯像小船，月亮圆圆像玉盘，照亮夜空真好看。' }
    ]
  },
  {
    id: 'g1-w37',
    text: 'star',
    phonetic: '/stɑː/',
    meaning: '星星',
    example: 'Stars shine at night.',
    exampleMeaning: '星星在夜晚闪烁。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'star → 闪闪的小星星' }
    ]
  },
  {
    id: 'g1-w38',
    text: 'sky',
    phonetic: '/skaɪ/',
    meaning: '天空',
    example: 'The sky is blue.',
    exampleMeaning: '天空是蓝色的。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'sky → 蓝蓝的天空' }
    ]
  },
  {
    id: 'g1-w39',
    text: 'cloud',
    phonetic: '/klaʊd/',
    meaning: '云',
    example: 'The cloud is white.',
    exampleMeaning: '云是白色的。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'cloud → 白白的云朵' }
    ]
  },
  {
    id: 'g1-w40',
    text: 'rain',
    phonetic: '/reɪn/',
    meaning: '雨',
    example: 'It is raining.',
    exampleMeaning: '天在下雨。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'rain → 滴滴答答的雨' }
    ]
  },
  {
    id: 'g1-w41',
    text: 'flower',
    phonetic: '/ˈflaʊə/',
    meaning: '花',
    example: 'The flower is beautiful.',
    exampleMeaning: '花很漂亮。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'flower → 漂亮的花朵' }
    ]
  },
  {
    id: 'g1-w42',
    text: 'grass',
    phonetic: '/ɡrɑːs/',
    meaning: '草',
    example: 'The grass is green.',
    exampleMeaning: '草是绿色的。',
    unit: '自然',
    memoryTips: [
      { type: 'association', content: 'grass → 绿绿的小草' }
    ]
  },
  {
    id: 'g1-w43',
    text: 'orange',
    phonetic: '/ˈɒrɪndʒ/',
    meaning: '橙色；橙子',
    example: 'I have an orange.',
    exampleMeaning: '我有一个橙子。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'orange → 橙色的橙子' }
    ]
  },
  {
    id: 'g1-w44',
    text: 'black',
    phonetic: '/blæk/',
    meaning: '黑色',
    example: 'The cat is black.',
    exampleMeaning: '这只猫是黑色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'black → 黑黑的颜色' }
    ]
  },
  {
    id: 'g1-w45',
    text: 'white',
    phonetic: '/waɪt/',
    meaning: '白色',
    example: 'The snow is white.',
    exampleMeaning: '雪是白色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'white → 白白的颜色' }
    ]
  },
  {
    id: 'g1-w46',
    text: 'pink',
    phonetic: '/pɪŋk/',
    meaning: '粉色',
    example: 'The flower is pink.',
    exampleMeaning: '花是粉色的。',
    unit: '颜色',
    memoryTips: [
      { type: 'association', content: 'pink → 粉色的花' }
    ]
  },
  {
    id: 'g1-w47',
    text: 'six',
    phonetic: '/sɪks/',
    meaning: '六',
    example: 'I have six apples.',
    exampleMeaning: '我有六个苹果。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'six → 6，像哨子吹一吹' }
    ]
  },
  {
    id: 'g1-w48',
    text: 'seven',
    phonetic: '/ˈsevn/',
    meaning: '七',
    example: 'Seven days in a week.',
    exampleMeaning: '一周有七天。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'seven → 7，像镰刀割草草' }
    ]
  },
  {
    id: 'g1-w49',
    text: 'eight',
    phonetic: '/eɪt/',
    meaning: '八',
    example: 'Eight legs on a spider.',
    exampleMeaning: '蜘蛛有八条腿。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'eight → 8，像葫芦藤上挂' }
    ]
  },
  {
    id: 'g1-w50',
    text: 'nine',
    phonetic: '/naɪn/',
    meaning: '九',
    example: 'I have nine books.',
    exampleMeaning: '我有九本书。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'nine → 9，像蝌蚪水里游' }
    ]
  },
  {
    id: 'g1-w51',
    text: 'ten',
    phonetic: '/ten/',
    meaning: '十',
    example: 'I have ten toes.',
    exampleMeaning: '我有十个脚趾。',
    unit: '数字',
    memoryTips: [
      { type: 'association', content: 'ten → 10，像棒球加球棒' }
    ]
  },
  {
    id: 'g1-w52',
    text: 'dog',
    phonetic: '/dɒɡ/',
    meaning: '狗',
    example: 'The dog barks.',
    exampleMeaning: '狗在汪汪叫。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'dog → 汪汪的小狗' }
    ]
  },
  {
    id: 'g1-w53',
    text: 'rabbit',
    phonetic: '/ˈræbɪt/',
    meaning: '兔子',
    example: 'The rabbit jumps.',
    exampleMeaning: '兔子在跳。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'rabbit → 长耳朵的兔子' }
    ]
  },
  {
    id: 'g1-w54',
    text: 'duck',
    phonetic: '/dʌk/',
    meaning: '鸭子',
    example: 'The duck quacks.',
    exampleMeaning: '鸭子在嘎嘎叫。',
    unit: '动物',
    memoryTips: [
      { type: 'association', content: 'duck → 嘎嘎的鸭子' }
    ]
  },
  {
    id: 'g1-w55',
    text: 'bread',
    phonetic: '/bred/',
    meaning: '面包',
    example: 'I eat bread.',
    exampleMeaning: '我吃面包。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'bread → 软软的面包' }
    ]
  },
  {
    id: 'g1-w56',
    text: 'cake',
    phonetic: '/keɪk/',
    meaning: '蛋糕',
    example: 'The cake is sweet.',
    exampleMeaning: '蛋糕很甜。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'cake → 甜甜的蛋糕' }
    ]
  },
  {
    id: 'g1-w57',
    text: 'juice',
    phonetic: '/dʒuːs/',
    meaning: '果汁',
    example: 'I drink juice.',
    exampleMeaning: '我喝果汁。',
    unit: '食物',
    memoryTips: [
      { type: 'association', content: 'juice → 好喝的果汁' }
    ]
  },
  {
    id: 'g1-w58',
    text: 'ball',
    phonetic: '/bɔːl/',
    meaning: '球',
    example: 'I play with a ball.',
    exampleMeaning: '我玩球。',
    unit: '玩具',
    memoryTips: [
      { type: 'association', content: 'ball → 圆圆的球' }
    ]
  },
  {
    id: 'g1-w59',
    text: 'doll',
    phonetic: '/dɒl/',
    meaning: '洋娃娃',
    example: 'The doll is pretty.',
    exampleMeaning: '洋娃娃很漂亮。',
    unit: '玩具',
    memoryTips: [
      { type: 'association', content: 'doll → 可爱的洋娃娃' }
    ]
  },
  {
    id: 'g1-w60',
    text: 'toy',
    phonetic: '/tɔɪ/',
    meaning: '玩具',
    example: 'I like my toy car.',
    exampleMeaning: '我喜欢我的玩具车。',
    unit: '玩具',
    memoryTips: [
      { type: 'association', content: 'toy → 好玩的玩具' }
    ]
  },
  {
    id: 'g1-w61',
    text: 'car',
    phonetic: '/kɑː/',
    meaning: '小汽车',
    example: 'The car is red.',
    exampleMeaning: '小汽车是红色的。',
    unit: '交通',
    memoryTips: [
      { type: 'association', content: 'car → 会跑的小汽车' }
    ]
  },
  {
    id: 'g1-w62',
    text: 'bus',
    phonetic: '/bʌs/',
    meaning: '公共汽车',
    example: 'I take the bus to school.',
    exampleMeaning: '我坐公共汽车去学校。',
    unit: '交通',
    memoryTips: [
      { type: 'association', content: 'bus → 大大的公共汽车' }
    ]
  },
  {
    id: 'g1-w63',
    text: 'bike',
    phonetic: '/baɪk/',
    meaning: '自行车',
    example: 'I can ride a bike.',
    exampleMeaning: '我会骑自行车。',
    unit: '交通',
    memoryTips: [
      { type: 'association', content: 'bike → 两个轮子的自行车' }
    ]
  },
  {
    id: 'g1-w64',
    text: 'yes',
    phonetic: '/jes/',
    meaning: '是的',
    example: 'Yes, I can.',
    exampleMeaning: '是的，我可以。',
    unit: '日常用语',
    memoryTips: [
      { type: 'association', content: 'yes → 点头说"是的"' }
    ]
  },
  {
    id: 'g1-w65',
    text: 'no',
    phonetic: '/nəʊ/',
    meaning: '不；没有',
    example: 'No, thank you.',
    exampleMeaning: '不，谢谢。',
    unit: '日常用语',
    memoryTips: [
      { type: 'association', content: 'no → 摇头说"不"' }
    ]
  }
]
