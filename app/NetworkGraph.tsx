"use client";

import { useCallback, useEffect, useState } from "react";
import { ExtendedIssue } from "./types";
import {
  SimulationNodeDatum,
  forceSimulation,
  forceLink,
  forceManyBody,
  SimulationLinkDatum,
  forceX,
  forceY,
  forceCenter,
} from "d3-force";
import ReactFlow, {
  Background,
  Controls,
  NodeChange,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import useWindowDimensions from "./hooks/useWindowDimensions";
import IssueNode from "@/components/flow/IssueNode";
import { Spinner } from "@/components/loading/spinner";
import { edgeTypes, nodeTypes } from "@/components/flow/customTypes";

type Props = {
  issuesToVisualize: ExtendedIssue[];
};

type IssueEdge<T extends SimulationNodeDatum> = SimulationLinkDatum<T> & {
  target: string;
  source: string;
  val: number;
  id: string;
};

type IssueNode = SimulationNodeDatum & {
  data: ExtendedIssue & { label: string };
  id: string;
  type?: string;
  position: { x: number; y: number };
};

export const NetworkGraph = ({ issuesToVisualize }: Props) => {
  const [simulating, setSimulating] = useState(false);
  const [nodes, setNodes] = useState<IssueNode[]>([]);
  const { height, width } = useWindowDimensions();

  //   const edges = [
  //       {
  //         type: "centeredEdge",
  //         target: "b5a9b417-de46-4e97-abe2-5f86e7cfdd04",
  //         source: "2e6a9915-8711-4e57-b9a6-f5aa965f16d2",
  //         val: 1,
  //         id:
  //           "b5a9b417-de46-4e97-abe2-5f86e7cfdd04" +
  //           "2e6a9915-8711-4e57-b9a6-f5aa965f16d2",
  //       },
  //   ];

  // TODO Find edges
  const edges = [issuesToVisualize.forEach((issue) => {})];

  useEffect(() => {
    if (!width || !height) return;

    setSimulating(true);

    const simulation = forceSimulation<Omit<IssueNode, "position">>(
      issuesToVisualize.map((issue) => ({
        data: { ...issue, label: issue.identifier },
        id: issue.id,
        type: "issueNode",
      }))
    )
      .force(
        "link",
        forceLink<IssueNode, IssueEdge<IssueNode>>(edges)
          .id((d) => d.data.id)
          .distance(190)
      )
      .force("charge", forceManyBody().strength(-2500))
      .force("x", forceX())
      .force("y", forceY())
      .on("tick", () => {
        console.log("Tick");
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
  }, [height, issuesToVisualize, width]);

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
        edgeTypes={edgeTypes}
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
