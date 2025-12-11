import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wand2, Wallet } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="py-24 max-w-8xl mx-auto bg-gradient-to-b from-white to-gray-100 w-full text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Why Choose GuideHub?
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        We connect you with trusted local tour guides, personalized travel
        plans, and unforgettable experiences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-10">
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
            <Wand2 size={50} className="text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Custom Trips
          </h3>
          <p className="text-gray-600">
            Tailored tours based on your interests and schedule.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100"
        >
          <div className="flex justify-center mb-5">
            <Wallet size={50} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Affordable Pricing
          </h3>
          <p className="text-gray-600">
            Best rates without compromising quality and comfort.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
