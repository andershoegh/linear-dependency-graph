"use client";

import { useCallback, useEffect, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force";
import ReactFlow, {
  Background,
  Controls,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import useWindowDimensions from "../../lib/hooks/useWindowDimensions";

import { Spinner } from "@/components/loading/spinner";
import { Issues } from "../query";
import { nodeTypes } from "@/components/flow/customTypes";
import { Edge, IssueEdge, IssueNode } from "../types";

type Props = {
  issues: Issues;
  edges: Edge[];
};

export const NetworkGraph = ({ issues, edges }: Props) => {
  const { height, width } = useWindowDimensions();
  const [simulating, setSimulating] = useState(false);
  const [nodes, setNodes] = useState<IssueNode[]>([]);

  useEffect(() => {
    if (!width || !height) return;

    setSimulating(true);

    const simulation = forceSimulation<Omit<IssueNode, "position">>(
      issues.map((issue) => ({
        data: issue,
        id: issue.id,
        type: "issueNode",
      }))
    )
      .force(
        "link",
        forceLink<IssueNode, IssueEdge<IssueNode>>(edges)
          .id((d) => {
            return d.data.id;
          })
          .distance(210)
      )
      .force("charge", forceManyBody().strength(-2500))
      .force("x", forceX())
      .force("y", forceY())
      .on("tick", () => {
        setNodes(
          simulation.nodes().map((node) => {
            return {
              ...node,
              position: { x: node.x || 0, y: node.y || 0 },
            };
          })
        );
      })
      .on("end", () => {
        setSimulating(false);
      });
  }, [edges, height, issues, width]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        className={` ${simulating && "group is-simulating-node-position"}`}
        onNodesChange={onNodesChange}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        nodesDraggable={true}
      >
        <Background />
        <Controls />
        {simulating && (
          <div className="absolute top-1/2 left-1/2 z-50">
            <Spinner />
          </div>
        )}
      </ReactFlow>
    </div>
  );
};
