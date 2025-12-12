"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  coverPhoto: string;
  tourType: string;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  location,
  price,
  duration,
  coverPhoto,
  tourType,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition flex flex-col">
      <div className="relative w-full h-40">
        <Image
          src={coverPhoto}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-700">{location}</p>
          <p className="text-sm text-blue-700 font-semibold">
            Type: {tourType}
          </p>
          <p className="mt-2 font-medium">Price: BDT {price}</p>
          <p className="text-sm text-gray-600">Duration: {duration}</p>
        </div>
        <Link
          href={`/dashboard/guide/tours/${id}`}
          className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
