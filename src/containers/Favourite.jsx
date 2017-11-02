import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import removeFavourite from "../actions/removeFavourite";

import "./TvDetail.scss";

const Favourite = ({ state: fav, dispatch }) => {
  const favList = fav.map(f => (
    <div key={f.id}>
      <button onClick={() =>
        dispatch(removeFavourite(f))}
      >Remove
      </button>
      <Link to={`/tv/${f.id}`}>{f.name}</Link>
    </div>
  ));
  return (
    <div>
      {favList}
    </div>
  );
};

export default connect(state => ({
  state: state.favouriteReducer,
}))(Favourite);
