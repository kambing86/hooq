import * as React from "react";
import helper from "../helpers/graphql-helper";

import "./Tv.scss";

class Tv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    helper.getTvList().then(result => this.setState({ data: result.data }));
  }
  click(id) {
    this.props.history.push(`/tv/${id}`);
  }
  render() {
    let tvList = null;
    if (this.state.data) {
      tvList = this.state.data.tvs.map((tv) => {
        const imagePath = `http://image.tmdb.org/t/p/w185${tv.poster_path}`;
        return (
          <div className="tv-button" role="button" key={tv.id} onClick={() => this.click(tv.id)}>
            <img src={imagePath} alt={tv.name} />
            <div className="tv-name">{tv.name}</div>
            <div className="cover" />
          </div>
        );
      });
    }
    return (
      <div className="main-view">
        <h1>Tv</h1>
        <div>
          {tvList}
        </div>
      </div>
    );
  }
}

export default Tv;
