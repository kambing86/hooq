const cacheHelper = require("./cacheHelper");
const queryString = require("query-string");
const moment = require("moment");

const { MOVIE_DB_3_KEY } = process.env;
const BASE_URL = "https://api.themoviedb.org/3/";

module.exports = {
  getTvList(query = {}) {
    const queryObject = Object.assign({
      api_key: MOVIE_DB_3_KEY,
      "first_air_date.lte": moment().format("YYYY-MM-DD"),
    }, query);
    if (query.sort_by === "vote_average.desc") {
      Object.assign(queryObject, {
        "vote_count.gte": 100,
      });
    }
    const queryValues = queryString.stringify(queryObject);
    return cacheHelper.fetchJSON(`${BASE_URL}discover/tv?${queryValues}`)
      .then(json => json.results);
  },
  getTv({ id }) {
    if (id === undefined) return null;
    return cacheHelper.fetchJSON(`${BASE_URL}tv/${id}?api_key=${MOVIE_DB_3_KEY}`);
  },
  getTvGenres() {
    return cacheHelper.fetchJSON(`${BASE_URL}genre/tv/list?api_key=${MOVIE_DB_3_KEY}`);
  },
  getTvSeason({ tvId, seasonNumber }) {
    return cacheHelper.fetchJSON(`${BASE_URL}tv/${tvId}/season/${seasonNumber}?api_key=${MOVIE_DB_3_KEY}`);
  },
};
