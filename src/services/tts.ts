// 精简 TTS 服务 - Web Speech 优先，Google TTS 兜底

type TtsOptions = { rate?: number; onStart?: () => void; onEnd?: () => void; onError?: (err: string) => void }

class TtsService {
  private currentAudio: HTMLAudioElement | null = null

  async speak(text: string, options: TtsOptions = {}): Promise<boolean> {
    if (!text?.trim()) return false
    const trimmed = text.trim().substring(0, 200)

    // 只停 HTML5 Audio，不动 speechSynthesis（cancel+speak 会导致静音）
    if (this.currentAudio) {
      try { this.currentAudio.pause() } catch {}
      this.currentAudio.onended = this.currentAudio.onerror = null
      this.currentAudio = null
    }

    // Web Speech API（低延迟，国内可用）
    if ('speechSynthesis' in window) {
      return new Promise<boolean>((resolve) => {
        try {
          window.speechSynthesis.cancel()
          const u = new SpeechSynthesisUtterance(trimmed)
          u.rate = options.rate ?? 1.05
          u.pitch = 1
          u.volume = 1
          u.lang = 'en-US'

          let started = false
          let resolved = false
          let tid: ReturnType<typeof setTimeout>

          const done = (ok: boolean) => {
            if (resolved) return; resolved = true
            clearTimeout(tid)
            if (ok) options.onEnd?.()
            else options.onError?.('failed')
            resolve(ok)
          }

          u.onstart = () => { started = true; options.onStart?.() }
          u.onend = () => done(true)
          u.onerror = (e) => {
            if (e.error !== 'canceled' && e.error !== 'interrupted') done(false)
          }

          // iOS/Chrome fix: cancel 后需要短暂延迟再 speak
          setTimeout(() => {
            window.speechSynthesis.speak(u)
          }, 30)
          tid = setTimeout(() => { if (!started) done(false) }, 4000)
        } catch { resolve(false) }
      })
    }

    // 兜底：Google TTS
    return this.tryGoogleTts(trimmed, options)
  }

  private tryGoogleTts(text: string, options: TtsOptions): Promise<boolean> {
    return new Promise((resolve) => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=gtx`
      let audio: HTMLAudioElement
      try { audio = new Audio(url) } catch { resolve(false); return }
      audio.volume = 1
      audio.playbackRate = options.rate ?? 1.1

      this.currentAudio = audio

      let resolved = false
      let tid: ReturnType<typeof setTimeout>
      const finish = (ok: boolean) => {
        if (resolved) return; resolved = true
        clearTimeout(tid)
        if (this.currentAudio === audio) this.currentAudio = null
        try { audio.onplay = audio.onended = audio.onerror = null } catch {}
        if (!ok) try { audio.pause(); audio.removeAttribute('src') } catch {}
        options.onEnd?.()
        resolve(ok)
      }

      audio.onplay = () => options.onStart?.()
      audio.onended = () => finish(true)
      audio.onerror = () => finish(false)
      tid = setTimeout(() => finish(false), 8000)
      audio.play()?.catch(() => finish(false))
    })
  }

  private cleanup() {
    if (this.currentAudio) {
      try { this.currentAudio.pause() } catch {}
      this.currentAudio.onended = this.currentAudio.onerror = null
      this.currentAudio = null
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel() } catch {}
    }
  }

  stop() { this.cleanup() }
}

export const ttsService = new TtsService()
