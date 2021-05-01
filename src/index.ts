import BasicConfig from './game/basicConfig.json'
import GameFrame from './GameFrame'

// @todo Preloading and stuff here?

GameFrame(
  document.querySelector('canvas'),
  BasicConfig.width,
  BasicConfig.height,
  BasicConfig.useBasicDebugger === true || window.location.hash === '#debug'
)
