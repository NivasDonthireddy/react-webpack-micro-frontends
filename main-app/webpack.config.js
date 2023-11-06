const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new ModuleFederationPlugin({
      remotes: {
        AccountsSummaryApp:
          "AccountsSummaryApp@http://localhost:9001/remoteEntry.js",
        AccountDetailsApp:
          "AccountDetailsApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
