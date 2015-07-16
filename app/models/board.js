import { Record } from 'immutable'
import initialBoardState from 'util/board'

const INITIAL_WIDTH  = 20
const INITIAL_HEIGHT = 20

const BoardSchema = Record({
  height : INITIAL_HEIGHT,
  width  : INITIAL_WIDTH,
  cells  : initialBoardState({
    width  : INITIAL_WIDTH,
    height : INITIAL_HEIGHT
  })
})

export default class Board extends BoardSchema {

  update() {
    let old   = this.cells
    let cols  = this.width
    let cells = old.map(cell => (cell.update(old, cols)), this)

    return this.set('cells', cells)
  }

}
