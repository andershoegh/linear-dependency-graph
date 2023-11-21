import React from "react";
import { Issue, WorkflowState } from "@linear/sdk";
import { ExtendedIssue } from "./types";

type Props = {
  issue: ExtendedIssue;
};

export const IssueCard = async ({ issue }: Props) => {
  const { estimate, id, identifier, priority, title, name, avatarUrl } = issue;

  return (
    <div className="rounded-xl border border-muted-foreground bg-slate-900 text-card-foreground shadow w-96 h-28 flex items-center px-4 py-2">
      <div className="">
        <div className="text-sm">
          <p className="text-xs text-muted-foreground">
            {identifier} - {name}
          </p>
          <p className="text-card-foreground line-clamp-2">{title}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="p-2 bg-gray-200"></div>
          <div className="p-2 bg-gray-200"></div>
          <div className="p-2 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
