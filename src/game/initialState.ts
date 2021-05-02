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

  return {
    player: {
      name: 'Player 1',
      location,
      velocities: {
        x: 0,
        y: 0,
        max: 0.2,
      },
      speed: 0.05,
      size: 40,
      minSize: 20,
      arm,
    },
    boxes,
    boxAmountMinMax: {
      min: 10,
      max: 15,
    },
  }

}

export default Player()
