import * as React from "react";

export default (posterPath) => {
  if (posterPath) {
    return (<img src={`//image.tmdb.org/t/p/w185${posterPath}`} alt={posterPath} />);
  }
  return (<div className="empty-image" />);
};
