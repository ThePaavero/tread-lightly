const Controls = (state: GameState): ControlsFunctions => {

  const keyIsDown = (key: string): boolean => {
    return state.keysDown.includes(key)
  }

  const eventTypes: Array<string> = ['keydown', 'keyup']
  eventTypes.forEach((eventType: string): void => {
    window.addEventListener(eventType, (e: KeyboardEvent): void => {
      const key: string = e.key.toLowerCase()
      switch (eventType) {
        case 'keydown':
          if (!state.keysDown.includes(key)) {
            state.keysDown.push(key)
          }
          break
        case 'keyup':
          if (state.keysDown.includes(key)) {
            state.keysDown = state.keysDown.filter((k: string): boolean => k !== key)
          }
          break
      }
    })
  })

  return { keyIsDown }
}

export default Controls
