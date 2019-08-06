const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../server.ts'),
  devtool: "source-map",
  resolve: {
    extensions: [".json", ".js", ".ts", ".tsx"]
  },
  output: {
    path: path.resolve(__dirname, '../build/server'),
    filename: 'index.js',
    publicPath: '../../'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modues/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  node: {
    __dirname: false
  },
  target: "node"
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};