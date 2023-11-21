import { LinearClient } from "@linear/sdk";

export const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_TOKEN,
});
