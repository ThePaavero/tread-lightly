import boxTypes from './boxTypes'

const randomIntFromInterval = (min: number, max: number): number => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const playerBouncinessDivider = 1.3
const loggedLabels: Array<string> = []

const State = (state: GameState, keyIsDown: Function, canvas: HTMLCanvasElement) => {

  const handlePlayerMovement = (): void => {
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
    bouncePlayer()
  }

  const anotherArmControlKeyIsDown = (keys: Array<string>, okKey: string): boolean => {
    return keys.filter((key: string) => key !== okKey).filter((key: string) => state.keysDown.includes(key)).length > 0
  }

  const handleArm = (): void => {
    const player: Player = state.player
    const arm: Arm = player.arm

    // Some early returns.
    if (!arm.okToJut) {
      return
    }

    // Default location.
    arm.location.y = player.location.y + (player.size / 2)
    arm.location.x = player.location.x + (player.size / 2)

    const keys = 'wasd'.split('')

    if (keys.filter((key: string) => state.keysDown.includes(key)).length < 1) {
      arm.juttingAmount = 0
      arm.direction = null
    }

    arm.currentlyJutting = arm.juttingAmount > 0

    if (arm.juttingAmount <= arm.maxJuttingAmount) {
      arm.juttingAmount += arm.speed
    }

    keys.forEach((key: string) => {
      if (!keyIsDown(key)) {
        return
      }

      const keyToDirectionMap: any = {
        'w': 'UP',
        's': 'DOWN',
        'a': 'LEFT',
        'd': 'RIGHT',
      }

      arm.direction = keyToDirectionMap[key]

      switch (arm.direction) {
        case 'UP':
          arm.location.y = player.location.y - arm.juttingAmount
          arm.location.x = (player.location.x + (player.size / 2)) - arm.size / 2
          break
        case 'DOWN':
          arm.location.y = player.location.y + player.size
          arm.location.x = (player.location.x + (player.size / 2)) - arm.size / 2
          break
        case 'LEFT':
          arm.location.y = player.location.y + (player.size / 2)
          arm.location.x = player.location.x - arm.juttingAmount
          break
        case 'RIGHT':
          arm.location.y = (player.location.y + (player.size / 2)) - arm.size / 2
          arm.location.x = player.location.x + player.size
          break
      }
    })
  }

  const updatePlayer = (): void => {
    handlePlayerMovement()
    handleArm()
  }

  const logOnce = (toLog: any, label: string): void => {
    if (loggedLabels.includes(label)) {
      return
    }
    console.log(toLog)
    loggedLabels.push(label)
  }

  const bouncePlayer = (): void => {
    if (state.player.location.x <= 0) {
      state.player.location.x = 0
      state.player.velocities.x = (state.player.velocities.x * -1) + (state.player.velocities.x / playerBouncinessDivider)
    }
    else if (state.player.location.x + state.player.size >= canvas.width) {
      state.player.location.x = canvas.width - state.player.size
      state.player.velocities.x = (state.player.velocities.x * -1) + (state.player.velocities.x / playerBouncinessDivider)
    }

    if (state.player.location.y <= 0) {
      state.player.location.y = 0
      state.player.velocities.y = (state.player.velocities.y * -1) + (state.player.velocities.y / playerBouncinessDivider)
    }
    else if (state.player.location.y + state.player.size >= canvas.height) {
      state.player.location.y = canvas.height - state.player.size
      state.player.velocities.y = (state.player.velocities.y * -1) + (state.player.velocities.y / playerBouncinessDivider)
    }
    return
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
    if (x > state.player.location.x - 30 || y > state.player.y - 30) {
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

  const objectsOverlap = (a: any, b: any): boolean => {
    // @note We assume "b" will be the player, but it should match type "Box" for our purposes here.
    // @todo ^ Ended up using "any"... Sorry. Refactor (combine types?).
    return (a.location.x < b.location.x + b.size &&
      a.location.x + a.size > b.location.x &&
      a.location.y < b.location.y + b.size &&
      a.location.y + a.size > b.location.y)
  }

  const destroyBox = (box: Box): void => {
    // @todo Create an explosion or something.
    state.boxes = state.boxes.filter((b: Box) => b !== box)
  }

  const doOnBoxHit = (box: Box): void => {
    destroyBox(box)
    const boxClone: any = { ...box }
    const prop = box.type === 'bad' ? 'damage' : 'points'
    state.player.size += boxClone[prop]
  }

  const doHitChecks = (): void => {
    state.boxes.forEach((box: Box) => {
      if (objectsOverlap(box, state.player)) {
        doOnBoxHit(box)
      }
    })

    if (state.player.arm.currentlyJutting) {
      const arm = state.player.arm
      let x = arm.location.x
      let y = arm.location.y
      switch (arm.direction) {
        case 'DOWN':
          y = y + arm.juttingAmount
          break
        case 'RIGHT':
          x = x + arm.juttingAmount
          break
      }
      const tipOfArm = {
        location: {
          x,
          y,
        },
        size: state.player.arm.size,
      }
      logOnce(tipOfArm, 'tip')
      state.boxes.forEach((box: Box) => {
        if (objectsOverlap(box, tipOfArm)) {
          console.log('ARM HIT')
        }
      })
    }
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
