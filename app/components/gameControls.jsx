import React, { PropTypes } from 'react'
import Play      from './playControl'
import Step      from './stepControl'
import TickRate  from './tickRateControl'
import TickTime  from './tickTimeDisplay'
import BoardSize from './boardSizeControl'
import ResetGame from './resetGameControl'
import Randomize from './randomizeControl'

const GameControls = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="game-controls">
        <div className="game-controls-group">
          <Play      { ...this.props } />
          <Randomize { ...this.props } />
          <Step      { ...this.props } />
          <ResetGame { ...this.props } />
        </div>

        <div className="game-controls-group">
          <p className="game-age">Generations: <b>{ this.props.game.age }</b></p>
          <BoardSize { ...this.props } />
          <TickRate  { ...this.props } />
          <TickTime  { ...this.props } />
        </div>
      </div>
    )
  }

})

export default GameControls
