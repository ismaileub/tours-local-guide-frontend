"use client";
import React from "react";
import WhyUs from "@/components/modules/Home/WhyUs";

const AboutPage = () => {
  return (
    <div className="mt-24 mb-10 px-6 md:px-10 max-w-8xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-20 px-4 md:px-0">
        <div className="py-20 rounded-3xl bg-linear-to-br from-orange-50 via-white to-orange-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            About <span className="text-orange-500">GuideHub</span>
          </h1>
          <p className="text-gray-600 mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We connect travelers with unforgettable experiences and trusted
            local guides. Explore hidden gems and travel confidently with ease.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-24">
        <div className="relative rounded-3xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-6 md:px-20 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-gray-400 mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We connect travelers with unforgettable experiences and trusted
            local guides. Explore hidden gems and travel confidently with ease.
          </p>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="mb-24">
        <WhyUs />
      </section>

      {/* Story Section */}
      <section className="mb-16 px-4">
        <div className="rounded-3xl bg-linear-to-br from-orange-50 via-white to-orange-100 py-16 px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Story
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            Founded with the vision to simplify travel planning, GuideHub brings
            together passionate travelers and knowledgeable local experts. Every
            journey deserves to be unique, meaningful and memorable.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
