import React from 'react'

const Board = React.createClass({
  getInitialState() {
    return {
      size: 20,
      rows: this.buildRows(20)
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

  render() {
    return (
      <ul className="board">
        { this.state.rows.map(this.drawRow) }
      </ul>
    )
  }
})

export default Board
