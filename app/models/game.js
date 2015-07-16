import { Record, fromJS } from 'immutable'
import Board from './board'

const GameSchema = Record({
  age      : 0,
  tickTime : 0,
  lastTick : 0,
  tickRate : 100,
  ticking  : false,
  board    : new Board()
})

export default class Game extends GameSchema {

  constructor(params) {
    super(params)
  }

  canChange() {
    return !this.ticking
  }

  update() {
    let age       = this.age + 1
    let board     = this.board.update()
    let now       = new Date().getTime()
    let last      = this.lastTick || now
    let tickTime  = now - last

    return this.merge({ age, board, tickTime, lastTick: now })
  }
}
