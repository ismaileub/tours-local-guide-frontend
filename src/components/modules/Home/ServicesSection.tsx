"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Mountain, Compass } from "lucide-react";
import Link from "next/link";

const ServicesSectionPremium = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Services & Categories
        </h2>
        <p className="text-red-600 font-semibold mt-2">
          Explore the wide range of tours and guide services we offer
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Service 1 */}
        <div className="rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="bg-linear-to-br from-red-500 to-pink-500 p-6 text-center">
            <MapPin className="mx-auto w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white">Beach Tours</h3>
            <p className="text-white mt-2">
              Relax and explore the most beautiful beaches around the world.
            </p>
            <Link href={"/tours"}>
              <Button
                variant="secondary"
                className="mt-4 w-full cursor-pointer"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>

        {/* Service 2 */}
        <div className="rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="bg-linear-to-br from-blue-500 to-indigo-500 p-6 text-center">
            <Building className="mx-auto w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white">City Tours</h3>
            <p className="text-white mt-2">
              Discover the culture, nightlife and attractions of top cities.
            </p>
            <Link href={"/tours"}>
              <Button
                variant="secondary"
                className="mt-4 w-full cursor-pointer"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>

        {/* Service 3 */}
        <div className="rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="bg-linear-to-br from-green-500 to-teal-500 p-6 text-center">
            <Mountain className="mx-auto w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Adventure Trips
            </h3>
            <p className="text-white mt-2">
              Hiking, trekking, and thrilling adventures for every explorer.
            </p>
            <Link href={"/tours"}>
              <Button
                variant="secondary"
                className="mt-4 w-full cursor-pointer"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>

        {/* Service 4 */}
        <div className="rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="bg-linear-to-br from-purple-500 to-pink-600 p-6 text-center">
            <Compass className="mx-auto w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white">Guide Hiring</h3>
            <p className="text-white mt-2">
              Hire trusted local guides to make your trips safe and enjoyable.
            </p>
            <Link href={"/guides"}>
              <Button
                variant="secondary"
                className="mt-4 w-full cursor-pointer"
              >
                Hire Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionPremium;
