import React, { PropTypes } from 'react'
import { setBoardSize } from '../actions/game'

const BoardSizeControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  setWidth(e) {
    this.props.app.push(setBoardSize, { width: parseInt(e.target.value, 10) })
  },

  setHeight(e) {
    this.props.app.push(setBoardSize, { height: parseInt(e.target.value, 10) })
  },

  getField() {
    let { width, height } = this.props.game.board.toJS()

    return (
      <span className="board-size">
        <label htmlFor="width" className="label">Board Size</label>
        <input type="number" id="width" min="3" max="50" value={ width } onChange={ this.setWidth } />
        <span className="mult-sign">×</span>
        <input type="number" id="height" min="3" max="50" value={ height } onChange={ this.setHeight }  />
      </span>
    )
  },

  getLockedField() {
    let { width, height } = this.props.game.board.toJS()

    return (
      <span className="board-size">
        <span htmlFor="width" className="label">Board Size</span>
        <span className="value">{ width }</span>
        <span className="mult-sign">×</span>
        <span className="value">{ height }</span>
      </span>
    )
  },

  render() {
    let disabled = !this.props.game.canChange()
    return disabled ? this.getLockedField() : this.getField()
  }

})

export default BoardSizeControl
