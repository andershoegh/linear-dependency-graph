import { ExtendedIssue } from "@/app/types";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

const IssueNode = (props: NodeProps<ExtendedIssue>) => {
  const {
    data: { title, identifier, name },
  } = props;

  return (
    <div className="rounded-xl group-[.is-simulating-node-position]:opacity-40 border border-muted-foreground bg-slate-900 text-card-foreground shadow w-64 h-28 flex items-center px-4 py-2 overflow-hidden  ">
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
      <Handle
        position={Position.Top}
        type="source"
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%,-50%)",
          visibility: "hidden",
        }}
      />
      <Handle
        position={Position.Top}
        type="target"
        style={{
          background: "red",
          position: "absolute",
          visibility: "hidden",
          top: "50%",
          right: "50%",
          transform: "translate(50%,-50%)",
        }}
      />
    </div>
  );
};

export default React.memo(IssueNode);
