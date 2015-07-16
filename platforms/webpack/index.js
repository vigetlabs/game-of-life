require('node-env-file')('.env', { raise: false })

var Server  = require('webpack-dev-server')
var Webpack = require('webpack')
var config  = require('../../config/webpack')
var url     = require('url')
var port    = parseInt(process.env.PORT) + 1

var location = url.format({
  hostname : require('os').hostname(),
  port     : port,
  protocol : 'http'
})

config.devtool = '#eval-source-map'

config.entry.unshift(
  'webpack-dev-server/client?' + location,
  'webpack/hot/dev-server'
)

config.module.loaders.unshift({
  test    : /\.jsx*$/,
  exclude : /node_modules/,
  loader  : 'react-hot'
})

config.output.publicPath = url.resolve(location, 'assets')

config.plugins.push(
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
)

var server = new Server(Webpack(config), {
  contentBase  : '.',
  publicPath   : config.output.publicPath,
  hot          : true
  // quiet        : true,
  // noInfo       : true,
  // watchOptions : {
  //   aggregateTimeout: 100
  // }
})

server.listen(port, function() {
  console.log("Serving assets at:", location)
})

module.exports = server
