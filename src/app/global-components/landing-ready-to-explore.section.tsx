"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function LandingPageReadyToExplore() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    AOS.refresh();
  }, []);
  return (
   <section data-aos="fade-up-right" className="bg-[#6bbf3f] rounded-lg px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Teks */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-xl md:text-3xl font-extrabold">
            Ready to Explore Bali?
          </h2>
          <p className="text-white text-lg md:text-xl mt-2">
            Your dream vacation is just one click away.
          </p>
        </div>

        {/* Tombol */}
        <div className="flex flex-col md:ms-auto lg:flex-row items-center gap-4">
          <Link
            href="/activities"
            className="bg-white text-green-600 font-medium px-6 py-2 rounded-md shadow hover:bg-gray-100 transition"
          >
            Browse Our Tours
          </Link>
          <Link
            href="https://wa.me/6281936109809"
            target="_blank"
            className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-green-600 transition"
          >
            Contact on WhatsApp
          </Link>
        </div>
      </section>
  );
}
