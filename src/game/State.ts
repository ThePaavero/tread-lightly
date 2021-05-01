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

  return { update }
}

export default State
