/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CreateTourDialog from "@/components/modules/Tour/CreateTourDialog";
import TourCard from "@/components/modules/Tour/TourCard";
import { getUserSession } from "@/helpers/getUserSession";

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

const ToursPage = async () => {
  // 1️⃣ Get user session and token
  const session = await getUserSession();
  const token = session?.user?.accessToken || "";

  // 2️⃣ Fetch tours from API
  let tours: Tour[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tours/my-tours`,
      {
        headers: { authorization: token },
        cache: "no-store",
      },
    );

    const data = await res.json();
    tours = Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetching tours:", error);
  }

  // 3️⃣ Render page
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tours</h1>
        <CreateTourDialog token={token} />
      </div>

      {/* Tours Grid */}
      {tours.length === 0 ? (
        <p>No tours found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursPage;
