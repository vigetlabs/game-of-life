import React, { PropTypes } from 'react'
import { tick } from 'actions/game'
import Ink from 'react-ink'

const StepControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  step() {
    this.props.app.push(tick)
  },

  render() {
    let disabled = !this.props.game.canChange()

    return (
      <button className="button" disabled={ disabled } onClick={ this.step }>
        Step
        <Ink />
      </button>
    )
  }

})

export default StepControl
