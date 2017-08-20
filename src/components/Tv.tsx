import * as React from "react";
import helper from "../helpers/graphql-helper";

class Tv extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    helper.getTvList().then(result => this.setState({ data: result.data }));
  }
  render() {
    let tvList = null;
    if (this.state.data) {
      tvList = this.state.data.tvs.map(tv => {
        const imagePath = `http://image.tmdb.org/t/p/w185${tv.poster_path}`;
        return (
          <div key={tv.id}>
            <img src={imagePath} />
            {tv.name}
          </div>
        );
      });
    }
    return (<div>
      <h1>Tv</h1>
      <div className="tvList">
        {tvList}
      </div>
    </div>
    )
  }
}

export default Tv;
