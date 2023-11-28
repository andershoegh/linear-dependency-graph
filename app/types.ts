import IssueNode from "@/components/flow/IssueNode";
import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";
import { Issue } from "./query";

export type Edge = {
  type: string;
  target: string;
  source: string;
  val: string;
  id: string;
  animated?: boolean;
};

export type IssueEdge<T extends SimulationNodeDatum> =
  SimulationLinkDatum<T> & {
    target: string;
    source: string;
    id: string;
  };

export type IssueNode = SimulationNodeDatum & {
  data: Issue;
  id: string;
  type?: string;
  position: { x: number; y: number };
};
