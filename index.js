const http = require("http");
const express = require("express");
const skipMap = require("skip-map");
const ServerShutdown = require("server-shutdown");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const MyGraphQLSchema = require("./server/graphql-schema");

const app = express();
const httpServer = http.createServer(app);
const serverShutdown = new ServerShutdown();

const isDevelopment = process.env.NODE_ENV === "development";
const graphqlConfig = {
  schema: MyGraphQLSchema,
};
if (isDevelopment) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackConfig = require("./webpack.config")();
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    // publicPath: webpackConfig.output.path,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
} else {
  app.use(express.static("dist"));
}

app.use(skipMap());

app.use("/graphql", bodyParser.json(), graphqlExpress(graphqlConfig));

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  if (isDevelopment) {
    require("opn")(`http://localhost:${port}`);
  }
});

let alive = true;
app.get("/health", (req, res) => {
  if (alive) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});
serverShutdown.registerServer(httpServer);
process.on("SIGTERM", () => {
  alive = false;
  setTimeout(() => {
    serverShutdown.shutdown(() => {
      process.exit();
    });
  }, 5000);
});
