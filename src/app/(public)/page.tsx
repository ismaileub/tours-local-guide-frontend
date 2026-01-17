"use client";
import Adventure from "@/components/modules/Home/Adventure";
import Banner from "@/components/modules/Home/Banner";
import BecomeGuide from "@/components/modules/Home/BecomeGuide";
import TopGuide from "@/components/modules/Home/TopGuide";
import TopToursSection from "@/components/modules/Home/TopToursSection";
import WhyUs from "@/components/modules/Home/WhyUs";
import React from "react";

const HomePage = () => {
  return (
    <div className="text-center ">
      <Banner />

      <section className="bg-gray-100 px-10 pb-4 ">
        <div className="  mx-auto py-5 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Top Guides</h2>
          <p className="text-red-600 font-semibold mt-2">
            Find experienced local guides and start your journey today
          </p>
        </div>
        <TopGuide />
      </section>

      <WhyUs />

      <BecomeGuide />

      <section className="bg-gray-100 px-10 pb-4">
        <div className="  mx-auto py-5 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Book a Tour & Get a Guide Free!
          </h2>
          <p className="text-red-600 font-semibold mt-2">
            Discover exciting tours led by our trusted local guides
          </p>
        </div>
        <TopToursSection />
      </section>

      <Adventure />
    </div>
  );
};

export default HomePage;
