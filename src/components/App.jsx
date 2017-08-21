import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import TopBar from "../containers/TopBar";
import Home from "../containers/Home";
import Movie from "./Movie";
import Tv from "./Tv";
import TvDetail from "./TvDetail";

const App = () => (
  <Router>
    <div className="full-frame flex-col">
      <TopBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/tv" component={Tv} />
      <Route exact path="/tv/:id" component={TvDetail} />
      <Route exact path="/movie" component={Movie} />
    </div>
  </Router>
);

export default App;
