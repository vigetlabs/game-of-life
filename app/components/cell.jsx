import React, { PropTypes } from 'react'
import { setCellState } from 'actions/game'
import { Record } from 'immutable'
import cx from 'classnames'

const Cell = React.createClass({

  propTypes: {
    app   : PropTypes.object.isRequired,
    game  : PropTypes.object.isRequired,
    cell  : PropTypes.instanceOf(Record)
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.cell              !== nextProps.cell) ||
           (this.props.game.ticking      !== nextProps.game.ticking) ||
           (this.props.game.board.width  !== nextProps.game.board.width) ||
           (this.props.game.board.height !== nextProps.game.board.height)
  },

  change() {
    let { app, game, cell } = this.props

    if (game.canChange()) {
      app.push(setCellState, cell.set('alive', !cell.alive))
    }
  },

  render() {
    const ticking = this.props.game.ticking
    const alive   = this.props.cell.alive

    let classes = cx('cell', {
      'live-cell'   : alive,
      'dead-cell'   : !alive,
      'unclickable' : ticking
    })

    return <div className={ classes } onClick={ this.change } />
  }

})

export default Cell
