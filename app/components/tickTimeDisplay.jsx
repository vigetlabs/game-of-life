import React, { PropTypes } from 'react'
import { setTickRate } from '../actions/game'

const TickTimeDisplay = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  render() {
    let { game } = this.props

    return game.ticking ? (
      <div className="tick-time">
        <span className="label">Tick Time</span>
        <span className="value">{ this.props.game.tickTime }</span>
      </div>
    ) : null
  }

})

export default TickTimeDisplay
