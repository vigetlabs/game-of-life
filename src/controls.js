import React, { PropTypes } from 'react'

const Controls = React.createClass({
  propTypes: {
    ticking:  PropTypes.bool.isRequired,
    toggled:  PropTypes.func.isRequired,
    tick:     PropTypes.func.isRequired,
    reset:    PropTypes.func.isRequired,
    speed:    PropTypes.number.isRequired,
    setSpeed: PropTypes.func.isRequired,
    setSize:  PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      speed: this.props.speed
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.speed != nextProps.speed) this.setState({ speed: nextProps.speed })
  },

  render() {
    return (
      <div className="controls">
        <button className="button control" onClick={ this._toggle }>{ this.props.ticking ? 'Stop' : 'Start' }</button>
        <button className="button control" onClick={ this._tick }>Step</button>
        <button className="button control" onClick={ this._reset }>Reset</button>

        <select className="dropdown" onChange={ this._setSpeed } value={ this.state.speed }>
          <option value="1000">Normal Speed</option>
          <option value="200">Fast Speed</option>
          <option value="50">Turbo Speed</option>
        </select>

        <input className="board-size" placeholder="Board Size" onChange={ this._setSize } />
      </div>
    )
  },

  _toggle() {
    this.props.toggled()
  },

  _tick() {
    this.props.tick()
  },

  _reset() {
    this.props.reset()
  },

  _setSpeed(event) {
    this.props.setSpeed(Number(event.target.value))
  },

  _setSize(event) {
    this.props.setSize(event.target.value)
  }
})

export default Controls
