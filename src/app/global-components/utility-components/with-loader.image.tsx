/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Pastikan path `cn` sesuai dengan project Anda

// Komponen untuk menangani gambar dengan skeleton loader dan fallback
export function ImageWithLoader({
  src,
  alt,
  classNameProp,
  skeletonClassName, // Tambahkan prop untuk custom skeleton class
  fallbackSrc,
  priority = false,
  width = 500,
  height = 500,
  layout,
  objectFit,
  quality,
  fillAllView = true,
}: {
  src: string;
  alt: string;
  classNameProp?: string;
  skeletonClassName?: string; // Opsional: custom class untuk skeleton
  fallbackSrc: string;
  priority?: boolean;
  width?: number;
  height?: number;
  layout?: string;
  objectFit?: string;
  quality?: number;
  fillAllView?: boolean;
}) {
  const [isImageError, setIsImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={`lg:relative ${fillAllView ? "w-full h-full" : ""}`}>
      {/* Skeleton loader (tampilan sementara) */}
      {!isImageLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-300 animate-pulse",
            skeletonClassName // Custom class untuk skeleton jika ada
          )}
        ></div>
      )}

      <Image
        src={isImageError ? fallbackSrc : src}
        alt={alt}
        width={layout ? undefined : width}
        height={layout ? undefined : height}
        layout={layout}
        sizes="100vw"
        quality={quality}
        priority={priority} // Jika priority=true, gambar akan dimuat segera
        className={cn(
          "transition-opacity duration-300 object-fill",
          isImageLoaded ? "opacity-100" : "opacity-0",
          classNameProp // Custom class untuk gambar jika ada
        )}
        onLoad={() => setIsImageLoaded(true)} // Set state saat gambar selesai dimuat
        onError={() => setIsImageError(true)} // Ganti gambar saat error
      />
    </div>
  );
}
