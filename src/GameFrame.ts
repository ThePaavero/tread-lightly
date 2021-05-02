import Controls from './Controls'
import Debugger from './Debugger'

import State from './game/State'
import Renderer from './game/Renderer'
import GameInitialState from './game/initialState'

const GameFrame = (canvas: HTMLCanvasElement, width: number, height: number, debugMode: boolean) => {

  const context = canvas.getContext('2d')

  let basicDebugger: BasicDebugger

  canvas.width = width
  canvas.height = height

  const gameFrameInitialState: GameFrameInitialState = {
    running: true,
    keysDown: [],
  }

  const state: any = { ...gameFrameInitialState, ...GameInitialState }

  if (debugMode) {
    basicDebugger = Debugger(state)
  }

  const renderer = Renderer(canvas, context, state)
  const controls = Controls(state)
  const stateUpdater = State(state, controls.keyIsDown, canvas)

  const tick = (): void => {
    if (debugMode) {
      basicDebugger.statsBegin()
    }
    if (state.running) {
      stateUpdater.update()
      renderer.draw()

      if (debugMode) {
        basicDebugger.tick(5)
        basicDebugger.statsEnd()
      }
    }
    window.requestAnimationFrame(tick)
  }

  // Go!
  tick()
}

export default GameFrame
