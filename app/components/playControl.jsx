import React, { PropTypes } from 'react'
import { setTickingState } from '../actions/game'
import Ink from 'react-ink'

const PlayControl = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  togglePlay() {
    this.props.app.push(setTickingState, !this.props.game.ticking)
  },

  render() {
    let text = this.props.game.ticking ? 'Pause' : 'Start'

    return (
      <button className="button play-button" onClick={ this.togglePlay }>
        { text }
        <Ink />
      </button>
    )
  }

})

export default PlayControl
