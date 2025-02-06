import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { WhatToExpectParamater } from "@/app/paramaters/activity/paramater";
import { Leaf } from "lucide-react";

export function WhatToExceptActivity(props: WhatToExpectParamater) {
  return (
    <>
      <div className="mt-11">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          What to Expect
        </h2>
        {props.additional_description && (
          <div className="flex gap-2 mt-4 text-justify">
            <div
              className="additional_description text-sm"
              dangerouslySetInnerHTML={{
                __html: props.additional_description,
              }}
            ></div>
          </div>
        )}
        <div className="mt-6 space-y-4">
          {/*  <!-- Loop hanya untuk 3 galeri pertama --> */}

          {props.activity_galleries.length > 0 &&
            props.activity_galleries.map((gallery, key) => (
              <div key={key} className="flex flex-col gap-2">
                <ImageWithLoader
                  src={gallery.files.url}
                  alt={`gallery ${key + 1}`}
                  fallbackSrc="/fallback-image.png"
                  classNameProp="h-[400px] lg:h-[500px] object-cover w-full"
                  priority={false} // Gambar ini tidak diberi prioritas
                  width={500}
                  height={500}
                />

                {gallery.title && (
                  <span className="text-sm md:text-base text-black flex gap-2">
                    <Leaf
                      strokeWidth={2.75}
                      className="h-4 w-4 my-auto text-green-500"
                    />{" "}
                    {gallery.title}
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
