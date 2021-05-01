import boxTypes from './boxTypes'

const randomIntFromInterval = (min: number, max: number): number => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const State = (state: GameState, keyIsDown: Function, canvas: HTMLCanvasElement) => {

  const updatePlayer = (): void => {
    state.player.location.x += state.player.velocities.x
    state.player.location.y += state.player.velocities.y
  }

  const moveBoxes = () => {
    state.boxes.forEach((box: Box) => {
      box.location.x += box.velocities.x
      box.location.y += box.velocities.y
    })
  }

  const updateBoxes = (): void => {
    moveBoxes()
  }

  const update = (): void => {
    updatePlayer()
    updateBoxes()
  }

  const getSafeBoxLocation = (size: number): BoxLocation => {
    const buffer = 100
    const x = randomIntFromInterval(10, canvas.width - (size + buffer))
    const y = randomIntFromInterval(10, canvas.height - (size + buffer))
    if (x > state.player.x - 30 || y > state.player.y - 30) {
      return getSafeBoxLocation(size)
    }
    return { x, y }
  }

  const generateBoxes = (amount: number) => {
    for (let i = 0; i < amount; i++) {
      const goodOrBad = randomIntFromInterval(0, 5) === 0 ? 'good' : 'bad'
      const boxType = boxTypes[goodOrBad]
      const size = randomIntFromInterval(20, 70)
      const location = getSafeBoxLocation(size)

      const box: Box = {
        velocities: { x: 0, y: 0 },
        location,
        size,
        color: boxType.color,
        type: goodOrBad,
        ...boxType,
      }
      state.boxes.push(box)
    }
    state.boxAmountMinMax.min += 4
    state.boxAmountMinMax.max += 4
  }

  const placePlayer = () => {
    state.player.location.x = canvas.width - (state.player.size + 10)
    state.player.location.y = canvas.height - (state.player.size + 10)
  }

  const init = () => {
    placePlayer()
    generateBoxes(randomIntFromInterval(50, 80))
  }

  init()

  return { update }
}

export default State
