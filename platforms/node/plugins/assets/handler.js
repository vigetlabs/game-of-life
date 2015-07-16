var OS = require('os')
var URL = require('url')

module.exports = function(server) {
  var env = server.settings.app.env

  var assetHost = URL.format({
    hostname : OS.hostname(),
    port     : server.info.port + 1,
    protocol : server.info.protocol
  })

  /**
   * In development we run webpack-dev-server in parallel
   * to preprocess assets and provide other nice developer
   * features.
   */

  var development = {
    proxy: {
      mapUri: function (request, callback) {
        callback(null, URL.resolve(assetHost, request.raw.req.url))
      },
      passThrough: true
    }
  }

  /**
   * In production we just server static assets
   */
  var production = {
    directory: {
      path: 'assets'
    }
  }

  return {
    development : development,
    production  : production
  }[env] || production
}
