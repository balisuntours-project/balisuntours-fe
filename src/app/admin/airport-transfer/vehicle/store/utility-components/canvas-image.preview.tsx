"use client";

import { useVechileStore } from "@/app/store/vechile.store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function CanvasOrPreviewImage({
  withTriggerInput = true,
}: {
  withTriggerInput?: boolean;
}) {
  const setSelectedPostVechileImage = useVechileStore(
    (state) => state.setSelectedPostVechileImage
  );
  const selectedPostVechileImage = useVechileStore(
    (state) => state.selectedPostVechileImage
  );

  // Ref untuk canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk menangani upload gambar
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPostVechileImage(file); // Simpan file di global state

      //reset value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Fungsi untuk menggambar gambar di canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Bersihkan canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#999"; // Warna teks
        ctx.font = "14px Arial"; // Ukuran dan font teks
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Upload New Image", canvas.width / 2, canvas.height / 2);
      }
    }
  }, [selectedPostVechileImage]);
  return (
    <>
      {withTriggerInput && (
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload-input"
          ref={fileInputRef}
        />
      )}
      <Label htmlFor={withTriggerInput ? "upload-input" : "empty"} className="cursor-pointer object-cover">
        {selectedPostVechileImage ? (
          // Tampilkan gambar jika selectedPostVechileImage adalah File/Blob
          <Image
            src={!("uuid" in selectedPostVechileImage) ? URL.createObjectURL(selectedPostVechileImage as File) : selectedPostVechileImage.url}
            alt="uploaded-image"
            width={100}
            height={100}
            className="w-52 h-40 border cursor-pointer border-gray-300 bg-gray-100 rounded-lg shadow-sm object-cover"
          />
        ) : (
          // Tampilkan canvas jika selectedPostVechileImage adalah VechilePhotoResponse atau null
          <canvas
            ref={canvasRef}
            className="w-40 h-40 border cursor-pointer border-gray-300 bg-gray-100 rounded-lg shadow-sm object-cover"
            width="150"
            height="150"
          />
        )}
      </Label>
    </>
  );
}
