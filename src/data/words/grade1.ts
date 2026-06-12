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
  },
  // === 扩展词汇（颜色、身体、自然、食物等）===
  { id:'g1-w66',text:'purple',phonetic:'/ˈpɜːpl/',meaning:'紫色',example:'The grape is purple.',exampleMeaning:'葡萄是紫色的。',unit:'颜色',memoryTips:[{type:'association',content:'purple → 紫色葡萄'}] },
  { id:'g1-w67',text:'brown',phonetic:'/braʊn/',meaning:'棕色',example:'The bear is brown.',exampleMeaning:'熊是棕色的。',unit:'颜色',memoryTips:[{type:'association',content:'brown → 棕色小熊'}] },
  { id:'g1-w68',text:'gray',phonetic:'/ɡreɪ/',meaning:'灰色',example:'The cloud is gray.',exampleMeaning:'云是灰色的。',unit:'颜色',memoryTips:[{type:'association',content:'gray → 阴天的灰'}] },
  { id:'g1-w69',text:'gold',phonetic:'/ɡəʊld/',meaning:'金色',example:'The star is gold.',exampleMeaning:'星星是金色的。',unit:'颜色',memoryTips:[{type:'association',content:'gold → 金色星星'}] },
  { id:'g1-w70',text:'silver',phonetic:'/ˈsɪlvə/',meaning:'银色',example:'The moon is silver.',exampleMeaning:'月亮是银色的。',unit:'颜色',memoryTips:[{type:'association',content:'silver → 银色月光'}] },
  { id:'g1-w71',text:'spoon',phonetic:'/spuːn/',meaning:'勺子',example:'I eat soup with a spoon.',exampleMeaning:'我用勺子喝汤。',unit:'餐具',memoryTips:[{type:'association',content:'spoon → 圆圆勺子'}] },
  { id:'g1-w72',text:'fork',phonetic:'/fɔːk/',meaning:'叉子',example:'Use a fork to eat.',exampleMeaning:'用叉子吃饭。',unit:'餐具',memoryTips:[{type:'association',content:'fork → 尖尖叉子'}] },
  { id:'g1-w73',text:'knife',phonetic:'/naɪf/',meaning:'刀',example:'Cut with a knife.',exampleMeaning:'用刀切东西。',unit:'餐具',memoryTips:[{type:'association',content:'knife → 锋利小刀'}] },
  { id:'g1-w74',text:'plate',phonetic:'/pleɪt/',meaning:'盘子',example:'The cake is on the plate.',exampleMeaning:'蛋糕在盘子上。',unit:'餐具',memoryTips:[{type:'association',content:'plate → 圆圆盘子'}] },
  { id:'g1-w75',text:'cup',phonetic:'/kʌp/',meaning:'杯子',example:'I drink milk from a cup.',exampleMeaning:'我用杯子喝牛奶。',unit:'餐具',memoryTips:[{type:'association',content:'cup → 喝水杯子'}] },
  { id:'g1-w76',text:'bowl',phonetic:'/bəʊl/',meaning:'碗',example:'Rice is in the bowl.',exampleMeaning:'米饭在碗里。',unit:'餐具',memoryTips:[{type:'association',content:'bowl → 深深大碗'}] },
  { id:'g1-w77',text:'ant',phonetic:'/ænt/',meaning:'蚂蚁',example:'The ant is very small.',exampleMeaning:'蚂蚁很小。',unit:'动物',memoryTips:[{type:'association',content:'ant → 小蚂蚁'}] },
  { id:'g1-w78',text:'bee',phonetic:'/biː/',meaning:'蜜蜂',example:'The bee makes honey.',exampleMeaning:'蜜蜂会酿蜜。',unit:'动物',memoryTips:[{type:'association',content:'bee → 采蜜小蜂'}] },
  { id:'g1-w79',text:'frog',phonetic:'/frɒɡ/',meaning:'青蛙',example:'The frog jumps high.',exampleMeaning:'青蛙跳得很高。',unit:'动物',memoryTips:[{type:'association',content:'frog → 蹦跳青蛙'}] },
  { id:'g1-w80',text:'snake',phonetic:'/sneɪk/',meaning:'蛇',example:'The snake is long.',exampleMeaning:'蛇很长。',unit:'动物',memoryTips:[{type:'association',content:'snake → 长长小蛇'}] },
  { id:'g1-w81',text:'lion',phonetic:'/ˈlaɪən/',meaning:'狮子',example:'The lion is the king.',exampleMeaning:'狮子是百兽之王。',unit:'动物',memoryTips:[{type:'association',content:'lion → 威武狮子'}] },
  { id:'g1-w82',text:'tiger',phonetic:'/ˈtaɪɡə/',meaning:'老虎',example:'The tiger is strong.',exampleMeaning:'老虎很强壮。',unit:'动物',memoryTips:[{type:'association',content:'tiger → 强壮老虎'}] },
  { id:'g1-w83',text:'monkey',phonetic:'/ˈmʌŋki/',meaning:'猴子',example:'The monkey is funny.',exampleMeaning:'猴子很有趣。',unit:'动物',memoryTips:[{type:'association',content:'monkey → 调皮猴子'}] },
  { id:'g1-w84',text:'panda',phonetic:'/ˈpændə/',meaning:'熊猫',example:'I love the panda.',exampleMeaning:'我爱熊猫。',unit:'动物',memoryTips:[{type:'association',content:'panda → 可爱熊猫'}] },
  { id:'g1-w85',text:'rabbit',phonetic:'/ˈræbɪt/',meaning:'兔子',example:'The rabbit is white.',exampleMeaning:'兔子是白色的。',unit:'动物',memoryTips:[{type:'association',content:'rabbit → 雪白兔子'}] },
  { id:'g1-w86',text:'elephant',phonetic:'/ˈelɪfənt/',meaning:'大象',example:'The elephant is big.',exampleMeaning:'大象很大。',unit:'动物',memoryTips:[{type:'association',content:'elephant → 大大大象'}] },
  { id:'g1-w87',text:'turtle',phonetic:'/ˈtɜːtl/',meaning:'乌龟',example:'The turtle walks slowly.',exampleMeaning:'乌龟走得很慢。',unit:'动物',memoryTips:[{type:'association',content:'turtle → 慢吞吞乌龟'}] },
  { id:'g1-w88',text:'hand',phonetic:'/hænd/',meaning:'手',example:'Wash your hands.',exampleMeaning:'洗洗你的手。',unit:'身体',memoryTips:[{type:'association',content:'hand → 两只小手'}] },
  { id:'g1-w89',text:'foot',phonetic:'/fʊt/',meaning:'脚',example:'My foot hurts.',exampleMeaning:'我脚疼。',unit:'身体',memoryTips:[{type:'association',content:'foot → 小脚丫'}] },
  { id:'g1-w90',text:'arm',phonetic:'/ɑːm/',meaning:'手臂',example:'He broke his arm.',exampleMeaning:'他手臂骨折了。',unit:'身体',memoryTips:[{type:'association',content:'arm → 挥挥手'}] },
  { id:'g1-w91',text:'leg',phonetic:'/leɡ/',meaning:'腿',example:'She has long legs.',exampleMeaning:'她腿很长。',unit:'身体',memoryTips:[{type:'association',content:'leg → 大长腿'}] },
  { id:'g1-w92',text:'head',phonetic:'/hed/',meaning:'头',example:'I have a headache.',exampleMeaning:'我头痛。',unit:'身体',memoryTips:[{type:'association',content:'head → 圆圆的头'}] },
  { id:'g1-w93',text:'ear',phonetic:'/ɪə/',meaning:'耳朵',example:'Listen with your ears.',exampleMeaning:'用耳朵听。',unit:'身体',memoryTips:[{type:'association',content:'ear → 竖起耳朵'}] },
  { id:'g1-w94',text:'nose',phonetic:'/nəʊz/',meaning:'鼻子',example:'She has a small nose.',exampleMeaning:'她鼻子很小。',unit:'身体',memoryTips:[{type:'association',content:'nose → 小小鼻子'}] },
  { id:'g1-w95',text:'mouth',phonetic:'/maʊθ/',meaning:'嘴巴',example:'Open your mouth.',exampleMeaning:'张开你的嘴。',unit:'身体',memoryTips:[{type:'association',content:'mouth → 大大嘴巴'}] },
  { id:'g1-w96',text:'tooth',phonetic:'/tuːθ/',meaning:'牙齿',example:'The tooth is white.',exampleMeaning:'牙齿是白的。',unit:'身体',memoryTips:[{type:'association',content:'tooth → 白牙齿'}] },
  { id:'g1-w97',text:'hair',phonetic:'/heə/',meaning:'头发',example:'She has long hair.',exampleMeaning:'她头发很长。',unit:'身体',memoryTips:[{type:'association',content:'hair → 飘飘长发'}] },
  { id:'g1-w98',text:'sun',phonetic:'/sʌn/',meaning:'太阳',example:'The sun is bright.',exampleMeaning:'太阳很亮。',unit:'自然',memoryTips:[{type:'association',content:'sun → 明亮太阳'}] },
  { id:'g1-w99',text:'moon',phonetic:'/muːn/',meaning:'月亮',example:'The moon is full.',exampleMeaning:'月亮圆了。',unit:'自然',memoryTips:[{type:'association',content:'moon → 圆圆月亮'}] },
  { id:'g1-w100',text:'star',phonetic:'/stɑː/',meaning:'星星',example:'I see a star in the sky.',exampleMeaning:'我看到天上的星星。',unit:'自然',memoryTips:[{type:'association',content:'star → 闪闪星星'}] },
  { id:'g1-w101',text:'sky',phonetic:'/skaɪ/',meaning:'天空',example:'The sky is blue.',exampleMeaning:'天空是蓝色的。',unit:'自然',memoryTips:[{type:'association',content:'sky → 蓝蓝天空'}] },
  { id:'g1-w102',text:'wind',phonetic:'/wɪnd/',meaning:'风',example:'The wind is strong.',exampleMeaning:'风很大。',unit:'自然',memoryTips:[{type:'association',content:'wind → 呼呼刮风'}] },
  { id:'g1-w103',text:'snow',phonetic:'/snəʊ/',meaning:'雪',example:'Children play in the snow.',exampleMeaning:'孩子们在雪里玩。',unit:'自然',memoryTips:[{type:'association',content:'snow → 白雪纷飞'}] },
  { id:'g1-w104',text:'ice',phonetic:'/aɪs/',meaning:'冰',example:'The ice is cold.',exampleMeaning:'冰很冷。',unit:'自然',memoryTips:[{type:'association',content:'ice → 冰冰凉凉'}] },
  { id:'g1-w105',text:'fire',phonetic:'/ˈfaɪə/',meaning:'火',example:'Fire is hot.',exampleMeaning:'火很热。',unit:'自然',memoryTips:[{type:'association',content:'fire → 热热火焰'}] },
  { id:'g1-w106',text:'water',phonetic:'/ˈwɔːtə/',meaning:'水',example:'Drink more water.',exampleMeaning:'多喝点水。',unit:'自然',memoryTips:[{type:'association',content:'water → 生命之水'}] },
  { id:'g1-w107',text:'bread',phonetic:'/bred/',meaning:'面包',example:'I like bread for breakfast.',exampleMeaning:'我早饭喜欢吃面包。',unit:'食物',memoryTips:[{type:'association',content:'bread → 香甜面包'}] },
  { id:'g1-w108',text:'rice',phonetic:'/raɪs/',meaning:'米饭',example:'We eat rice every day.',exampleMeaning:'我们每天吃米饭。',unit:'食物',memoryTips:[{type:'association',content:'rice → 粒粒米饭'}] },
  { id:'g1-w109',text:'meat',phonetic:'/miːt/',meaning:'肉',example:'I like chicken meat.',exampleMeaning:'我喜欢吃鸡肉。',unit:'食物',memoryTips:[{type:'association',content:'meat → 美味肉肉'}] },
  { id:'g1-w110',text:'egg',phonetic:'/eɡ/',meaning:'鸡蛋',example:'The egg is fresh.',exampleMeaning:'鸡蛋很新鲜。',unit:'食物',memoryTips:[{type:'association',content:'egg → 圆滚鸡蛋'}] },
  { id:'g1-w111',text:'milk',phonetic:'/mɪlk/',meaning:'牛奶',example:'I drink milk every morning.',exampleMeaning:'我每天早上喝牛奶。',unit:'食物',memoryTips:[{type:'association',content:'milk → 白白牛奶'}] },
  { id:'g1-w112',text:'juice',phonetic:'/dʒuːs/',meaning:'果汁',example:'Orange juice is yummy.',exampleMeaning:'橙汁很好喝。',unit:'食物',memoryTips:[{type:'association',content:'juice → 酸甜果汁'}] },
  { id:'g1-w113',text:'candy',phonetic:'/ˈkændi/',meaning:'糖果',example:'I love candy.',exampleMeaning:'我喜欢糖果。',unit:'食物',memoryTips:[{type:'association',content:'candy → 甜美糖果'}] },
  { id:'g1-w114',text:'cake',phonetic:'/keɪk/',meaning:'蛋糕',example:'The cake is sweet.',exampleMeaning:'蛋糕很甜。',unit:'食物',memoryTips:[{type:'association',content:'cake → 绵软蛋糕'}] },
  { id:'g1-w115',text:'cookie',phonetic:'/ˈkʊki/',meaning:'饼干',example:'Have a cookie.',exampleMeaning:'吃块饼干吧。',unit:'食物',memoryTips:[{type:'association',content:'cookie → 香脆饼干'}] },
  { id:'g1-w116',text:'soup',phonetic:'/suːp/',meaning:'汤',example:'The soup is hot.',exampleMeaning:'汤很烫。',unit:'食物',memoryTips:[{type:'association',content:'soup → 热热浓汤'}] },
  { id:'g1-w117',text:'salad',phonetic:'/ˈsæləd/',meaning:'沙拉',example:'I like fruit salad.',exampleMeaning:'我喜欢水果沙拉。',unit:'食物',memoryTips:[{type:'association',content:'salad → 新鲜沙拉'}] },
  { id:'g1-w118',text:'tree',phonetic:'/triː/',meaning:'树',example:'The tree is tall.',exampleMeaning:'树很高。',unit:'自然',memoryTips:[{type:'association',content:'tree → 参天大树'}] },
  { id:'g1-w119',text:'flower',phonetic:'/ˈflaʊə/',meaning:'花',example:'The flower is beautiful.',exampleMeaning:'花很美。',unit:'自然',memoryTips:[{type:'association',content:'flower → 芬芳花朵'}] },
  { id:'g1-w120',text:'grass',phonetic:'/ɡrɑːs/',meaning:'草',example:'The grass is green.',exampleMeaning:'草是绿色的。',unit:'自然',memoryTips:[{type:'association',content:'grass → 青青绿草'}] },
  { id:'g1-w121',text:'leaf',phonetic:'/liːf/',meaning:'叶子',example:'The leaf is yellow.',exampleMeaning:'叶子是黄色的。',unit:'自然',memoryTips:[{type:'association',content:'leaf → 翩翩落叶'}] },
  { id:'g1-w122',text:'gift',phonetic:'/ɡɪft/',meaning:'礼物',example:'Thank you for the gift.',exampleMeaning:'谢谢你的礼物。',unit:'物品',memoryTips:[{type:'association',content:'gift → 精美礼物'}] },
  { id:'g1-w123',text:'key',phonetic:'/kiː/',meaning:'钥匙',example:'I lost my key.',exampleMeaning:'我丢了钥匙。',unit:'物品',memoryTips:[{type:'association',content:'key → 小小钥匙'}] },
  { id:'g1-w124',text:'map',phonetic:'/mæp/',meaning:'地图',example:'Look at the map.',exampleMeaning:'看看地图。',unit:'物品',memoryTips:[{type:'association',content:'map → 寻宝地图'}] },
  { id:'g1-w125',text:'grape',phonetic:'/ɡreɪp/',meaning:'葡萄',example:'I like green grapes.',exampleMeaning:'我喜欢青葡萄。',unit:'水果',memoryTips:[{type:'association',content:'grape → 一串串葡萄，像紫色珍珠'}] },
  { id:'g1-w126',text:'peach',phonetic:'/piːtʃ/',meaning:'桃子',example:'The peach is sweet and juicy.',exampleMeaning:'桃子又甜又多汁。',unit:'水果',memoryTips:[{type:'association',content:'peach → 粉粉的桃子，像小宝宝的屁股'}] },
  { id:'g1-w127',text:'pear',phonetic:'/peə/',meaning:'梨',example:'I eat a pear every day.',exampleMeaning:'我每天吃一个梨。',unit:'水果',memoryTips:[{type:'association',content:'pear → 黄黄的梨子，像葫芦的形状'}] },
  { id:'g1-w128',text:'lemon',phonetic:'/ˈlemən/',meaning:'柠檬',example:'The lemon is sour.',exampleMeaning:'柠檬很酸。',unit:'水果',memoryTips:[{type:'association',content:'lemon → 黄黄的柠檬，酸得眯眼睛'}] },
  { id:'g1-w129',text:'mango',phonetic:'/ˈmæŋɡəʊ/',meaning:'芒果',example:'Mango is my favorite fruit.',exampleMeaning:'芒果是我最喜欢的水果。',unit:'水果',memoryTips:[{type:'association',content:'mango → 金黄的芒果，又香又甜'}] },
  { id:'g1-w130',text:'cherry',phonetic:'/ˈtʃeri/',meaning:'樱桃',example:'Cherries are red and sweet.',exampleMeaning:'樱桃又红又甜。',unit:'水果',memoryTips:[{type:'association',content:'cherry → 红红的小樱桃，像小灯泡'}] },
  { id:'g1-w131',text:'strawberry',phonetic:'/ˈstrɔːbəri/',meaning:'草莓',example:'I love strawberry ice cream.',exampleMeaning:'我喜欢草莓冰淇淋。',unit:'水果',memoryTips:[{type:'association',content:'straw(草)+berry(浆果) → 长在地上的红草莓'}] },
  { id:'g1-w132',text:'watermelon',phonetic:'/ˈwɔːtəmelən/',meaning:'西瓜',example:'Watermelon is perfect for summer.',exampleMeaning:'西瓜是夏天最好的水果。',unit:'水果',memoryTips:[{type:'association',content:'water(水)+melon(瓜) → 水分很多的大西瓜'}] }
]
