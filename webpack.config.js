// http://jslog.com/2014/10/02/react-with-webpack-part-1/

module.exports = {
  context: __dirname + '/src',
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader!jsx-loader'
    },
      {
        test: /\.scss$/,
        loader: "style!css!sass?sourceMap"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }
};
