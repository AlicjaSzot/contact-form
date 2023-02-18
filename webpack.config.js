const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");


let headScript = "";
let footer = "";
let menu = "";
try {
  headScript = fs.readFileSync(path.join(__dirname, "./src/head.html"), "utf8");
  footer = fs.readFileSync(path.join(__dirname, "./src/footer.html"), "utf8");
  menu = fs.readFileSync(path.join(__dirname, "./src/menu.html"), "utf8");
  console.log(menu);
} catch (e) {
  console.error(`\n ${e} \n`);
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          //   // Creates style nodes from JS strings
          MiniCssExtractPlugin.loader,

          //   // Translates CSS into CommonJS
          "css-loader",

          //   // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // {
      //   test: /\.html$/,
      //   loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      // minify: true,
      headScript: headScript,
      footer: footer,
      menu: menu,
      cache: false,
    }),
    // new HtmlWebpackPlugin({
    //   filename: "menu.html",
    //   template: "./src/menu.html",
    // }),
  ],
  devServer: {
    watchFiles: [path.join(__dirname, "src/**/*.html")],
    port: 8080,
    // watchFiles: ["./src/**/*"],
    hot: true,
  },
};

