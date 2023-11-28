"use client";

import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../components/ui/command";
import { usePathname, useRouter } from "next/navigation";

type SelectableItem = {
  value: string;
  label: string;
};

type Props = {
  selectableItems: SelectableItem[];
  selectedItem: SelectableItem["value"];
};

export function SelectCycleCombobox({ selectableItems }: Props) {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pathName.substring(1));

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? selectableItems.find((item) => item.value === value)?.label
            : "Choose cycle"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search cycles..." />
          <CommandEmpty>No cycle found.</CommandEmpty>
          <CommandGroup>
            {selectableItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  router.push(`/${item.value}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
