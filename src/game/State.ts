import boxTypes from './boxTypes'

const randomIntFromInterval = (min: number, max: number): number => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const State = (state: GameState, keyIsDown: Function, canvas: HTMLCanvasElement) => {

  const updatePlayer = (): void => {
    if (keyIsDown('arrowup')) {
      state.player.velocities.y -= state.player.speed
    }
    if (keyIsDown('arrowdown')) {
      state.player.velocities.y += state.player.speed
    }
    if (keyIsDown('arrowleft')) {
      state.player.velocities.x -= state.player.speed
    }
    if (keyIsDown('arrowright')) {
      state.player.velocities.x += state.player.speed
    }
    state.player.location.x += state.player.velocities.x
    state.player.location.y += state.player.velocities.y

    // Bounce off of walls.
    if (state.player.location.x <= 0) {
      state.player.location.x = 0
      state.player.velocities.x = (state.player.velocities.x * -1) + (state.player.velocities.x / 3)
    }
  }

  const moveBoxes = (): void => {
    state.boxes.forEach((box: Box) => {
      box.location.x += box.velocities.x
      box.location.x += box.velocities.y
    })
  }

  const updateBoxes = (): void => {
    moveBoxes()
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

  const generateBoxes = (amount: number): void => {
    for (let i = 0; i < amount; i++) {
      const goodOrBad = randomIntFromInterval(0, 5) === 0 ? 'good' : 'bad'
      const boxType = boxTypes[goodOrBad]
      const size = randomIntFromInterval(20, 70)
      const location = getSafeBoxLocation(size)

      const box: Box = {
        velocities: {
          x: 0,
          y: 0,
        },
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

  const placePlayer = (): void => {
    state.player.location.x = canvas.width - (state.player.size + 10)
    state.player.location.y = canvas.height - (state.player.size + 10)
  }

  const objectsOverlap = (a: Box, b: Box): boolean => { // @note We assume "b" will be the player, but it should match type "Box."
    return (a.location.x < b.location.x + b.size &&
      a.location.x + a.size > b.location.x &&
      a.location.y < b.location.y + b.size &&
      a.location.y + a.size > b.location.y)
  }

  const doHitChecks = (): void => {
    state.boxes.forEach((box: Box) => {
      if (objectsOverlap(box, state.player)) {
        console.log('CRASH')
      }
    })
  }

  const update = (): void => {
    updatePlayer()
    updateBoxes()
    doHitChecks()
  }

  const init = (): void => {
    placePlayer()
    generateBoxes(randomIntFromInterval(50, 80))
  }

  init()

  return { update }
}

export default State
