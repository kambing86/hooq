import ApolloClient, { createNetworkInterface } from "apollo-client";
import gql from "graphql-tag";
import _ from "lodash";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/graphql",
  }),
});

export default {
  getTvList(query = {}) {
    let queryString = "";
    const queryValues = _.map(query, (value, key) => `${key}:${JSON.stringify(value)}`);
    if (queryValues.length > 0) {
      queryString = `(${queryValues.join(",")})`;
    }
    return client.query({
      query: gql `
        query {
          tvs${queryString} {
            id
            name
            poster_path
            popularity
            vote_average
            first_air_date
            genres {
              id
              name
            }
          }
        }
      `,
    });
  },
  getTv(id) {
    return client.query({
      query: gql `
        query {
          tv(id:${id}) {
            id
            name
            genres {
              id
              name
            }
            poster_path
            overview
            details {
              seasons {
                id
                season_number
                air_date
                episode_count
                details {
                  name
                  overview
                  episodes {
                    id
                    air_date
                    episode_number
                    name
                  }
                }
              }
            }
          }
        }
      `,
    });
  },
};
