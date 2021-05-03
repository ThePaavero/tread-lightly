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

interface GameState extends GameFrameInitialState {
  timeElapsed: number,
  points: number,
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
  points?: number,
  damage?: number,
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
