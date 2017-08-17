if (DEVELOPMENT) {
  require("react-hot-loader/patch");
}
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

let AppContainer;
if (DEVELOPMENT) {
  AppContainer = require("./helpers/AppContainer").default;
}

import "./index.pug";
import "./index.scss";

import App from "./components/App";
import ajaxRequest from "./helpers/ajaxRequest";
import * as reducers from "./reducers";

let enhancer;
if (DEVELOPMENT) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  combineReducers(reducers),
  enhancer,
);

const appRoot = document.getElementById("app");

const render = () => {
  if (DEVELOPMENT) {
    ReactDOM.render((
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>
    ), appRoot);
  } else {
    ReactDOM.render((
      <Provider store={store}>
        <App />
      </Provider>
    ), appRoot);
  }
};

render();

if (DEVELOPMENT) {
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept("./components/App", () => {
      render();
    });
  }
}

(async () => {
  try {
    const data = JSON.parse(await ajaxRequest.get("/data/products.json"));
    store.dispatch({
      type: "INIT_DATA",
      data,
    });
  } catch (e) {
    console.error(e);
  }
})();
