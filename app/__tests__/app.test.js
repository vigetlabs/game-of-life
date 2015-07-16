import App from '../../app'
import { increaseCount } from '../actions/counter'

describe('App', function() {
  let app = null

  beforeEach(function(done) {
    app = new App()
    app.start(done)
  })

  describe('when the increaseCount action is fired', function() {
    beforeEach(function() {
      app.push(increaseCount, 1)
    })

    it ('should increase the counter by one', function() {
      app.get('counter').get('count').should.equal(1)
    })
  })

})
