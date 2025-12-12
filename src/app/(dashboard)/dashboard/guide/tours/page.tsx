/* eslint-disable @typescript-eslint/no-explicit-any */
import TourCard from "@/components/modules/Tour/TourCard";
import { getUserSession } from "@/helpers/getUserSession";
import React from "react";

const ToursPage = async () => {
  const session = await getUserSession();
  const token = session?.user?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/tours/my-tours`,
    {
      headers: {
        authorization: token || "",
      },
      next: { tags: ["tours"] },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const tours = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Tours</h1>
      {tours.length === 0 ? (
        <p>No tours found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour: any) => (
            <TourCard
              key={tour._id}
              id={tour._id}
              title={tour.title}
              location={tour.location}
              price={tour.price}
              duration={tour.duration}
              coverPhoto={tour.coverPhoto}
              tourType={tour.tourType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursPage;
