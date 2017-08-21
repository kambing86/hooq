import * as React from "react";
import { Link } from "react-router-dom";

import "./TopBar.scss";

const TopBar = () => (
  <div className="col-100 top-bar">
    <Link to="/" className="link">Home</Link>
    <Link to="/tv" className="link">TV</Link>
    <Link to="/movie" className="link">Movie</Link>
    <Link to="/favourite" className="link">Favourite</Link>
  </div>
);

export default TopBar;
