"use client";
import Adventure from "@/components/modules/Home/Adventure";
import Banner from "@/components/modules/Home/Banner";
import TopGuide from "@/components/modules/Home/TopGuide";
import TopToursSection from "@/components/modules/Home/TopToursSection";
import WhyUs from "@/components/modules/Home/WhyUs";
import React from "react";

const HomePage = () => {
  return (
    <div className="text-center ">
      <Banner />
      <TopGuide />
      <WhyUs />
      <TopToursSection />
      <Adventure />
    </div>
  );
};

export default HomePage;
