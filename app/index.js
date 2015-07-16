import Microcosm from 'microcosm'
import Game      from './stores/game'

class App extends Microcosm {

  constructor() {
    super()
    this.addStore('game', Game)
  }

}

export default App
