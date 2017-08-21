import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

import TopBar from "../components/TopBar";
import Home from "../components/Home";
import Movie from "../components/Movie";

import Tv from "./Tv";
import TvDetail from "./TvDetail";
import Favourite from "./Favourite";

const App = ({ state: isLoading }) => (
  <Router>
    <div className="full-frame flex-col">
      <TopBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/tv" component={Tv} />
      <Route path="/tv/:id" component={TvDetail} />
      <Route exact path="/movie" component={Movie} />
      <Route exact path="/favourite" component={Favourite} />
      {isLoading ? <div className="loadingOverlay" /> : null}
    </div>
  </Router>
);

export default connect(state => ({
  state: state.isLoadingReducer,
}))(App);
