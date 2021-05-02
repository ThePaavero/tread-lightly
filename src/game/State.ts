import boxTypes from './boxTypes'

const randomIntFromInterval = (min: number, max: number): number => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const playerBouncinessDivider = 1.3
const loggedLabels: Array<string> = []

const State = (state: GameState, keyIsDown: Function, canvas: HTMLCanvasElement) => {

  const updatePlayer = (): void => {
    // Basic movement logic.
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

    // Apply velocities.
    state.player.location.x += state.player.velocities.x
    state.player.location.y += state.player.velocities.y

    // Bounce off of walls, ceiling and floor.
    bouncePlayer(canvas, true)
  }

  const logOnce = (toLog: any, label: string) => {
    if (loggedLabels.includes(label)) {
      return
    }
    console.log(toLog)
    loggedLabels.push(label)
  }

  const bouncePlayer = (frame: any, useCanvas: boolean = false): void => {
    const walls = {
      top: useCanvas ? 0 : frame.location.y,
      bottom: useCanvas ? canvas.height : frame.location.y + frame.size,
      left: useCanvas ? 0 : frame.location.x,
      right: useCanvas ? canvas.width : frame.location.x + frame.size,
    }

    logOnce(walls, 'walls')

    // X axis.
    if (state.player.location.x <= walls.left) {
      state.player.location.x = 0
      state.player.velocities.x = (state.player.velocities.x * -1) + (state.player.velocities.x / playerBouncinessDivider)
    }
    else if (state.player.location.x + state.player.size >= walls.right) {
      state.player.location.x = frame.width - state.player.size
      state.player.velocities.x = (state.player.velocities.x * -1) + (state.player.velocities.x / playerBouncinessDivider)
    }

    // Y axis.
    if (state.player.location.y <= walls.bottom) {
      state.player.location.y = 0
      state.player.velocities.y = (state.player.velocities.y * -1) + (state.player.velocities.y / playerBouncinessDivider)
    }
    else if (state.player.location.y + state.player.size >= walls.top) {
      state.player.location.y = walls.top - state.player.size
      state.player.velocities.y = (state.player.velocities.y * -1) + (state.player.velocities.y / playerBouncinessDivider)
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

  const doOnBoxHit = (box: Box): void => {
    console.log('HIT!')
    bouncePlayer(box, false)
  }

  const doHitChecks = (): void => {
    state.boxes.forEach((box: Box) => {
      if (objectsOverlap(box, state.player)) {
        doOnBoxHit(box)
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
