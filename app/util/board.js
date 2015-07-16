import { List } from 'immutable'
import Cell     from 'models/cell'

export default function initialBoardState({ width, height }) {
  let result = List()

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let cell = new Cell({ x: j, y: i, alive: false })
      result = result.push(cell)
    }
  }

  return result
}
