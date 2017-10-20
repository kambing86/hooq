import * as React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import _ from "lodash";

import helper from "../helpers/graphql-helper";
import getPoster from "../helpers/getPoster";

import setLoading from "../actions/setLoading";

import "./Tv.scss";

const sortValue = {
  Recommended: "vote_average.desc",
  "Most Recent": "first_air_date.desc",
  "Most Popular": "popularity.desc",
};

class Tv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const queryValues = this.getDefaultQueryString();
    this.getDataAndSetState(queryValues);
  }
  componentDidUpdate(prevProps) {
    if (_.eq(this.props.location, prevProps.location)) return;
    const queryValues = this.getDefaultQueryString();
    this.getDataAndSetState(queryValues);
  }
  getDefaultQueryString() {
    const { search } = this.props.location;
    const queryValues = queryString.parse(search);
    const { page = 1, sort_by = "popularity.desc" } = queryValues;
    Object.assign(queryValues, { page: parseInt(page, 10), sort_by });
    return queryValues;
  }
  setQueryString(queryValues) {
    const { pathname } = this.props.location;
    this.props.history.push(`${pathname}?${queryString.stringify(queryValues)}`);
  }
  getDataAndSetState(queryValues) {
    this.props.dispatch(setLoading(true));
    helper.getTvList(queryValues).then((result) => {
      this.props.dispatch(setLoading(false));
      this.setState({ data: result.data });
      this.setQueryString(queryValues);
    });
  }
  prevClick() {
    const queryValues = this.getDefaultQueryString();
    queryValues.page -= 1;
    this.getDataAndSetState(queryValues);
  }
  nextClick() {
    const queryValues = this.getDefaultQueryString();
    queryValues.page += 1;
    this.getDataAndSetState(queryValues);
  }
  changeSort(event) {
    const queryValues = this.getDefaultQueryString();
    queryValues.sort_by = event.target.value;
    this.getDataAndSetState(queryValues);
  }
  tvClick(id) {
    this.props.history.push(`/tv/${id}`);
  }
  render() {
    const { page = "1" } = queryString.parse(this.props.location.search);
    let tvList = null;
    if (this.state.data) {
      tvList = this.state.data.tvs.map(tv =>
        (
          <div className="tv-button" role="button" key={tv.id} onClick={() => this.tvClick(tv.id)}>
            {getPoster(tv.poster_path)}
            <div className="tv-name">{tv.name}</div>
            <div className="cover" />
          </div>
        ));
    }
    return (
      <div className="main-view">
        <div className="main-control text-center">
          Sort
          <select onChange={e => this.changeSort(e)} value={this.getDefaultQueryString().sort_by}>
            {_.map(sortValue, (value, key) =>
              (
                <option
                  key={key}
                  value={value}
                >
                  {key}
                </option>
              ))
            }
          </select>
        </div>
        <div className="tv-list-center">
          {tvList}
        </div>
        <div className="main-control text-center">
          {page !== "1" ? <button onClick={() => this.prevClick()}>Prev</button> : null}
          <button onClick={() => this.nextClick()}>Next</button>
        </div>
      </div>
    );
  }
}

export default connect()(Tv);
