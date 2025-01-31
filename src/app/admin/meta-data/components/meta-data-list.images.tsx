"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { Badge } from "@/components/ui/badge";

export function MetaDataListImages({
  mainPhoto,
  galleries,
  onClick
}: {
  mainPhoto: Array<string>;
  galleries: Array<string>;
  onClick: (url: string) => void;
}) {
  return (
    <>
      <DynamicDialog
        title="Click one images below!"
        useSmallVersion={true}
        trigger={
          <Badge className="bg-[#008000] cursor-pointer">Show images</Badge>
        }
      >
        <div className="max-w-full w-full mx-auto">
          <div className="flex text-center flex-col gap-3">
            <h5 className="text-lg font-bold">Activity Main Photo</h5>
            <div className="grid grid-cols-12 gap-3">
              {mainPhoto.map((url, index) => (
                <div onClick={() => onClick((url))} className={`relative w-full col-span-4 cursor-pointer`} key={index}>
                  <ImageWithLoader
                    src={url}
                    alt={index + "-main-photo"}
                    fallbackSrc="/fallback-image.png"
                    classNameProp={`rounded-t-lg w-full h-[150px] md:h-[200px] max-h-[150px] md:max-h-[200px] object-cover`}
                    skeletonClassName={`rounded-t-lg w-full h-[150px] md:h-[200px] max-h-[150px] md:max-h-[200px]`}
                    priority={false}
                    /*   objectFit="cover" */
                    width={500}
                    height={200}
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex text-center flex-col gap-3">
            <h5 className="text-lg font-bold">Activity Galleries</h5>
            <div className="grid grid-cols-12 gap-3">
              {galleries.map((url, index) => (
                 <div onClick={() => onClick((url))} className={`relative w-full col-span-4 cursor-pointer`} key={index}>
                  <ImageWithLoader
                    src={url}
                    alt={index + "-galleries"}
                    fallbackSrc="/fallback-image.png"
                    classNameProp={`rounded-t-lg w-full h-[150px] md:h-[200px] max-h-[150px] md:max-h-[200px] object-cover`}
                    skeletonClassName={`rounded-t-lg w-full h-[150px] md:h-[200px] max-h-[150px] md:max-h-[200px]`}
                    priority={false}
                    /*   objectFit="cover" */
                    width={500}
                    height={200}
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DynamicDialog>
    </>
  );
}
