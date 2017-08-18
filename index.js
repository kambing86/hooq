const express = require("express");
const skipMap = require("skip-map");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./server/graphql-schema");

const app = express();

const environment = process.env.NODE_ENV;
if (environment === "development") {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    // publicPath: webpackConfig.output.path,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static("dist"));
}

app.use(skipMap());

app.use("/graphql", graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
}));

app.listen(8080, () => {});