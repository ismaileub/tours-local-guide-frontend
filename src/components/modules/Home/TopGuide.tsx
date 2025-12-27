"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Guide {
  _id: string;
  name: string;
  address: string;
  picture: string;
  pricePerHour: number | string;
  bio: string;
  avgRating: number;
  totalReviews: number;
}

const TopGuidesSection = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/users/get-all-guide?page=1&limit=4`
        );
        const data = await res.json();
        setGuides(data.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-lg font-medium">Loading guides...</p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-lg font-medium">
        Failed to load guides
      </p>
    );

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Top Guides</h2>
        <p className="text-red-600 font-semibold mt-2">
          Explore our most trusted local guides
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {guides.map((guide) => (
          <Link
            key={guide._id}
            href={`/guides/${guide._id}`}
            className="flex bg-white rounded-lg shadow hover:shadow-xl overflow-hidden cursor-pointer h-48"
          >
            {/* Left Image */}
            <div className="relative w-1/3 h-full">
              <Image
                sizes="50"
                src={guide.picture || "/avatar.JPG"}
                alt={guide.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {guide.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{guide.address}</p>
                </div>
                <span className="text-blue-500 font-bold text-lg">
                  ${guide.pricePerHour}/Hour
                </span>
              </div>

              <p className="text-gray-700 italic font-sans text-sm mt-2 line-clamp-3">
                {guide.bio}
              </p>
              <hr className="border-t-2 border-gray-800" />

              <div className="flex justify-between items-center mt-4">
                {/* Reviews */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Reviews</p>
                  <p className="font-semibold">{guide.totalReviews}</p>
                </div>

                {/* Rating */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Rating</p>

                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(guide.avgRating)
                            ? "text-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/guides"
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          View All Guides
        </Link>
      </div>
    </section>
  );
};

export default TopGuidesSection;
