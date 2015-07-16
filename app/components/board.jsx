import React, { PropTypes } from 'react'
import Cell from './cell'

const Board = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  makeBoard() {
    let { cells, height, width } = this.props.game.board
    let rows = []

    for (let i = 0; i < height; i++) {
      rows.push(this.makeRow(cells, i, width))
    }

    return (
      <div className="board-inner">
        <div className="board">
          { rows }
        </div>
      </div>
    )
  },

  makeRow(cells, i, cols) {
    let offset = i * cols
    let slice  = cells.slice(offset, offset + cols)

    return (
      <ul key={ i } className="board-row">
        { slice.map(this.makeCells) }
      </ul>
    )
  },

  makeCells(cell, i) {
    return (
      <li key={ i } className="board-cell">
        <Cell cell={ cell } { ...this.props } />
      </li>
    )
  },

  render() {
    return (
      <div className="board-wrapper">
        { this.makeBoard() }
      </div>
    )
  }

})

export default Board
