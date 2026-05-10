"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BecomeGuide = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center bg-cover bg-center py-16"
      style={{
        backgroundImage: "url(/become-guide.png)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Become a{" "}
          <span className="italic font-light text-orange-400">guide</span>
        </h2>

        <p className="md:text-xl leading-relaxed mb-8 text-gray-200 mt-4 mx-auto">
          We’re trail breakers, change-makers, storytellers and side-street
          takers. Join a network of creative local guides and give travelers
          truly unforgettable experiences.
        </p>

        <button
          onClick={() => {
            if (status === "authenticated") {
              toast.info("You are already logged in");
              return;
            }
            router.push("/register");
          }}
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white cursor-pointer font-semibold px-8 py-2 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        >
          Become A Guide
        </button>
      </div>
    </section>
  );
};

export default BecomeGuide;
