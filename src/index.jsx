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

import App from "./containers/App";
import * as reducers from "./reducers";

import favouriteCache from "./helpers/favouriteCache";

import setLoading from "./actions/setLoading";
import initFavourite from "./actions/initFavourite";

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
    module.hot.accept("./containers/App", () => {
      render();
    });
  }
}

(async () => {
  store.dispatch(setLoading(true));
  let fav = await favouriteCache.get();
  if (fav === null) fav = [];
  store.dispatch(initFavourite(fav));
  store.dispatch(setLoading(false));
})();
