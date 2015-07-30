import React    from 'react'
import Controls from 'controls'

const SIZE  = 20
const ALIVE = 1
const DEAD  = 0
const SPEED = 1000

const Board = React.createClass({
  getInitialState() {
    return this.defaults()
  },

  defaults() {
    return {
      size:    SIZE,
      rows:    this.buildRows(SIZE),
      ticking: false,
      speed:   SPEED
    }
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

  repeatTick() {
    this.tick()
    this.timeout = setTimeout(this.repeatTick, this.state.speed)
  },

  start() {
    this.setState({ ticking: true })
    this.repeatTick()
  },

  stop() {
    clearInterval(this.timeout)

    this.setState({ ticking: false })
  },

  toggle() {
    this.state.ticking ? this.stop() : this.start()
  },

  setSpeed(value) {
    this.setState({ speed: value })
  },

  reset() {
    this.stop()
    this.setState(this.defaults())
  },

  setSize(size) {
    this.stop()
    this.setState({
      size: size,
      rows: this.buildRows(size)
    })
  },

  render() {
    return (
      <div className="board-wrapper">
        <ul className="board">
          { this.state.rows.map(this.drawRow) }
        </ul>

        <Controls
          ticking={ this.state.ticking }
          toggled={ this.toggle }
          tick={ this.tick }
          speed={ this.state.speed }
          setSpeed={ this.setSpeed }
          reset={ this.reset }
          setSize={ this.setSize }
        />
      </div>
    )
  }
})

export default Board
