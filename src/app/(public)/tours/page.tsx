"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import TourCard from "@/components/modules/Home/TourCard";

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

interface Tour {
  _id: string;
  title: string;
  tourType: TourType;
  location: string;
  price: number;
  coverPhoto?: string;
  duration: string;
  avgRating: number;
  totalReviews: number;
}

const AllToursPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [tourType, setTourType] = useState<TourType | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const itemsPerPage = 9;

  const fetchTours = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: "price",
        sortOrder,
      });

      if (tourType) params.append("tourType", tourType);

      const res = await fetch(
        `http://localhost:5000/api/tours?${params.toString()}`
      );
      const data = await res.json();
      console.log(data);

      setTours(data.data);
      setTotalPages(data.meta.totalPages);
      setTotalItems(data.meta.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTours();
  }, [currentPage, searchTrigger, sortOrder, tourType]);

  return (
    <div className="mt-20 mb-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-center py-4 text-2xl font-semibold">
        All Tours ({totalItems})
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Tour Type Filter */}
        <div className="flex items-center gap-2">
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value as TourType)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Tour Types</option>
            {Object.values(TourType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setCurrentPage(1);
              setSearchTrigger((prev) => prev + 1);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Filter
          </button>
        </div>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-3 py-2"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours?.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      {tours?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No tours available with this type
        </p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllToursPage;
