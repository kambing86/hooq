const http = require("http");
const express = require("express");
const skipMap = require("skip-map");
const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./server/graphql-schema");
const ServerShutdown = require("server-shutdown");

const app = express();
const httpServer = http.createServer(app);
const serverShutdown = new ServerShutdown();

const isDevelopment = process.env.NODE_ENV === "development";
const graphqlConfig = {
  schema: MyGraphQLSchema,
  graphiql: true,
};
if (isDevelopment) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("./webpack.config")(null, null, true);
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    // publicPath: webpackConfig.output.path,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static("dist"));
  graphqlConfig.graphiql = false;
}

app.use(skipMap());

app.use("/graphql", graphqlHTTP(graphqlConfig));

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  if (isDevelopment) {
    require("opn")(`http://localhost:${port}`);
  }
});

serverShutdown.registerServer(httpServer);
process.on("SIGTERM", () => {
  serverShutdown.shutdown(() => {
    process.exit();
  });
});
