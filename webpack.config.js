const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./js/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.main.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //  every file with a js or jsx extension Webpack pipes the code through babel-loader
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "app"),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: "index.html",
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "models", to: "models" },
        { from: "audio", to: "audio" },
      ],
    }),
  ],
  mode: "development",
};
