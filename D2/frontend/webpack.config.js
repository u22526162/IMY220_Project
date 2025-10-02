const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: "./src/index.js",
 output: {
 path: path.resolve("public"),
 filename: "bundle.js",
 publicPath: "/"
 },
 mode: "development",
 module: {
 rules: [
 {
 test: /\.js$/,
 exclude: /node_modules/,
 use: {
    loader: "babel-loader",
    options: {
    presets: ['@babel/preset-env', '@babel/preset-react']
    }
 }
 },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]'
    }
  }
 ]
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true
  },
resolve: {
  extensions: [".js", ".jsx"]
}
}