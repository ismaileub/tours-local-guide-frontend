"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    name: "Santorini, Greece",
    description: "Relax on the pristine beaches and enjoy stunning sunsets.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kyoto, Japan",
    description: "Explore historic temples, gardens, and cultural experiences.",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Swiss Alps, Switzerland",
    description: "Adventure awaits with scenic mountain hikes and skiing.",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marrakech, Morocco",
    description: "Immerse yourself in vibrant markets and rich culture.",
    image:
      "https://images.unsplash.com/photo-1549887534-5a0b376be76b?auto=format&fit=crop&w=800&q=80",
  },
];

const PopularDestinations = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Popular Destinations
        </h2>
        <p className="text-red-600 font-semibold mt-2">
          Explore the most loved destinations by travelers
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="text-xl font-semibold text-gray-800">
                {dest.name}
              </h3>
              <p className="text-gray-600 mt-2">{dest.description}</p>
              <Button className="mt-4 w-full">Book Now</Button>
            </div>
          </div>
        ))}
      </div>
      <section className="bg-red-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Traveler Spotlight
          </h2>
          <p className="text-red-600 font-semibold mb-8">
            Hear what our adventurers have to say
          </p>
          <div className="bg-white rounded-xl shadow-lg p-10 text-left">
            <p className="text-gray-700 italic text-lg mb-4">
              Joining a guided tour through the mountains was the best decision
              of my trip. The experience was seamless and unforgettable. I met
              amazing people and saw places I never would have found on my own!
            </p>
            <p className="font-semibold text-gray-800">
              — Alex Morgan, Explorer
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PopularDestinations;
