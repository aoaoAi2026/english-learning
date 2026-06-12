// 语音服务 - 使用高质量 TTS 引擎（向后兼容）
// 底层使用 ttsService（Google TTS 为主 + Web Speech API 兜底）

import { ttsService } from './tts'

export type VoiceType = 'US' | 'UK'

class SpeechService {
  private rate: number = 0.8
  private voiceType: VoiceType = 'US'

  // 播放单词发音
  speakWord(word: string, rate?: number): Promise<void> {
    const lang = this.voiceType === 'UK' ? 'en-GB' as const : 'en-US' as const
    return ttsService.speak(word, { rate: rate ?? this.rate, lang }).then(() => {})
  }

  // 播放句子
  speakSentence(sentence: string, rate?: number): Promise<void> {
    return this.speakWord(sentence, rate ?? 0.9)
  }

  // 停止播放
  stop() {
    ttsService.stop()
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
  }

  // 获取当前音色类型
  getVoiceType(): VoiceType {
    return this.voiceType
  }

  // 检查是否支持
  isSupported(): boolean {
    return true // 始终返回 true，因为有兜底方案
  }
}

// 导出单例
export const speechService = new SpeechService()
