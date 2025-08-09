"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TripAdvisorElfsight() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
  }, []);

   useEffect(() => {
          AOS.init({
            duration: 1000,
            once: false,
          });
      
          AOS.refresh();
        }, []);

  return (
    <div className="relative min-h-[300px] w-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 animate-pulse">
          
        </div>
      )}
      <div
        data-aos="fade-up-left"
        dangerouslySetInnerHTML={{
          __html: `<div class="elfsight-app-2dfdb8f9-9353-4fe7-aa95-f6f67afee723" data-elfsight-app-lazy></div>`,
        }}
      />
    </div>
  );
}
