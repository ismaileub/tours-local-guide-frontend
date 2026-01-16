"use client";

import AllGuide from "@/components/modules/Guides/AllGuide";

const AllGuidesPage = () => {
  return (
    <div className="mt-24 mb-10 px-10 max-w-8xl mx-auto ">
      {/* sdfsd */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Explore <span className="text-orange-500">Local Tour Guides</span>
        </h1>

        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Discover experienced and verified local guides to make your journey
          truly memorable.
        </p>
      </div>

      <AllGuide />
    </div>
  );
};

export default AllGuidesPage;
