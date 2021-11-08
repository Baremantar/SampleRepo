const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].${ext}`);

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./dev/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename("js"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img",
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "font",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: filename("html"),
      template: "./dev/pug/dev-page.pug",
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
};
