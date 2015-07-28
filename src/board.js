import React from 'react'

const ALIVE = 1
const DEAD  = 0
const SPEED = 1000
const Board = React.createClass({
  getInitialState() {
    return {
      size:    20,
      rows:    this.buildRows(20),
      ticking: false
    }
  },

  componentDidMount() {
    this.start()
  },

  buildRows(size) {
    let rows = []

    for (let i = 0; i < Math.pow(size, 2); i++) {
      let x     = i % size
      let y     = Math.floor(i / size)
      let alive = Math.round(Math.random())

      rows[y] = (rows[y] || []).concat([alive])
    }

    return rows
  },

  drawRow(row, y) {
    return (
      <li key={ y }>
        <ul className="row">{ row.map(this.makeCell.bind(this, y)) }</ul>
      </li>
    )
  },

  makeCell(y, alive, x) {
    let classes         = "cell"
    if (alive) classes += " -alive"

    return (
      <li className={ classes } key={ `${x}/${y}` } />
    )
  },

  tick() {
    if (!this.state.ticking) return

    console.log("Tick!")

    let rows = []

    for (let y = 0; y < this.state.size; y++) {
      let row = []

      for (let x = 0; x < this.state.size; x++) {
        let cell      = { x: x, y: y, alive: this.state.rows[y][x] }
        let liveCount = this.liveNeighborCount.call(this, cell)

        if (liveCount === 3) {
          row.push(ALIVE)
        } else if (liveCount === 2) {
          cell.alive ? row.push(ALIVE) : row.push(DEAD)
        } else {
          row.push(DEAD)
        }
      }

      rows.push(row)
    }

    this.setState({ rows: rows })
  },

  liveNeighborCount(cell) {
    let { rows, size } = this.state
    let count          = 0

    count += (rows[cell.y]     || [])[cell.x - 1] || 0
    count += (rows[cell.y]     || [])[cell.x + 1] || 0
    count += (rows[cell.y - 1] || [])[cell.x]     || 0
    count += (rows[cell.y - 1] || [])[cell.x - 1] || 0
    count += (rows[cell.y - 1] || [])[cell.x + 1] || 0
    count += (rows[cell.y + 1] || [])[cell.x]     || 0
    count += (rows[cell.y + 1] || [])[cell.x - 1] || 0
    count += (rows[cell.y + 1] || [])[cell.x + 1] || 0

    return count
  },

  start() {
    this.setState({ ticking: true })

    setInterval(() => { this.tick.call(this) }, SPEED)
  },

  render() {
    return (
      <ul className="board">
        { this.state.rows.map(this.drawRow) }
      </ul>
    )
  }
})

export default Board
