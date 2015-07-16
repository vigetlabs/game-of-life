var Webpack = require('webpack')
var webpack_config = require('./webpack')

module.exports = function (config) {

  config.set({

    browsers: [ 'Chrome' ],

    // Help CI
    browserNoActivityTimeout: 30000,

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      '../app/**/__tests__/*.test.js*'
    ],

    preprocessors: {
      '../app/**/__tests__/*.js*': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'nyan', 'coverage' ],

    coverageReporter: {
      type: 'html',
      subdir: '.',
      dir: process.env.CIRCLE_ARTIFACTS || '../coverage'
    },

    webpack: {
      devtool: 'cheap-module-inline-source-map',

      plugins: webpack_config.plugins.concat([
        new Webpack.ProvidePlugin({
          'React': 'react/addons'
        }),
        new Webpack.DefinePlugin({
          'TestUtils': 'React.addons.TestUtils'
        })
      ]),

      resolve: webpack_config.resolve,

      module: {
        loaders: [{
          test    : /\.jsx*$/,
          exclude : /node_modules/,
          loader  : 'babel',
          query   : { optional: ['runtime'] }
        }],
        postLoaders: [
          {
            test: /\.jsx*$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  })
}
