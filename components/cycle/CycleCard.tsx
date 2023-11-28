import { CyclesQuery } from "@/lib/gql/graphql";
import { ArrayElement } from "@/utils/typeHelpers";
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const cycle = {
  title: "Cycle 1222",
  status: "Current",
  startDate: "Nov 20",
  endDate: "Dec 4",
};

type Props = {
  cycle: ArrayElement<CyclesQuery["cycles"]["nodes"]>;
};

export const CycleCard = ({ cycle }: Props) => {
  const { name, endsAt, startsAt, id, issues } = cycle;
  const startDate = format(parseISO(startsAt), "dd/MM/yyyy");
  const endDate = format(parseISO(endsAt), "dd/MM/yyyy");
  return (
    <TableRow>
      <TableCell align="left" className="font-medium whitespace-nowrap">
        {name}
      </TableCell>

      <TableCell>{issues.nodes.length}</TableCell>
      <TableCell>{`${startDate} - ${endDate}`}</TableCell>
      <TableCell align="right">
        <Link href={`/${id}`}>
          <Button>View</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};
