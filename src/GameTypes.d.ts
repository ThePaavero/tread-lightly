type ControlsFunctions = {
  keyIsDown: Function,
}

type BasicDebugger = {
  tick: Function,
  statsBegin: Function,
  statsEnd: Function,
}

type GameFrameInitialState = {
  running: boolean,
  keysDown: Array<string>,
}

type GameState = {
  timeElapsed: number,
  points: number,
  running: boolean, // @todo DRY.
  keysDown: Array<string>, // @todo DRY.
  player: any,
  boxes: Array<Box>,
}

type Velocity = {
  x: number,
  y: number,
  max?: number,
}

type BoxLocation = {
  x: number,
  y: number,
}

type Box = {
  velocities: Velocity,
  location: BoxLocation,
  size: number,
  color: string,
}
