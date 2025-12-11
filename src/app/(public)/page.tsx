"use client";
import Adventure from "@/components/modules/Home/Adventure";
import Banner from "@/components/modules/Home/Banner";
import WhyUs from "@/components/modules/Home/WhyUs";
import React from "react";

const HomePage = () => {
  return (
    <div className="text-center ">
      <Banner />
      <WhyUs />
      <Adventure />
    </div>
  );
};

export default HomePage;
