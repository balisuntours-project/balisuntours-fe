"use client";

import { VechileMainPhotoResponse } from "@/app/responses/vechile/response";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { useVechileStore } from "@/app/store/vechile.store";
import { CanvasOrPreviewImage } from "./canvas-image.preview";

export function VechilePhotoList({
  photoList,
}: {
  photoList: Array<VechileMainPhotoResponse>;
}) {
  // State untuk menyimpan gambar yang diklik
  const setSelectedPostVechileImage = useVechileStore(
    (state) => state.setSelectedPostVechileImage
  );
  const selectedPostVechileImage = useVechileStore(
    (state) => state.selectedPostVechileImage
  );

  const handleClickImage = (photo: VechileMainPhotoResponse) => {
    if (
      selectedPostVechileImage &&
      "uuid" in selectedPostVechileImage &&
      selectedPostVechileImage.uuid === photo.uuid
    ) {
      setSelectedPostVechileImage(null); // Unselect jika gambar yang sama diklik
    } else {
      setSelectedPostVechileImage(photo); // Select gambar baru
    }
  };

  return (
    <div className="space-y-4">
      <div className="me-auto w-full h-auto mb-4">
        <CanvasOrPreviewImage withTriggerInput={true} />
      </div>
      <hr />
      {/* Grid untuk menampilkan gambar */}
      <div className="border border-gray-200 rounded-md p-2 max-h-[400px] h-auto overflow-y-auto">
        <div className="grid grid-cols-12 gap-4">
          {photoList.map((photo, index) => (
            <div
              key={index}
              className={`cursor-pointer col-span-3 border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                selectedPostVechileImage &&
                "uuid" in selectedPostVechileImage &&
                selectedPostVechileImage.uuid === photo.uuid
                  ? "border-blue-500 border-2" // Border biru untuk gambar yang dipilih
                  : "border-gray-300" // Border abu-abu untuk gambar yang tidak dipilih
              }`}
              onClick={() => handleClickImage(photo)} // Set state saat gambar diklik
            >
              <ImageWithLoader
                src={photo.url} // Gunakan url dari VechileMainPhotoResponse
                alt={`Vechile Photo ${index + 1}`}
                width={100}
                height={100}
                fallbackSrc="/fallback-image.png"
                classNameProp="w-full h-[125px] object-cover"
                skeletonClassName="w-full h-[125px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
