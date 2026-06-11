import { Component, ReactNode, ErrorInfo } from 'react'
import { Button } from '@/components/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-cyan-50 p-4">
          <div className="max-w-md text-center bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-6xl mb-6">😅</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              页面出了点小问题
            </h1>
            <p className="text-gray-600 mb-2">
              {this.state.error?.message || '请尝试刷新页面'}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              如果问题持续存在，请联系技术支持
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReset}>
                重新加载
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                刷新页面
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
