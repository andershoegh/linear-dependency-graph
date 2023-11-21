import { Suspense } from "react";
import { IssueCard } from "./IssueCard";
import { linearClient } from "../lib/linear";
import { ExtendedIssue } from "./types";
import { NetworkGraph } from "./NetworkGraph";
import { IssueRelation } from "@linear/sdk";

const currentCycle = await linearClient.cycle(
  "669a0abd-7a5e-45ad-8580-e5e15dfca100"
);

const getIssuesToShow: () => Promise<ExtendedIssue[]> = async () => {
  const currentCycleIssues = (await currentCycle.issues()).nodes;

  console.log((await linearClient.cycles()).nodes);

  const extendedIssues: ExtendedIssue[] = await Promise.all(
    currentCycleIssues.map(async (issue) => {
      const workflowState = await issue.state;
      const assignee = await issue.assignee;
      const relations: Pick<IssueRelation, "id" | "type">[] = (
        await issue.relations()
      ).nodes.map((node) => {
        return {
          id: node.id,
          type: node.type,
        };
      });
      console.log(relations);

      return {
        id: issue.id,
        identifier: issue.identifier,
        priority: issue.priority,
        title: issue.title,
        estimate: issue.estimate,
        name: workflowState?.name,
        avatarUrl: assignee?.avatarUrl,
        relations,
      };
    })
  );

  return extendedIssues;
};

export default async function Home() {
  const issuesToVisualize = await getIssuesToShow();

  return (
    <main className="">
      <NetworkGraph issuesToVisualize={issuesToVisualize} />
    </main>
  );
}
