"use client";

import { useState } from "react";
import Image from "next/image";

// Komponen untuk menangani gambar dengan skeleton loader dan fallback
export function ImageWithLoader({
  src,
  alt,
  classNameProp,
  fallbackSrc,
  priority = false,
  width = 500,
  height = 500,
}: {
  src: string;
  alt: string;
  classNameProp?: string;
  fallbackSrc: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const [isImageError, setIsImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton loader (tampilan sementara) */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
      )}

      <Image
        src={isImageError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
       
        priority={priority} // Jika priority=true, gambar akan dimuat segera
        className={`transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"} ${classNameProp}`}
        onLoad={() => setIsImageLoaded(true)} // Set state saat gambar selesai dimuat
        onError={() => setIsImageError(true)} // Ganti gambar saat error
      />
    </div>
  );
}
