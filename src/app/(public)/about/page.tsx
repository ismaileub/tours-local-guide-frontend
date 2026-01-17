"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Compass } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import WhyUs from "@/components/modules/Home/WhyUs";

const AboutPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  return (
    <div className="mb-10 px-6 max-w-8xl mx-auto">
      {/* Hero Section */}
      <section className="text-center  px-4 md:px-0">
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
      <section className="">
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

      {/* How It Works Section */}
      <section className="">
        <div className="rounded-3xl bg-white border shadow-sm py-16 px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-14">
            How <span className="text-orange-500">GuideHub</span> Works
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Tourist Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <User className="text-orange-500" size={28} />
                <h3 className="text-2xl font-bold text-gray-900">
                  For Tourists
                </h3>
              </div>

              <ul className="space-y-3 text-gray-700 leading-relaxed flex-1">
                <li>• Hire a professional local guide only</li>
                <li>
                  • Book complete tour packages created by guides (guide
                  included free)
                </li>
                <li>• Explore confidently with verified local experts</li>
                <li>• Choose flexibility — guide-only or full tour</li>
              </ul>

              <Link
                href="/guides"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
              >
                Hire a Guide
              </Link>
            </motion.div>

            {/* Guide Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-orange-50 p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <Compass className="text-orange-500" size={28} />
                <h3 className="text-2xl font-bold text-gray-900">For Guides</h3>
              </div>

              <ul className="space-y-3 text-gray-700 leading-relaxed flex-1">
                <li>• Register and become available for hiring</li>
                <li>• Get hired directly by tourists</li>
                <li>
                  • Create personal tour packages where your guide service is
                  included
                </li>
                <li>• Earn by sharing your local expertise</li>
              </ul>

              <button
                onClick={() => {
                  if (status === "authenticated") {
                    toast.info("You are already logged in");
                    return;
                  }
                  router.push("/register");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-orange-500 px-6 py-3 text-orange-600 font-medium hover:bg-orange-500 hover:text-white transition"
              >
                Become a Guide
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="">
        <WhyUs />
      </section>

      {/* Story Section */}
      <section className=" px-4">
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
