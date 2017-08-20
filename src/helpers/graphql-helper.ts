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
};
