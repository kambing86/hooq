module.exports = `
type TV_Episode {
  id: ID
  name: String
  air_date: String
  episode_number: Int
  overview: String
  season_number: Int
  still_path: String
  vote_average: Float
  vote_count: Int
}

type TV_Season_Details {
  name: String
  episodes: [TV_Episode]
  overview: String
}

type TV_Season {
  id: ID
  tvId: ID
  air_date: String
  episode_count: Int
  poster_path: String
  season_number: Int
  details: TV_Season_Details
}

type TV_Genre {
  id: ID
  name: String
}

type TV_Details {
  episode_run_time: [Int]
  homepage: String
  in_production: Boolean
  last_air_date: String
  number_of_episodes: Int
  number_of_seasons: Int
  seasons: [TV_Season]
  status: String
  type: String
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
  genres: [TV_Genre]
  original_language: String
  backdrop_path: String
  overview: String
  origin_countries: [String]
  details: TV_Details
}

type Query {
  tvs(page: Int, sort_by: String): [TV]
  tv(id: ID!): TV
  tv_genres: [TV_Genre]
  tv_genre(id: ID!): TV_Genre
}

schema {
  query: Query
}
`;
