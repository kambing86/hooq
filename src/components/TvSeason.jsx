import * as React from "react";
import { Link } from "react-router-dom";

import "./TvSeason.scss";

class TvSeason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { seasons, routeProps } = this.props;
    const { id } = routeProps.match.params;
    const displaySeasonNumber = parseInt(routeProps.match.params.season, 10);
    const displaySeason =
      seasons.find(season => season.season_number === displaySeasonNumber);
    if (displaySeason) {
      return (
        <div>
          <div className="tv-season-selector">
            Season:
            {
              seasons.map(season => (season.season_number === displaySeasonNumber) ?
                  (<span key={season.id} className="season-number">{season.season_number}</span>) :
                  (<Link key={season.id} className="season-link" to={`/tv/${id}/${season.season_number}`}>{season.season_number}</Link>))
            }
          </div>
          <ul>
            {displaySeason.details.episodes.map(episode => (
              <li key={episode.id}>{episode.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default TvSeason;
