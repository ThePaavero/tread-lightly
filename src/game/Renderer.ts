const Renderer = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, state: GameState) => {

  const clear = (): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const drawBoxes = (): void => {
    state.boxes.forEach((box: Box) => {
      context.fillStyle = box.color
      context.fillRect(box.location.x, box.location.y, box.size, box.size)
    })
  }

  const drawPlayer = (): void => {
    context.fillStyle = '#99aee6'
    context.fillRect(state.player.location.x, state.player.location.y, state.player.size, state.player.size)

    drawArm()
  }

  const drawArm = (): void => {
    // if (!state.player.arm.currentlyJutting) {
      // Don't bother.
      // return
    // }
    // context.fillStyle = '#99aee6'
    context.fillStyle = 'yellow'
    context.fillRect(state.player.arm.location.x, state.player.arm.location.y, state.player.arm.size, state.player.arm.size)
  }

  const draw = (): void => {
    clear()
    drawBoxes()
    drawPlayer()
  }

  return { draw }
}

export default Renderer
