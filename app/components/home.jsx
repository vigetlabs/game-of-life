import React, { PropTypes } from 'react'
import { tick, setNextState } from '../actions/game'
import GameControls from './gameControls'
import Board        from './board'

const Home = React.createClass({

  propTypes: {
    app  : PropTypes.object.isRequired,
    game : PropTypes.object.isRequired
  },

  componentDidMount() {
    if (this.props.game.ticking) this.startTicking()
  },

  componentWillReceiveProps(nextProps) {
    // :vomit: Keep track of this in store?
    if (nextProps.game.ticking) {
      if (!this.ticker) {
        this.startTicking()
      } else {
        if (nextProps.game.tickRate !== this.props.game.tickRate) {
          this.stopTicking()
          this.startTicking()
        }
      }
    } else {
      this.stopTicking()
    }
  },

  startTicking() {
    let { app, game } = this.props
    this.ticker = setInterval(() => { app.push(tick) }, game.tickRate)
  },

  stopTicking() {
    clearInterval(this.ticker)
    this.ticker = null
  },

  render() {
    return (
      <section className="home">
        <h1 className="app-title">
          The Game <span className="sub-title">of life</span>
        </h1>
        <Board { ...this.props } />
        <GameControls { ...this.props } />
      </section>
    )
  }

})

export default Home
