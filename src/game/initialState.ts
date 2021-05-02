const Player = () => {

  const location: BoxLocation = {
    x: 0,
    y: 0,
  }

  const arm: Arm = {
    okToJut: true,
    juttingAmount: 0,
    maxJuttingAmount: 15,
    direction: null,
    animating: false,
    animatingInOrOut: '',
  }

  const boxes: Array<Box> = []

  const velocities: Velocity = {
    x: 0,
    y: 0,
    max: 0.2,
  }

  const boxAmountMinMax: MinMaxRange = {
    min: 10,
    max: 15,
  }

  const player = {
    name: 'Player 1',
    location,
    velocities,
    speed: 0.05,
    size: 40,
    minSize: 20,
    arm,
  }

  return {
    player,
    boxes,
    boxAmountMinMax,
  }

}

export default Player()
