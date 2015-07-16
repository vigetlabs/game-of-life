/**
 * The Router contains all URL states. With react-router, they can be nested.
 * Each nested route gets its own layout, provided by the handler property,
 * as seen below...
 */

import React from 'react'
import Router, { Route, NotFoundRoute } from 'react-router'

const routes = (
  <Route handler={ require('./components/layout') }>
    <Route name="home" path="/" handler={ require('./components/home') } />
    <NotFoundRoute handler={ require('./components/404') } />
  </Route>
)

export default Router.create({
  routes   : routes,
  location : Router.HistoryLocation,

  onError(error) {
    console.error(error)
  }
})
