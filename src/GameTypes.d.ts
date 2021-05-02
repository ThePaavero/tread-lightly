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

type BoxAmountMinMax = {
  min: number,
  max: number,
}

type GameState = {
  timeElapsed: number,
  points: number,
  running: boolean, // @todo DRY.
  keysDown: Array<string>, // @todo DRY.
  player: any,
  boxes: Array<Box>,
  boxAmountMinMax: BoxAmountMinMax,
}

type Player = {
  name: string,
  location: BoxLocation,
  velocities: Velocity,
  speed: number,
  size: number,
  minSize: number,
  arm: Arm,
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

type OverlapCheckable = {
  x: number,
  y: number,
  size: number,
}

type Box = {
  velocities: Velocity,
  location: BoxLocation,
  size: number,
  color: string,
  type: string,
}

type Arm = {
  okToJut: boolean,
  juttingAmount: number,
  maxJuttingAmount: number,
  direction: string | null,
  location: BoxLocation,
  size: number,
  speed: number,
  currentlyJutting: boolean,
}

type MinMaxRange = {
  min: number,
  max: number,
}
