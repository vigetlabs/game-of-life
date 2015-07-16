var Good = require('good')
var Console = require('good-console')

module.exports = {
  register : Good,
  options  : {
    opsInterval : 1000,
    reporters   : [{
      reporter  : Console,
      events    : { log: '*', error: '*', response: '*' }
    }]
  }
}
