const fetch = require("node-fetch");

const MOVIE_DB_3_KEY = process.env.MOVIE_DB_3_KEY;
const genresPromise = fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${MOVIE_DB_3_KEY}`).then(result => result.json());

module.exports = {
  Query: {
    tvs(obj, args) {
      const { page = "1" } = args;
      return fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${MOVIE_DB_3_KEY}&page=${page}`)
        .then(result => result.json())
        .then(json => json.results);
        // .then(json => json.results
        //   .map(tv =>
        //     fetch(`https://api.themoviedb.org/3/tv/${tv.id}?api_key=${MOVIE_DB_3_KEY}`)
        //       .then(result => result.json())));
    },
    tv(obj, args) {
      const { id } = args;
      if (id === undefined) return null;
      return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${MOVIE_DB_3_KEY}`)
        .then(result => result.json());
    },
    genres() {
      return genresPromise
        .then(json => json.genres);
    },
    genre(obj, args) {
      const { id } = args;
      return genresPromise
        .then(json => json.genres.find(genre => genre.id === id))
        .then(result => result || { id, name: null });
    },
  },
  TV: {
    genre_ids(tv) {
      return tv.genre_ids
        .map(id =>
          genresPromise
            .then(json => json.genres.find(genre => genre.id === id))
            .then(result => result || { id, name: null }));
    },
  },
};
