require('chai').should()

var Lab    = require('lab')
var Server = require('../server')
var lab    = exports.lab = Lab.script()

lab.experiment('index', function() {

  lab.test('should create a server', function(done) {

    Server.init(0, function(err, server) {

      server.info.port.should.be.above(0)
      server.stop(done)
    })
  })

});
