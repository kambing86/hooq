const webpack = require("webpack");
const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sourcePath = path.join(__dirname, "src");
const deployPath = path.join(__dirname, "dist");
const serverPort = 8080;
const environment = process.env.NODE_ENV;

module.exports = () => {
  const config = {
    devtool: "source-map",
    entry: {
      index: [
        "babel-polyfill",
        "./index.jsx",
      ],
    },
    context: sourcePath,
    output: {
      path: deployPath,
      filename: "[name].js",
    },
    resolve: {
      modules: [
        "node_modules",
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [{
        test: /\.pug$/,
        use: [
          "file-loader?name=[path][name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader",
        ],
      }, {
        test: /\.jsx?$/,
        include: sourcePath,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          plugins: ["lodash"],
          cacheDirectory: true,
        },
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        // use: ExtractTextPlugin.extract({
        //   use: [
        //     "css-loader",
        //     "postcss-loader",
        //     "sass-loader",
        //   ]
        // }),
      }],
    },
    externals: {
      // "gs": "gs",
      // "moment": "moment",
      // "createjs": "createjs",
      // "jquery": "$",
      // "angular-validation": "validation",
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: module => module.context && module.context.indexOf("node_modules") !== -1,
      }),
      new webpack.DefinePlugin({
        DEVELOPMENT: environment === "development",
        "process.env": {
          NODE_ENV: JSON.stringify(environment),
        },
      }),
      // new CopyWebpackPlugin([{ from: "assets" }]),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
        mangle: {
          props: {
            regex: /^rn_.+_rn$/,
          },
        },
        output: {
          comments: false,
        },
      }),
      // new webpack.SourceMapDevToolPlugin({
      //   filename: "[file].map",
      //   append: false,
      // }),
      // new webpack.optimize.ModuleConcatenationPlugin(),
      // new webpack.ProvidePlugin({
      //   "Promise": "bluebird"
      // }),
      // new ExtractTextPlugin({
      //   filename: "[name].css",
      //   allChunks: true,
      // }),
    ],
    devServer: {
      contentBase: deployPath,
      compress: true,
      port: serverPort,
      // enable HMR globally
      // needed if webpack-dev-server run without --hot
      // hot: true,
    },
  };

  if (environment === "development") {
    config.devtool = "cheap-module-eval-source-map";

    // enable HMR globally
    // needed if webpack-dev-server run without --hot
    // config.entry["index"].unshift(`webpack-dev-server/client?http://localhost:${serverPort}/`, "webpack/hot/only-dev-server");
    config.entry.index.unshift("webpack-hot-middleware/client");
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    // prints more readable module names in the browser console on HMR updates
    config.plugins.push(new webpack.NamedModulesPlugin());
  }
  if (process.env.BUNDLE === "true") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
