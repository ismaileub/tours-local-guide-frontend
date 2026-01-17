import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const Banner = () => {
  return (
    <div>
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-600 via-cyan-500 to-green-400">
        {/* Background shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute w-150 h-150 bg-white/10 rounded-full blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow-xl">
            Explore the World With
            <span className="block text-yellow-300">GuideHub</span>
          </h1>
          <p className="mt-4 text-white/90 text-xl max-w-2xl mx-auto">
            Find trusted tour guides, discover hidden places, and start your
            next adventure with confidence.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-2xl shadow-xl hover:bg-purple-100 transition">
              Get Started
            </button>
            <Link
              href={"/about"}
              className="px-6 py-3 bg-purple-800/60 border border-white/40 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-purple-800/80 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Banner;
