"use client";

import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { CharityCardParamater } from "@/app/paramaters/charity/paramater";
import { Card, CardContent } from "@/components/ui/card";

export function CharityCard({ data }: { data: CharityCardParamater }) {
  return (
    <>
      <Card className={`flex flex-col max-h-[350px] h-[250px] md:h-[350px]`}>
        {/* Bagian Gambar */}
        <div className={`relative w-full`}>
          <ImageWithLoader
            src={data.image}
            alt={data.title}
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

        <CardContent className="flex flex-col h-full p-4">
          {/* Title */}
          <ActivityTitleCard title={data.title} />

          <div className="flex-grow"></div>
          {/* Description */}
        <div className="mt-auto">
        <p className="text-sm mt-2">{data.description}</p>
        </div>
        </CardContent>
      </Card>
    </>
  );
}
