import App  from '../../index'
import Home from '../home'

describe('Components - Home', function() {
  let app = null

  beforeEach(function(done) {
    app = new App()
    app.start(done)
  })

  it ('increases its count', function() {
    let component = TestUtils.renderIntoDocument(<Home app={ app } { ...app.valueOf() } />)

    TestUtils.Simulate.click(React.findDOMNode(component.refs.button))

    app.get('counter').get('count').should.equal(1)
  })

})
