/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi"; // Heroicons location

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

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  //console.log(tour);
  return (
    <Link
      href={`/tours/${tour?._id}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image with overlay */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={tour?.coverPhoto || "/avatar.jpg"}
          alt={tour?.title || "Tour Image"}
          fill
          sizes="22"
          loading="eager"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/tour-placeholder.jpg";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {tour?.tourType}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
            ${tour?.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
          {tour?.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <HiLocationMarker className="w-4 h-4 text-red-500" />
          {tour?.location}
        </p>

        <div className="flex justify-between items-center mt-3 text-gray-600 text-sm font-medium">
          <span className="flex items-center gap-1">⏱ {tour?.duration}</span>
          <span className="text-gray-500 text-xs">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
