import React from "react";
import { SelectCycleCombobox } from "./SelectCycleCombobox";
import { graphQLClient } from "@/lib/graphql";
import { getCycles } from "@/app/query";

export const CycleSelector = async ({ cycleID }: { cycleID: string }) => {
  const cycles = await graphQLClient.request(getCycles);
  const cycleOptions = cycles.cycles.nodes.map((node) => ({
    value: node.id,
    label: node.name || node.number.toString(),
  }));

  return (
    <div className="absolute top-2 left-2 z-10">
      <SelectCycleCombobox
        selectableItems={cycleOptions}
        selectedItem={cycleID}
      />
    </div>
  );
};
