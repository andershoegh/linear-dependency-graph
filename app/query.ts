import { graphql } from "@/lib/gql";
import { IssuesQuery } from "@/lib/gql/graphql";
import { ArrayElement } from "@/utils/typeHelpers";

export const getCycles = graphql(`
  query cycles {
    cycles {
      nodes {
        id
        name
        number
        startsAt
        endsAt
        issues {
          nodes {
            id
          }
        }
      }
    }
  }
`);

export const getIssues = graphql(`
  query issues($id: String!) {
    cycle(id: $id) {
      id
      issues {
        nodes {
          id
          identifier
          priority
          title
          estimate
          state {
            name
          }
          inverseRelations {
            nodes {
              id
              type
              issue {
                id
                title
              }
              relatedIssue {
                title
                id
              }
            }
          }
        }
      }
    }
  }
`);

export type Issues = IssuesQuery["cycle"]["issues"]["nodes"];
export type Issue = ArrayElement<IssuesQuery["cycle"]["issues"]["nodes"]>;
