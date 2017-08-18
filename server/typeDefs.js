module.exports = `
type Season {
  id: ID
  air_date: String
  episode_count: Int
  poster_path: String
  season_number: Int 
}

type Genre {
  id: ID
  name: String
}

type TV {
  id: ID
  original_name: String
  name: String
  vote_count: Int
  vote_average: Float
  poster_path: String
  first_air_date: String
  popularity: Float
  genre_ids: [Genre]
  original_language: String
  backdrop_path: String
  overview: String
  origin_country: [String]
  episode_run_time: [Int]
  homepage: String
  in_production: Boolean
  last_air_date: String
  number_of_episodes: Int
  number_of_seasons: Int
  seasons: [Season]
  status: String
  type: String
}

type Query {
  tvs(page: Int): [TV]
  tv(id: ID): TV
  genres: [Genre]
  genre(id: ID): Genre
}

schema {
  query: Query
}
`;
