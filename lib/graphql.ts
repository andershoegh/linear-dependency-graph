import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  process.env.LINEAR_API_URL as string,
  {
    headers: {
      Authorization: `${process.env.LINEAR_TOKEN}`,
    },
  }
);
