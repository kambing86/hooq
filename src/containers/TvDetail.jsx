import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import _ from "lodash";

import helper from "../helpers/graphql-helper";
import getPoster from "../helpers/getPoster";
import TvSeason from "../components/TvSeason";

import setLoading from "../actions/setLoading";
import addFavourite from "../actions/addFavourite";
import removeFavourite from "../actions/removeFavourite";

import "./TvDetail.scss";

class TvDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(setLoading(true));
    helper.getTv(id).then((result) => {
      this.props.dispatch(setLoading(false));
      const data = result.data;
      this.setState({ data });
      const firstSeasonNumber = _.head(data.tv.details.seasons).season_number;
      if (firstSeasonNumber !== undefined) {
        this.props.history.replace(`/tv/${id}/${firstSeasonNumber}`);
      }
    });
  }
  render() {
    const { state: fav } = this.props;
    let tvDetail = null;
    if (this.state.data) {
      const { tv } = this.state.data;
      const seasonDetail = (
        <div className="tv-detail-season">
          <Route exact path="/tv/:id/:season" render={routeProps => <TvSeason seasons={tv.details.seasons} routeProps={routeProps} />} />
        </div>
      );
      tvDetail = (
        <div className="main-view">
          <div className="tv-detail-overview">
            {(fav.find(f => f.id === tv.id)) ?
              <button onClick={() =>
                this.props.dispatch(removeFavourite(tv))}
              >Remove Favourite</button> :
              <button onClick={() =>
                this.props.dispatch(addFavourite(tv))}
              >Add Favourite</button>}
            <h1>{tv.name}</h1>
            {getPoster(tv.poster_path)}
            <h3>{tv.overview}</h3>
          </div>
          {seasonDetail}
        </div>
      );
    }
    return tvDetail;
  }
}

export default connect(state => ({
  state: state.favouriteReducer,
}))(TvDetail);
