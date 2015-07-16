/**
 * Client
 * Supports rendering and authentication for the client-side
 * application (see ./app)
 */

var Swig = require('swig')
var Routes = require('./routes')
var Path = require('path')

module.exports = function(server, options, next) {
  server.views({
    engines: {
      html: Swig
    },
    path     : Path.join(__dirname, 'templates'),
    isCached : server.settings.app.isProduction,
    context  : server.settings.app
  })

  server.route(Routes)

  next()
}

module.exports.attributes = {
  name : 'Views'
}
