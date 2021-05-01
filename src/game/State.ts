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

  const generateBoxes = (amount: number) => {
    for (let i = 0; i < amount; i++) {
      const boxType = randomIntFromInterval(0, 5) === 0 ? boxTypes.good : boxTypes.bad
      const size = randomIntFromInterval(20, 70)
      const box: Box = {
        velocities: { x: 0, y: 0 },
        location: {
          x: randomIntFromInterval(10, canvas.width - (size + 10)),
          y: randomIntFromInterval(10, canvas.height - (size + 10)),
        },
        size,
        color: 'red', // @todo
        ...boxType,
      }
      state.boxes.push(box)
    }
    state.boxAmountMinMax.min += 4
    state.boxAmountMinMax.max += 4
  }

  const init = () => {
    generateBoxes(randomIntFromInterval(20, 30))
  }

  init()

  return { update }
}

export default State