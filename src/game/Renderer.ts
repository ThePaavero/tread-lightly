const Renderer = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, state: GameState) => {

  const clear = (): void => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const draw = (): void => {
    clear()
    // Your game's rendering logic goes here.
  }

  return { draw }
}

export default Renderer
