import { Record, fromJS } from 'immutable'

const CellSchema = Record({
  x     : null,
  y     : null,
  alive : false
})

export default class Cell extends CellSchema {

  update(cells, cols) {
    let ns = this.liveNeighbors(cells, cols)

    if (ns < 2 || ns > 3) {
      return this.set('alive', false)
    } else if (ns > 1 && ns < 4 && this.alive) {
      return this.set('alive', true)
    } else if (ns === 3) {
      return this.set('alive', true)
    }

    return this
  }

  liveNeighbors(cells, cols) {
    if (!cells) return 0

    const rows = cells.size / cols
    let count  = 0

    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        const r    = ((this.y + rowOffset) + rows) % rows
        const c    = ((this.x + colOffset) + cols) % cols
        const cell = cells.get(c + r * cols)

        if ((cell !== this) && cell.alive) count++
      }
    }

    return count
  }

}


