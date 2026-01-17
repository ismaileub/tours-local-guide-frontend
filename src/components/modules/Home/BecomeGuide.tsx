"use client";

import React from "react";
import Link from "next/link";

const BecomeGuide = () => {
  return (
    <section
      className="relative  w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(/become-guide.png)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Become a <span className="italic font-light">guide</span>
        </h2>

        <p className="md:text-xl leading-relaxed mb-8 text-gray-300 mt-4  mx-auto">
          We’re trail breakers, change-makers, storytellers and side-street
          takers. Join a network of creative local guides and give travelers
          truly unforgettable experiences.
        </p>

        <Link
          href="/apply-guide"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-full transition"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
};

export default BecomeGuide;
