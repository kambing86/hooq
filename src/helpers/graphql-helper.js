import ApolloClient, { createNetworkInterface } from "apollo-client";
import gql from "graphql-tag";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/graphql",
  }),
});

export default {
  getTvList() {
    return client.query({
      query: gql `
        query {
          tvs {
            id
            name
            poster_path
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
