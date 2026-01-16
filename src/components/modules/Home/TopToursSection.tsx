/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";
import TourCardSkeleton from "@/components/skeleton/TourCardSkeleton"; // make sure path is correct
import Link from "next/link";

interface Tour {
  _id: string;
  title: string;
  location: string;
  tourType: string;
  price: number;
  duration: string;
  coverPhoto?: string;
  [key: string]: any;
}

const TopToursSection = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const itemsToShow = 3;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/tours?limit=${itemsToShow}&page=1`
        );
        const data = await res.json();
        setTours(data.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (error)
    return (
      <p className="text-center py-10 text-lg font-medium">
        Failed to load tours
      </p>
    );

  return (
    <section className="">
      {/* Section Header */}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
        {loading
          ? Array.from({ length: itemsToShow }).map((_, index) => (
              <TourCardSkeleton key={index} />
            ))
          : tours?.map((tour) => <TourCard key={tour._id} tour={tour} />)}
      </div>

      {/* View All Tours Button */}
      {!loading && tours.length > 0 && (
        <div className="text-center mt-10">
          <Link
            href="/tours"
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Explore All Tours
          </Link>
        </div>
      )}
    </section>
  );
};

export default TopToursSection;
