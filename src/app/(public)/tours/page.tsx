"use client";

import AllTours from "@/components/modules/Tour/AllTours";

const AllToursPage = () => {
  return (
    <div className="mb-10 px-10 max-w-8xl mx-auto">
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Find Your <span className="text-orange-500">Perfect Tour</span>
        </h1>

        <p className="text-gray-600 text-nowrap mt-4 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Explore exciting tours, book instantly, and travel confidently with a
          trusted local guide at no extra cost.
        </p>
      </div>

      <AllTours />
    </div>
  );
};

export default AllToursPage;
