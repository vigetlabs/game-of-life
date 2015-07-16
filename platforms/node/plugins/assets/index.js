/**
 * Assets
 * Static asset management
 */

var Handler = require('./handler')

module.exports = function(server, options, next) {
  var settings = server.settings.app

  var cache = {
    expiresIn: settings.isProduction? 86400000 : 0
  }

  server.route([
    {
      method: 'GET',
      path: '/favicon.ico',
      config: {
        handler: {
          file: 'assets/favicon.ico'
        },
        cache: cache
      }
    },
    {
      method: 'GET',
      path: '/assets/{param*}',
      config: {
        handler : Handler(server),
        cache   : cache
      }
    }
  ])

  next()
}

module.exports.attributes = {
  name : 'Static Assets'
}
