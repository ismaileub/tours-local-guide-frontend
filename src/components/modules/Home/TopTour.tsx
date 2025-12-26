/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";
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

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/tours?limit=6&page=1"
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

  if (loading)
    return (
      <p className="text-center py-10 text-lg font-medium">Loading tours...</p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-lg font-medium">
        Failed to load tours
      </p>
    );

  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Book a Tour & Get a Guide Free!
        </h2>
        <p className="text-red-600 font-semibold mt-2">
          Explore our most exciting tours
        </p>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      {/* View All Tours Button */}
      <div className="text-center mt-10">
        <Link
          href="/tours"
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Explore All Tours
        </Link>
      </div>
    </section>
  );
};

export default TopToursSection;
