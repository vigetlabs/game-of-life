var Hapi   = require('hapi')
var Logger = require('./plugins/logger')
var Assets = require('./plugins/assets')
var Views  = require('./plugins/views')

exports.init = function(port, next) {

  var server = new Hapi.Server({
    app   : require('./config/app'),
    debug : { log: ['*'], request: ['*'] }
  })

  server.connection({ port : port })

  server.register([ Logger, Assets, Views ], function(error) {

    if (error) {
      return next(error, server)
    }

    return server.start(function(error) {
      return next(error, server)
    })
  })

}
