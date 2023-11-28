import { CycleSelector } from "@/app/[cycle]/cycles/CycleSelector";
import { NetworkGraph } from "./NetworkGraph";
import { graphQLClient } from "@/lib/graphql";
import { getIssues } from "../query";
import { Edge } from "../types";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default async function Page({ params }: { params: { cycle: string } }) {
  console.log(params.cycle);
  const {
    cycle: { issues },
  } = await graphQLClient.request(getIssues, {
    id: params.cycle,
  });

  const edges: Edge[] = [];

  issues.nodes.forEach((issue) => {
    issue.inverseRelations.nodes.forEach((relation) => {
      if (
        relation.type === "blocks" &&
        issues.nodes.some((issue) => {
          return issue.id === relation.relatedIssue.id;
        })
      ) {
        edges.push({
          id: issue.id + relation.issue.id,
          source: issue.id,
          target: relation.issue.id,
          type: "",
          val: issue.id,
          animated: true,
        });
      }
    });
  }, []);

  console.log(issues);

  return (
    <div className="relative">
      <Suspense
        fallback={<div className="absolute top-2 left-2">Loading...</div>}
      >
        <CycleSelector cycleID={params.cycle} />
      </Suspense>
      {issues.nodes.length > 0 ? (
        <NetworkGraph issues={issues.nodes} edges={edges} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Alert className="max-w-lg">
            <Info className="h-4 w-4" />
            <AlertTitle>No issues!</AlertTitle>
            <AlertDescription>
              This cycle contains no Linear issues - choose another cycle!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
