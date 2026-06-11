import { ResourceCategory, ExternalResource } from '@/types'

// 外部学习资源
export const resourceCategories: ResourceCategory[] = [
  {
    id: 'online-course',
    name: '在线课程',
    icon: '🎓',
    resources: [
      {
        id: 'duolingo',
        name: '多邻国 Duolingo',
        description: '免费的语言学习平台，游戏化学习方式，适合初学者',
        url: 'https://www.duolingo.com/',
        category: 'online-course',
        icon: '🦉'
      },
      {
        id: 'vipkid',
        name: 'VIPKID',
        description: '在线少儿英语教育平台，北美外教1对1教学',
        url: 'https://www.vipkid.com/',
        category: 'online-course'
      },
      {
        id: '51talk',
        name: '51Talk',
        description: '在线英语教育平台，菲律宾外教1对1课程',
        url: 'https://www.51talk.com/',
        category: 'online-course'
      },
      {
        id: 'yuanfudao',
        name: '猿辅导',
        description: 'K12在线辅导平台，提供英语等学科辅导',
        url: 'https://www.yuanfudao.com/',
        category: 'online-course'
      }
    ]
  },
  {
    id: 'dictionary',
    name: '词典工具',
    icon: '📖',
    resources: [
      {
        id: 'youdao',
        name: '有道词典',
        description: '网易旗下词典工具，支持中英互译、发音、例句',
        url: 'https://dict.youdao.com/',
        category: 'dictionary'
      },
      {
        id: 'jinshan',
        name: '金山词霸',
        description: '老牌词典软件，词汇量大，功能全面',
        url: 'http://www.iciba.com/',
        category: 'dictionary'
      },
      {
        id: 'baidu-translate',
        name: '百度翻译',
        description: '百度旗下翻译工具，支持多种语言互译',
        url: 'https://fanyi.baidu.com/',
        category: 'dictionary'
      },
      {
        id: 'google-translate',
        name: 'Google翻译',
        description: '谷歌翻译，翻译质量高，支持语音输入',
        url: 'https://translate.google.com/',
        category: 'dictionary'
      }
    ]
  },
  {
    id: 'video',
    name: '视频资源',
    icon: '🎬',
    resources: [
      {
        id: 'bilibili',
        name: 'B站英语教学',
        description: 'B站有大量免费英语学习视频，适合各年龄段',
        url: 'https://www.bilibili.com/',
        category: 'video'
      },
      {
        id: 'ted-ed',
        name: 'TED-Ed',
        description: '教育类短视频，内容丰富有趣，适合拓展知识',
        url: 'https://ed.ted.com/',
        category: 'video'
      },
      {
        id: 'khan-academy',
        name: 'Khan Academy',
        description: '可汗学院，免费教育资源，涵盖多学科',
        url: 'https://www.khanacademy.org/',
        category: 'video'
      }
    ]
  },
  {
    id: 'practice',
    name: '练习平台',
    icon: '✏️',
    resources: [
      {
        id: 'baicizhan',
        name: '百词斩',
        description: '背单词APP，图文结合，游戏化记忆',
        url: 'https://www.baicizhan.com/',
        category: 'practice'
      },
      {
        id: 'shanbay',
        name: '扇贝单词',
        description: '英语学习平台，单词、阅读、听力全覆盖',
        url: 'https://www.shanbay.com/',
        category: 'practice'
      },
      {
        id: 'liulishuo',
        name: '英语流利说',
        description: '口语练习APP，AI评分，提升口语能力',
        url: 'https://www.liulishuo.com/',
        category: 'practice'
      }
    ]
  },
  {
    id: 'reading',
    name: '绘本阅读',
    icon: '📚',
    resources: [
      {
        id: 'raz-kids',
        name: 'Raz-Kids',
        description: '分级阅读平台，海量英文绘本，适合不同水平',
        url: 'https://www.raz-kids.com/',
        category: 'reading'
      },
      {
        id: 'oxford-owl',
        name: '牛津树 Oxford Owl',
        description: '牛津大学出版社出品，优质分级读物',
        url: 'https://www.oxfordowl.co.uk/',
        category: 'reading'
      }
    ]
  },
  {
    id: 'comprehensive',
    name: '综合资源',
    icon: '🌐',
    resources: [
      {
        id: 'bbc-learning',
        name: 'BBC Learning English',
        description: 'BBC英语学习频道，地道英式英语资源',
        url: 'https://www.bbc.co.uk/learningenglish/',
        category: 'comprehensive'
      },
      {
        id: 'voa-learning',
        name: 'VOA Learning English',
        description: '美国之音英语学习，美式英语新闻资源',
        url: 'https://learningenglish.voanews.com/',
        category: 'comprehensive'
      },
      {
        id: 'british-council',
        name: 'British Council',
        description: '英国文化协会，优质英语学习资源',
        url: 'https://learnenglish.britishcouncil.org/',
        category: 'comprehensive'
      }
    ]
  }
]

// 获取所有资源
export function getAllResources(): ExternalResource[] {
  return resourceCategories.flatMap(cat => cat.resources)
}

// 根据分类获取资源
export function getResourcesByCategory(categoryId: string): ExternalResource[] {
  const category = resourceCategories.find(cat => cat.id === categoryId)
  return category ? category.resources : []
}
