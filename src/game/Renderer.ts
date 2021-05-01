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

  const draw = (): void => {
    clear()
    drawBoxes()
  }

  return { draw }
}

export default Renderer
