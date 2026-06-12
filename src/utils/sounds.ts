// Web Audio API 音效 - 移动端/桌面全兼容
// AudioContext 必须在用户手势中创建

let audioCtx: AudioContext | null = null

function ctx(): AudioContext | null {
  if (audioCtx) {
    if (audioCtx.state === 'suspended') audioCtx.resume()
    return audioCtx
  }
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
    if (audioCtx.state === 'suspended') audioCtx.resume()
    return audioCtx
  } catch {
    return null
  }
}

export function initAudio(): AudioContext | null {
  return ctx()
}

// 播放单音
function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.12) {
  const c = ctx()
  if (!c || c.state !== 'running') return
  try {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(Math.min(vol, 0.25), c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
    o.connect(g).connect(c.destination)
    o.start(c.currentTime)
    o.stop(c.currentTime + dur + 0.01)
  } catch {}
}

export function playCorrect() {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.18, 'sine', 0.12), i * 80))
}
export function playWrong() { tone(200, 0.3, 'square', 0.08) }
export function playClick() { tone(880, 0.06, 'sine', 0.06) }
export function playFlip() { tone(660, 0.08, 'triangle', 0.06) }
export function playLevelUp() {
  [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => tone(f, 0.3, 'sine', 0.1), i * 100))
}
export function playStar() { tone(988, 0.1, 'sine', 0.08); setTimeout(() => tone(1319, 0.2, 'sine', 0.09), 100) }
export function playCombo(count: number) {
  const f = 440 + count * 80
  tone(f, 0.12, 'square', 0.06)
  setTimeout(() => tone(f * 1.25, 0.12, 'sine', 0.07), 80)
}
export function playConfetti() {
  for (let i = 0; i < 8; i++) setTimeout(() => tone(600 + Math.random() * 800, 0.1, 'sine', 0.04), i * 40)
}
export function playPop() { tone(600, 0.1, 'sine', 0.07); setTimeout(() => tone(900, 0.1, 'sine', 0.06), 50) }
export function playTick() { tone(1000, 0.03, 'sine', 0.04) }
export function playSpinTick() { tone(440 + Math.random() * 220, 0.05, 'triangle', 0.05) }
