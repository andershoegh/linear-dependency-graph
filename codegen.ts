import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.linear.app/graphql",
  documents: ["app/query.ts"],
  ignoreNoDocuments: true,

  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          DateTime: "string", // ISO8601
        },
      },
    },
  },
};

export default config;
