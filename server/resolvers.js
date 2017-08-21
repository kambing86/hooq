const {
  getTvList,
  getTv,
  getTvGenres,
  getTvSeason,
} = require("./apiHelpers");

function addTvIdToSeason(tv) {
  return Object.assign({}, tv, {
    seasons: tv.seasons.map(season => Object.assign({
      tvId: tv.id,
    }, season)),
  });
}

module.exports = {
  Query: {
    tvs(obj, args) {
      return getTvList(args);
    },
    tv(obj, args) {
      return getTv(args);
    },
    tv_genres() {
      return getTvGenres()
        .then(json => json.genres);
    },
    tv_genre(obj, args) {
      const { id } = args;
      return getTvGenres()
        .then(json => json.genres.find(genre => genre.id === id))
        .then(result => result || { id, name: null });
    },
  },
  TV: {
    genres(tv) {
      if (tv.genres) return tv.genres;
      return tv.genre_ids
        .map(id =>
          getTvGenres()
            .then(json => json.genres.find(genre => genre.id === id))
            .then(result => result || { id, name: null }));
    },
    details(tv) {
      if (tv.seasons) {
        return addTvIdToSeason(tv);
      }
      return getTv({ id: tv.id })
        .then(tvDetails => addTvIdToSeason(tvDetails));
    },
    origin_countries(tv) {
      return tv.origin_country;
    },
  },
  TV_Season: {
    details(season) {
      if (season.episodes) return season;
      return getTvSeason({ tvId: season.tvId, seasonNumber: season.season_number });
    },
  },
};
