import * as React from "react";
import helper from "../helpers/graphql-helper";

import "./TvDetail.scss";

class TvDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    helper.getTv(id).then(result => this.setState({ data: result.data }));
  }
  render() {
    let tvDetail = null;
    if (this.state.data) {
      const { tv } = this.state.data;
      const imagePath = `http://image.tmdb.org/t/p/w185${tv.poster_path}`;
      const seasonDetail = (
        <div className="tv-detail-season">
          <ul>
            {tv.details.seasons.map(season => (
              <li key={season.id}>
                <div>Season {season.season_number}</div>
                <ul>
                  {season.details.episodes.map(episode => (
                    <li key={episode.id}>{episode.name}</li>
                  ))}
                </ul>
              </li>))}
          </ul>
        </div>
      );
      tvDetail = (
        <div className="main-view">
          <div className="tv-detail-overview">
            <h1>{tv.name}</h1>
            <img src={imagePath} alt={tv.name} />
          </div>
          {seasonDetail}
        </div>
      );
    }
    return tvDetail;
  }
}

export default TvDetail;
