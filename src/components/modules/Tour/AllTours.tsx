/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import TourCardSkeleton from "@/components/skeleton/TourCardSkeleton";
import SortDropdown from "@/components/shared/SortDropdown";
import TourFilter, { TourType } from "@/components/shared/TourFilter";
import TourCard from "./TourCard";

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

const AllTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tourType, setTourType] = useState<TourType | "all">("all");

  const itemsPerPage = 9;

  const fetchTours = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy: "price",
        sortOrder,
      });

      if (tourType && tourType !== "all") {
        params.append("tourType", tourType);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/tours?${params.toString()}`,
      );

      const data = await res.json();

      setTours(data.data);
      setTotalPages(data.meta.totalPages);
      setTotalItems(data.meta.total);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [currentPage, searchTrigger, sortOrder, tourType]);
  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Tour Type Filter */}

        <TourFilter
          tourType={tourType}
          setTourType={setTourType}
          onFilter={() => {
            setCurrentPage(1);
            setSearchTrigger((prev) => prev + 1);
          }}
        />
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>

      {/* skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <TourCardSkeleton key={index} />
            ))
          : tours?.map((tour) => <TourCard key={tour._id} tour={tour} />)}
      </div>

      {/* Empty State */}
      {!loading && tours.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No tours available with this type
        </p>
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default AllTours;
