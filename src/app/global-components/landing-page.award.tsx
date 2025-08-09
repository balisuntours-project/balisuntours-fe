"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

export function LandingPageAward() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    AOS.refresh();
  }, []);
  const awards = [
    {
      src: "/awards/ta.png",
      year: "2024",
      tag: "ta",
    },
    {
      src: "/awards/ta2025.png",
      year: "2025",
      tag: "ta",
    },
    {
      src: "/awards/klook.png",
      year: "2024",
      tag: "klook",
    },
    {
      src: "/awards/klook.png",
      year: "2025",
      tag: "klook",
    },
  ];
  return (
    <>
      <div className="-mx-[0.75rem] md:-mx-[4rem] w-screen bg-[#007D000A]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="font-bold text-xl md:text-3xl text-center">
            {" "}
            Proudly awarded by
          </h1>
          <div
            data-aos="fade-up-right"
            className="flex flex-wrap items-center justify-center gap-6 py-6"
          >
            {awards.map((item, idx) => (
              <div key={idx} className="flex bg-white rounded-md p-3">
                <div className="relative w-[80px] md:w-[150px] h-[60px] md:h-[100px] grayscale hover:grayscale-0 transition duration-300">
                  <Image
                    src={item.src}
                    alt={`Award ${idx}`}
                    fill
                    className="object-contain"
                  />
                </div>
                {item.tag == "klook" && (
                  <div className="flex">
                    <div className="border-r-2 border-gray-100 mx-5"></div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm md:text-base font-bold text-[#FF5B00]">
                        {item.year}
                      </span>
                      <span className="text-xs md:ext-sm">
                        Best of Indonesia
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
