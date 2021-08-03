const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require("glob");

module.exports = {
  entry: {
    "bundle.js": glob
      .sync("build/static/?(js|css)/*.?(js)")
      .map((f) => path.resolve(__dirname, f)),
  },
  output: {
    filename: "build/feedback-module.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new UglifyJsPlugin()],
};
