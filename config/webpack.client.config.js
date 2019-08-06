const path = require('path');
console.log(path.resolve(__dirname, "../build/client/"));
module.exports = {
  entry: path.resolve(__dirname, '../client.tsx'),
  devtool: "source-map",
  resolve: {
    extensions: [".json", ".js", ".ts", ".tsx"]
  },
  output: {
    path: path.join(__dirname, '../build/client'),
    filename: 'index.js',
    publicPath: '../'
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
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../"),
    publicPath: "http://localhost:8080/build/client/"
  },
  node: {
    __dirname: false
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};