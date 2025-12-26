"use client";
// pages/all-guides.tsx
import GuideCard from "@/components/modules/Guides/GuideCard";
import Pagination from "@/components/ui/pagination";
import { useState, useEffect } from "react";

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

const AllGuides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [language, setLanguage] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const itemsPerPage = 6;

  const fetchGuides = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: "pricePerHour",
        sortOrder,
      });

      //   if (language) params.append("language", language);
      if (language.trim()) {
        params.append("language", language.trim());
      }

      const res = await fetch(
        `http://localhost:5000/api/users/get-all-guide?${params.toString()}`
      );
      const data = await res.json();

      setGuides(data.data);
      setTotalPages(data.meta?.totalPages);
      setTotalItems(data.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  // Refetch when page, language, or sort changes
  useEffect(() => {
    fetchGuides();
  }, [currentPage, searchTrigger, sortOrder]);

  return (
    <div className="mt-40 mb-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-center py-4 text-xl font-semibold">
        All Guides ({totalItems})
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        {/* Language Input */}
        <div>
          <input
            type="text"
            placeholder="Find Guide By language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-64"
          />

          {/* Search Button */}
          <button
            onClick={() => {
              setCurrentPage(1);
              setSearchTrigger((prev) => prev + 1);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Search
          </button>
        </div>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-3 py-2"
        >
          <option value="asc">Cost: Low to High</option>
          <option value="desc">Cost: High to Low</option>
        </select>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        {guides.map((guide) => (
          <GuideCard key={guide._id} guide={guide} />
        ))}
      </div>

      {guides.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No guide available with this language
        </p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllGuides;
