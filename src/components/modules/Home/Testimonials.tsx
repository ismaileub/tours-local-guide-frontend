/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { CalendarDays, Compass, MapPin } from "lucide-react";
//
//
//
//

const reviews = [
  {
    name: "Olivia Smith",
    role: "Traveler",
    location: "Santorini, Greece",
    trip: "Sea Beach",
    date: "May 2026",
    image: "https://i.ibb.co.com/ggjHwmF/profile.png",
    review: "The beaches were stunning and the itinerary was perfect.",
  },
  {
    name: "Isabella Garcia",
    role: "Tourist",
    location: "Bangkok, Thailand",
    trip: "Guide Hire",
    date: "Nov 2026",
    image: "https://i.ibb.co.com/qFnNRh1T/profile5.png",
    review: "Our guide was punctual, friendly, and very informative.",
  },
  {
    name: "Liam Johnson",
    role: "Tourist",
    location: "New York, USA",
    trip: "City Life",
    date: "Jun 2026",
    image: "https://i.ibb.co.com/6cdmh23F/profile4.png",
    review: "City tour was well-paced with knowledgeable guides.",
  },
  {
    name: "Sophia Martinez",
    role: "Explorer",
    location: "Kyoto, Japan",
    trip: "Historical",
    date: "Jul 2026",
    image: "https://i.ibb.co.com/6RbvfyPY/profile3.png",
    review: "Loved the historical temples and cultural insights provided.",
  },
  {
    name: "Noah Davis",
    role: "Backpacker",
    location: "Swiss Alps, Switzerland",
    trip: "Hill Tracks",
    date: "Aug 2026",
    image: "https://i.ibb.co.com/4Zhfrp17/profile2.png",
    review: "The mountain tracks were breathtaking. A must-do adventure.",
  },
  {
    name: "Charlotte Rodriguez",
    role: "Backpacker",
    location: "Istanbul, Turkey",
    trip: "Guide Hire",
    date: "Jan 2027",
    image: "https://i.ibb.co.com/KxSsDdQ3/profile1.png",
    review: "Guide was very knowledgeable and tailored the tour perfectly.",
  },
  {
    name: "Ava Wilson",
    role: "Adventure Seeker",
    location: "Rio de Janeiro, Brazil",
    trip: "Night Life",
    date: "Sep 2026",
    image: "https://i.ibb.co.com/ggjHwmF/profile.png",
    review: "Vibrant nightlife and great organization. Loved every moment!",
  },

  {
    name: "Ethan Thompson",
    role: "Traveler",
    location: "Mekong Delta, Vietnam",
    trip: "River Side",
    date: "Oct 2026",
    image: "https://i.ibb.co.com/Vq2Nxj0/boy1.png",
    review: "Peaceful river tours and very knowledgeable guides.",
  },

  {
    name: "Mason Martinez",
    role: "Explorer",
    location: "Cape Town, South Africa",
    trip: "Guide Hire",
    date: "Dec 2026",
    image: "https://i.ibb.co.com/KhvYGdx/boy2.jpg",
    review: "Excellent guide who made our safari experience unforgettable.",
  },

  {
    name: "James Hernandez",
    role: "Adventure Seeker",
    location: "Queenstown, New Zealand",
    trip: "Guide Hire",
    date: "Feb 2027",
    image: "https://i.ibb.co.com/XbhGn0c/girl1.jpg",
    review:
      "Professional guide with excellent safety tips for adventure sports.",
  },
];

export default function Testimonials() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-200 py-10">
      {/* HEADER */}
      <div className="text-center  px-4">
        <h2 className="text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mt-3">
          Real experiences from travelers around the world
        </p>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-5">
        <div>
          <h3 className="text-4xl font-bold text-blue-600">
            <CountUp end={12} duration={2} />
            k+
          </h3>
          <p className="text-gray-600 mt-1">Happy Travelers</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">
            <CountUp end={450} duration={2} />+
          </h3>
          <p className="text-gray-600 mt-1">Verified Guides</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">
            <CountUp end={120} duration={2} />+
          </h3>
          <p className="text-gray-600 mt-1">Destinations</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">4.9★</h3>
          <p className="text-gray-600 mt-1">Average Rating</p>
        </div>
      </div>

      {/* SLIDER */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        grabCursor
        autoplay={{
          delay: 2600,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 15,
          depth: 180,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="pt-14!"
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        {reviews.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <SwiperSlide
              key={index}
              className="
                w-100!
                h-72!
                bg-white
                rounded-3xl
                p-6
                shadow-xl
                transition-all
                duration-500
              "
            >
              {/* USER INFO */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full w-14 h-14 border-2 border-blue-500"
                />

                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin size={14} className="text-blue-500" />
                  {item.location}
                </span>

                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Compass size={14} className="text-green-500" />
                  {item.trip}
                </span>

                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <CalendarDays size={14} className="text-purple-500" />
                  {item.date}
                </span>
              </div>

              <div className="mt-5 flex-col justify-center items-center ">
                {/* STARS */}
                <div
                  className={` text-yellow-500 mb-3 transition-all duration-500 ${
                    isActive ? "scale-110 animate-pulse" : "opacity-60"
                  }`}
                >
                  {"★★★★★".split("").map((star, i) => (
                    <span
                      key={i}
                      className={isActive ? "animate-star" : ""}
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* REVIEW */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  “{item.review}”
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
