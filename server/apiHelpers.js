const cacheHelper = require("./cacheHelper");

const MOVIE_DB_3_KEY = process.env.MOVIE_DB_3_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

module.exports = {
  getTvList({ page = 1 }) {
    return cacheHelper.fetchJSON(`${BASE_URL}discover/tv?api_key=${MOVIE_DB_3_KEY}&page=${page}`)
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
