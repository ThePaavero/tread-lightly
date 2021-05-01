import Stats from 'stats.js'

const Debugger = (state: GameState): BasicDebugger => {

  let debugElement: HTMLElement
  let debugTicker: number = 0
  const stats: Stats = new Stats()

  debugElement = document.createElement('pre')
  debugElement.classList.add('debug-pre')
  document.body.appendChild(debugElement)

  stats.showPanel(1) // FPS.
  stats.showPanel(0) // MS.
  document.body.appendChild(stats.dom)

  const statsBegin = (): void => {
    stats.begin()
  }

  const statsEnd = (): void => {
    stats.end()
  }

  const tick = (skipFrames: number = 0): void => {
    if (debugTicker === 0) {
      updateDebugger()
      if (skipFrames < 1) {
        return
      }
    }
    debugTicker++
    if (debugTicker === skipFrames) {
      debugTicker = 0
    }
  }

  const updateDebugger = (): void => {
    debugElement.innerHTML = JSON.stringify(state, null, 2)
  }

  return {
    tick,
    statsBegin,
    statsEnd,
  }
}

export default Debugger
