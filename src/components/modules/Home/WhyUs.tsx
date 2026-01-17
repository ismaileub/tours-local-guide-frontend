import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wand2,
  Wallet,
  Headphones,
  Map,
  Star,
  Users,
} from "lucide-react";

const WhyUs = () => {
  return (
    <section className="py-14 mx-auto w-full text-center bg-linear-to-b">
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Why Choose GuideHub?
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        We connect you with trusted local tour guides, personalized travel
        plans, and unforgettable experiences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-4 md:px-10">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <ShieldCheck size={50} className="text-indigo-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Certified Guides
          </h3>
          <p className="text-gray-600">
            All guides are verified for safety and experience.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Wallet size={50} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Easy Booking
          </h3>
          <p className="text-gray-600">
            Book tours instantly and communicate directly with your guide.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Wand2 size={50} className="text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Curated Tours
          </h3>
          <p className="text-gray-600">
            Explore carefully designed tours for every traveler’s interest.
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Headphones size={50} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            24/7 Support
          </h3>
          <p className="text-gray-600">
            Our team is available anytime to assist you with your travel plans.
          </p>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Map size={50} className="text-purple-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Personalized Experiences
          </h3>
          <p className="text-gray-600">
            Tours and guides tailored to your preferences and schedule.
          </p>
        </motion.div>

        {/* Card 6 */}
        {/* Card - Empowering Local Guides */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Users size={50} className="text-emerald-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Empowering Local Guides
          </h3>
          <p className="text-gray-600">
            We support and empower local guides by providing a trusted platform
            to share their expertise and create meaningful travel experiences
            worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
