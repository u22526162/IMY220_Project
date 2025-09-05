const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: "./src/index.js",
 output: {
 path: path.resolve("public"),
 filename: "bundle.js"
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
 ]
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true
  },
resolve: {
  extensions: [".js", ".jsx"]
}
}