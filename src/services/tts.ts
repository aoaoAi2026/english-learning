// TTS 服务：优先用 Web Speech API（浏览器），APK 里用 Capacitor 原生 TTS，都失败则用在线 TTS

type TtsOptions = { rate?: number; onStart?: () => void; onEnd?: () => void; onError?: (err: string) => void }

// 是否运行在 Capacitor 原生 APK 中
function isNativeApp(): boolean {
  try {
    // @ts-ignore
    return typeof window !== 'undefined' && window.Capacitor &&
      // @ts-ignore
      ['android', 'ios'].includes(window.Capacitor?.getPlatform?.() ?? '')
  } catch { return false }
}

// Web Speech API（浏览器 & 支持的 WebView）
function speakWeb(text: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' ||
        !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined') {
      resolve(false)
      return
    }
    try {
      const s = window.speechSynthesis
      const u = new SpeechSynthesisUtterance(text)
      u.rate = rate
      u.pitch = 1
      u.volume = 1
      u.lang = 'en-US'

      let resolved = false
      const done = (ok: boolean) => { if (!resolved) { resolved = true; resolve(ok) } }

      u.onend = () => done(true)
      u.onerror = () => done(false)

      s.cancel()
      s.speak(u)

      setTimeout(() => done(false), 6000)
    } catch { resolve(false) }
  })
}

// Capacitor 原生 TTS（APK 专用）
async function speakNative(text: string, rate: number): Promise<boolean> {
  try {
    // @ts-ignore - 动态 import，PC 浏览器不会走到这里
    const { TextToSpeech } = await import('@capacitor-community/text-to-speech')
    await TextToSpeech.speak({
      text: text,
      lang: 'en-US',
      rate: rate,
      pitch: 1,
      volume: 1,
    })
    return true
  } catch (e) {
    console.warn('[TTS] native failed:', e)
    return false
  }
}

// 在线 Google TTS（兜底）
function speakOnline(text: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') { resolve(false); return }
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=gtx`
      const audio = new Audio(url)
      audio.volume = 1
      audio.playbackRate = rate

      let resolved = false
      const finish = (ok: boolean) => { if (!resolved) { resolved = true; resolve(ok) } }
      audio.onended = () => finish(true)
      audio.onerror = () => finish(false)
      setTimeout(() => finish(false), 8000)
      audio.play()?.catch(() => finish(false))
    } catch { resolve(false) }
  })
}

class TtsService {
  async speak(text: string, options: TtsOptions = {}): Promise<boolean> {
    if (!text?.trim()) return false
    const trimmed = text.trim().substring(0, 200)
    const rate = options.rate ?? 1.05

    // 清理上一次播放
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel() } catch {}
    }

    options.onStart?.()

    // 1) APK → 原生 TTS
    if (isNativeApp()) {
      const ok = await speakNative(trimmed, rate)
      if (ok) { options.onEnd?.(); return true }
    }

    // 2) 浏览器 → Web Speech API（桌面 Chrome、手机 Chrome 都支持）
    const webOk = await speakWeb(trimmed, rate)
    if (webOk) { options.onEnd?.(); return true }

    // 3) 兜底：在线 TTS
    const onlineOk = await speakOnline(trimmed, rate)
    if (onlineOk) { options.onEnd?.(); return true }

    options.onError?.('all failed')
    return false
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel() } catch {}
    }
  }
}

export const ttsService = new TtsService()
