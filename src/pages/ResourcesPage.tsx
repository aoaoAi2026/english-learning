import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { resourceCategories } from '@/data/resources'

export function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🌐 英语学习资源导航
        </h1>
        <p className="text-gray-600">
          精选优质英语学习平台，助你学习更上一层楼
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {resourceCategories.map((category) => (
          <section key={category.id}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-2xl font-bold text-gray-800">
                {category.name}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.resources.map((resource) => (
                <Card
                  key={resource.id}
                  hover
                  className="group"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{resource.icon || '🔗'}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 truncate">
                            {resource.name}
                          </h3>
                          <ExternalLink
                            size={14}
                            className="text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0"
                          />
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Tips */}
      <Card className="mt-12 bg-gradient-to-r from-orange-50 to-cyan-50">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 学习小贴士
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white rounded-xl">
              <p className="font-medium text-gray-800 mb-2">每天坚持</p>
              <p className="text-sm text-gray-600">
                每天学习15-30分钟，比一次性学习几个小时更有效
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="font-medium text-gray-800 mb-2">多听多说</p>
              <p className="text-sm text-gray-600">
                语言学习需要大量的听和说，不要害怕开口
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="font-medium text-gray-800 mb-2">复习巩固</p>
              <p className="text-sm text-gray-600">
                定期复习学过的内容，避免遗忘
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
