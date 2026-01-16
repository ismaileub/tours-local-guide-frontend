"use client";

import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum TourType {
  SEA_BEACH = "Sea Beach",
  CITY_LIFE = "City Life",
  VILLAGE_LIFE = "Village Life",
  HILL_TRACKS = "Hill Tracks",
  ADVENTURE = "Adventure",
  HISTORICAL = "Historical Place",
  RIVER_SIDE = "River Side",
  NIGHTLIFE = "Nightlife",
}

interface TourFilterProps {
  tourType: TourType | "all";
  setTourType: (type: TourType | "all") => void;
  onFilter: () => void;
}

const TourFilter: FC<TourFilterProps> = ({
  tourType,
  setTourType,
  onFilter,
}) => {
  return (
    <div className="relative w-full md:w-72">
      <Select
        value={tourType}
        onValueChange={(value) => {
          setTourType(value as TourType | "all");
          onFilter();
        }}
      >
        <SelectTrigger className="w-full rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none">
          <SelectValue placeholder="All Tour Types" />
        </SelectTrigger>
        <SelectContent className="rounded-md border border-gray-200 bg-white shadow-lg">
          <SelectItem value="all" className="px-4 py-2 hover:bg-gray-100">
            All Tour Types
          </SelectItem>
          {Object.values(TourType).map((type) => (
            <SelectItem
              key={type}
              value={type}
              className="px-4 py-2 hover:bg-gray-100"
            >
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TourFilter;
