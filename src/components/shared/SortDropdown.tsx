"use client";

import React, { FC } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface SortDropdownProps {
  sortOrder: "" | "asc" | "desc";
  setSortOrder: (value: "" | "asc" | "desc") => void;
}

const SortDropdown: FC<SortDropdownProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <Menubar className="rounded-full border border-gray-300">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          {sortOrder === ""
            ? "Sort by default"
            : sortOrder === "asc"
            ? "Low to High"
            : "High to Low"}
        </MenubarTrigger>

        <MenubarContent className="w-44 rounded-md border border-gray-200 bg-white shadow-lg">
          <MenubarItem
            onClick={() => setSortOrder("")}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            Sort by default
          </MenubarItem>
          <MenubarItem
            onClick={() => setSortOrder("asc")}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            Low to High
          </MenubarItem>
          <MenubarItem
            onClick={() => setSortOrder("desc")}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            High to Low
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SortDropdown;
