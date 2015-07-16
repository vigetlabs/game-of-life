import React, { PropTypes } from 'react'
import { reset } from 'actions/game'
import Ink from 'react-ink'

const ResetGameControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  reset() {
    this.props.app.push(reset)
  },

  render() {
    return (
      <button className="button" onClick={ this.reset }>
        Reset
        <Ink />
      </button>
    )
  }

})

export default ResetGameControl
