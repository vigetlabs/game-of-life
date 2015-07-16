import React, { PropTypes } from 'react'
import { setTickRate } from '../actions/game'

const TickRateControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  change(e) {
    let value = Math.max(1, Math.min(1000, e.target.value))
    this.props.app.push(setTickRate, value)
  },

  getField() {
    let { game } = this.props

    return (
      <span className="tick-rate">
        <label htmlFor="tick_rate" className="label">Tick Rate</label>
        <input
          id="tick_rate"
          type="number"
          min="1"
          max="1000"
          value={ game.tickRate }
          onChange={ this.change }
        />
      </span>
    )
  },

  getLockedField() {
    return (
      <span className="tick-rate">
        <label className="label">Tick Rate</label>
        <span className="value">{ this.props.game.get('tickRate') }</span>
      </span>
    )
  },

  render() {
    return this.props.game.canChange() ? this.getField() : this.getLockedField()
  }

})

export default TickRateControl
