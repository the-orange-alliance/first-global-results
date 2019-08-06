const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../client.tsx'),
  devtool: "source-map",
  resolve: {
    extensions: [".json", ".js", ".ts", ".tsx", ".png", ".jpg"]
  },
  output: {
    path: path.join(__dirname, '../build/client'),
    filename: 'index.js',
    publicPath: '/build/client/'
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
  devServer: {
    contentBase: path.join(__dirname, "../"),
    publicPath: "http://localhost:9090/build/client/",
    port: 9090
  },
  node: {
    __dirname: false
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // }
};