require('node-env-file')('.env', { require: true })

var isDevelopment = process.env.NODE_ENV === 'development'
var path          = require('path')
var project       = require('../package')
var webpack       = require('webpack')
var autoprefixer  = require('autoprefixer-core')

var config = {
  context: path.resolve(__dirname, '..', 'platforms', 'browser'),

  debug: isDevelopment,

  devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',

  entry: [ './index.jsx' ],

  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: project.name + '.js'
  },

  plugins: [
    // Note: we use babel for environment variables, however this is necessary
    // for node_modules
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.sass'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'app' ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('css-mqpacker'),
    require('csswring')
  ],

  node: {
    buffer: false,
    process: false
  },

  postcss: [ autoprefixer ],

  module: {
    noParse: [ 'immutable' ],
    loaders: [
      {
        test    : /\.(css|sass)$/,
        loader  : 'style!css!postcss'
      },
      {
        test    : /\.sass$/,
        loader  : 'sass',
        query   : {
          indentedSyntax : true,
          outputStyle    : 'expanded'
        }
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel'
      },
      {
        test    : /\.json$/,
        loader  : 'json'
      }
    ]
  }
}

if (isDevelopment === false) {
  config.module.loaders.push({
    test    : /\.jsx?$/,
    loader  : 'webpack-assert'
  })
}

module.exports = config
