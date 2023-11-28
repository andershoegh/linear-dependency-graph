import { getCycles } from "@/app/query";
import { graphQLClient } from "@/lib/graphql";
import React from "react";
import { CycleCard } from "./CycleCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const CycleOptions = async () => {
  const cycles = await graphQLClient.request(getCycles);

  return (
    <div>
      <Table className="max-w-xl">
        <TableCaption>Cycles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Issue count</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cycles.cycles.nodes.map((cycle) => (
            <CycleCard cycle={cycle} key={cycle.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
