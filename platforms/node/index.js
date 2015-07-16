/**
 * This is a prelude script to setup the server
 * environment.
 */

var Hoek = require('hoek')
var Server = require('./server')

/**
 * Load in environment variables
 * http://12factor.net/config
 */
require('node-env-file')('.env')

/**
 * Boot application.
 * http://hapijs.org
 */
Server.init(process.env.PORT, function(error, server) {

  Hoek.assert(!error, error)
  console.log('Serving application at %s', server.info.uri)
})
