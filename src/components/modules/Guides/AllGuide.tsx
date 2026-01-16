/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import GuideCard from "@/components/modules/Guides/GuideCard";
import GuideCardSkeleton from "@/components/skeleton/GuideCardSkeleton";
import Pagination from "@/components/ui/pagination";
import SortDropdown from "@/components/shared/SortDropdown";

interface Guide {
  _id: string;
  name: string;
  address?: string;
  picture?: string;
  pricePerHour: number;
  bio?: string;
  avgRating: number;
  totalReviews: number;
}

const AllGuide = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [language, setLanguage] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");

  const itemsPerPage = 6;

  const fetchGuides = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (sortOrder) {
        params.append("sortBy", "pricePerHour");
        params.append("sortOrder", sortOrder);
      }

      if (language.trim()) {
        params.append("language", language.trim());
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_API
        }/users/get-all-guide?${params.toString()}`
      );

      const data = await res.json();

      setGuides(data.data);
      setTotalPages(data.meta?.totalPages || 1);
      setTotalItems(data.meta?.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [currentPage, searchTrigger, sortOrder]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex w-full md:w-auto">
          {/* input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-full border border-gray-300 pr-28 pl-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            />

            <button
              onClick={() => {
                setCurrentPage(1);
                setSearchTrigger((prev) => prev + 1);
              }}
              className="absolute top-1/2 right-1 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>

      {/* loading */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <GuideCardSkeleton key={i} />
            ))
          : guides.map((guide) => <GuideCard key={guide._id} guide={guide} />)}
      </div>

      {!loading && guides.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <p className="text-lg font-medium text-gray-600">No guides found</p>
        </div>
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

export default AllGuide;
