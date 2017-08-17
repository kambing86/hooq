import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Home from "../containers/Home";
import Cart from "../containers/Cart";
import ProductDetails from "../containers/ProductDetails";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/details/:id" component={ProductDetails} />
    </div>
  </Router>
);

export default App;
