import { useRef, useEffect, useState } from "react";

const LazyLoadVideo = ({ src, poster, loop }: { src: string; poster: string, loop: boolean }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // 50% elemen harus terlihat sebelum dimuat
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      muted
      loop={loop}
      poster={poster}
      preload="none"
      className="w-full h-auto"
    >
      {isVisible && <source src={src} type="video/mp4" />}
    </video>
  );
};

export default LazyLoadVideo;
