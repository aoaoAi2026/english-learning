// 语音服务 - 使用 Web Speech API

export type VoiceType = 'US' | 'UK'

class SpeechService {
  private synth: SpeechSynthesis | null = null
  private voice: SpeechSynthesisVoice | null = null
  private rate: number = 0.8
  private voiceType: VoiceType = 'US'
  private initialized = false

  constructor() {
    // 延迟初始化，避免在非浏览器环境或模块加载时立即访问 window
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        this.synth = window.speechSynthesis
        this.initVoice()
      } catch (e) {
        console.warn('Speech synthesis not available:', e)
        this.synth = null
      }
    }
  }

  private initVoice() {
    if (!this.synth) return
    
    // 等待语音列表加载
    const voices = this.synth.getVoices()
    if (voices.length === 0) {
      this.synth.addEventListener('voiceschanged', () => {
        try {
          this.setVoiceByType(this.voiceType)
        } catch (e) {
          console.warn('Voice init error:', e)
        }
      }, { once: true } as AddEventListenerOptions)
    } else {
      this.setVoiceByType(this.voiceType)
    }
    this.initialized = true
  }

  private setVoiceByType(type: VoiceType) {
    if (!this.synth) return
    
    const voices = this.synth.getVoices()
    // 优先选择英语语音
    const englishVoices = voices.filter(v => v.lang.startsWith('en'))
    
    if (type === 'US') {
      // 美式英语
      this.voice = englishVoices.find(v => v.lang === 'en-US') || 
                   englishVoices.find(v => v.lang.includes('US')) ||
                   englishVoices[0] || null
    } else {
      // 英式英语
      this.voice = englishVoices.find(v => v.lang === 'en-GB') || 
                   englishVoices.find(v => v.lang.includes('GB')) ||
                   englishVoices.find(v => v.lang === 'en-UK') ||
                   englishVoices[1] || englishVoices[0] || null
    }
  }

  // 播放单词发音
  speakWord(word: string, rate?: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth || typeof SpeechSynthesisUtterance === 'undefined') {
        resolve()
        return
      }

      try {
        // 停止当前播放
        this.synth.cancel()

        const utterance = new SpeechSynthesisUtterance(word)
        utterance.rate = rate ?? this.rate
        utterance.voice = this.voice
        utterance.pitch = 1
        utterance.volume = 1

        utterance.onend = () => resolve()
        utterance.onerror = () => resolve()

        this.synth.speak(utterance)
      } catch (e) {
        console.warn('Speech error:', e)
        resolve()
      }
    })
  }

  // 播放句子
  speakSentence(sentence: string, rate?: number): Promise<void> {
    return this.speakWord(sentence, rate ?? 0.9)
  }

  // 停止播放
  stop() {
    if (this.synth) {
      try {
        this.synth.cancel()
      } catch (e) {
        // 忽略错误
      }
    }
  }

  // 设置语速 (0.1 - 2.0)
  setRate(rate: number) {
    this.rate = Math.max(0.1, Math.min(2.0, rate))
  }

  // 获取当前语速
  getRate(): number {
    return this.rate
  }

  // 设置音色（美式/英式）
  setVoiceType(type: VoiceType) {
    this.voiceType = type
    this.setVoiceByType(type)
  }

  // 获取当前音色类型
  getVoiceType(): VoiceType {
    return this.voiceType
  }

  // 获取可用的语音列表
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return []
    try {
      return this.synth.getVoices().filter(v => v.lang.startsWith('en'))
    } catch {
      return []
    }
  }

  // 检查是否支持语音合成
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }
}

// 导出单例
export const speechService = new SpeechService()
