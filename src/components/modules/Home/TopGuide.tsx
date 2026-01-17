"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GuideCard from "../Guides/GuideCard";
import GuideCardSkeleton from "@/components/skeleton/GuideCardSkeleton";

interface Guide {
  _id: string;
  name: string;
  address?: string;
  picture?: string;
  pricePerHour: number;
  bio?: string;
  avgRating: number;
  totalReviews: number;
  languages?: string[];
}

const TopGuidesSection = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/users/get-all-guide?page=1&limit=6`,
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

  if (loading) {
    return (
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
            <GuideCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-lg font-medium">
        Failed to load guides
      </p>
    );
  }

  const displayedGuides = isMobile ? guides.slice(0, 3) : guides;

  return (
    <section>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {displayedGuides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
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
      </div>
    </section>
  );
};

export default TopGuidesSection;
