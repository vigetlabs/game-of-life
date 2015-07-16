import React, { PropTypes } from 'react'
import { randomize } from 'actions/game'
import Ink from 'react-ink'

const RandomizeControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  randomize() {
    this.props.app.push(randomize)
  },

  render() {
    let disabled = !this.props.game.canChange()

    return (
      <button className="button" disabled={ disabled } onClick={ this.randomize }>
        Randomize
        <Ink />
      </button>
    )
  }

})

export default RandomizeControl
