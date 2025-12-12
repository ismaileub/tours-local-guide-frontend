"use client";

import Image from "next/image";
import React from "react";

interface Tour {
  title: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  coverPhoto: string;
  spots: string[];
  tourType: string;
}

interface TourDetailsCardProps {
  tour: Tour;
}

const TourDetailsCard: React.FC<TourDetailsCardProps> = ({ tour }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-80 sm:h-96">
        <Image
          src={tour.coverPhoto}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
        <p className="text-gray-600 mb-2">{tour.location}</p>
        <p className="text-sm text-gray-500 mb-2">Type: {tour.tourType}</p>
        <p className="text-lg font-semibold mb-2">Price: BDT {tour.price}</p>
        <p className="text-gray-600 mb-2">Duration: {tour.duration}</p>
        <p className="mb-4">{tour.description}</p>

        <div>
          <h2 className="text-xl font-semibold mb-2">Tour Spots:</h2>
          <ul className="list-disc list-inside space-y-1">
            {tour.spots.map((spot, index) => (
              <li key={index}>{spot}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsCard;
