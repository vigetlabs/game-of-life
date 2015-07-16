/**
 * Bootstrapping.
 * Pull in the Router and mount it to the DOM at #app.
 */

import 'styles/conway'
import App    from '../../app'
import React  from 'react'
import Router from '../../app/router'


const app    = new App()
const target = document.querySelector("#app")

app.start(function() {

  Router.run(function(Handler, state) {
    React.render(<Handler { ...state } app={ app } />, target)
  })

})
