import * as actions      from '../actions/game'
import Immutable         from 'immutable'
import Game              from 'models/game'
import Board             from 'models/board'
import Cell              from 'models/cell'
import initialBoardState from 'util/board'

let GameStore = {

  register() {
    return {
      [actions.tick]            : this.tick,
      [actions.setTickRate]     : this.setTickRate,
      [actions.setTickingState] : this.setTickingState,
      [actions.setBoardSize]    : this.setBoardSize,
      [actions.setCellState]    : this.setCellState,
      [actions.reset]           : this.reset,
      [actions.randomize]       : this.randomize
    }
  },

  getInitialState() {
    return new Game()
  },

  tick(state) {
    return state.update() // h4wt
  },

  setTickRate(state, rate) {
    return state.set('tickRate', rate)
  },

  setTickingState(state, ticking) {
    return state.set('ticking', ticking)
  },

  setBoardSize(state, dimensions) {
    let { width, height } = state.board
    let size = { width, height, ...dimensions }

    return state.set('board', state.board.merge({
      ...size, cells: initialBoardState(size)
    }))
  },

  setCellState(state, nextCell) {
    let { x, y }    = nextCell

    const index     = x + state.board.width * y
    const nextCells = state.board.cells.set(index, nextCell)
    const board     = state.board.set('cells', nextCells)

    return state.merge({ age: 0, board })
  },

  reset(state) {
    let { width, height } = state.board
    const board = state.board.set('cells', initialBoardState({ width, height }))

    return state.merge({ age: 0, ticking: false, board })
  },

  randomize(state) {
    const board = state.board.set('cells', state.board.cells.map(cell => {
      return cell.set('alive', Math.random() < .4)
    }))

    return state.merge({ age: 0, board })
  }

}

export default GameStore
