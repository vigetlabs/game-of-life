var isDev   = process.env.NODE_ENV === 'development'
var Webpack = require('webpack')
var path    = require('path')

module.exports = {
  debug: isDev,

  devtool: isDev ? 'eval-source-map' : '',

  entry: {
    app: ['webpack/hot/dev-server', './src/main.js']
  },

  output: {
    path:       path.resolve(__dirname, 'dist'),
    filename:   'main.js',
    publicPath: '/'
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  resolve: {
    extensions: [ '', '.js', '.jsx', '.sass' ],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src' ]
  },

  module: {
    loaders: [
      {
        test:    /\.js.*$/,
        exclude: /node_modules/,
        loader:  'babel-loader'
      },

      {
        test:   /\.sass$/,
        loader: "style!css!sass?indentedSyntax"
      }
    ]
  }
}
