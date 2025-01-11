import { ActivityBestCategory } from "@/app/response/activity.response";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ActivityTitleCard } from "./activity-title.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { BestCategoryActivityDrawer } from "./best-category-activity.drawer";
import { ActivityBestCategoryCard } from "@/app/paramaters/activity/paramater";
import { ImageWithLoader } from "./with-loader.image";

function BackgroundImage({ title }: { title: string }) {
  const backgroundImages: Record<string, string> = {
    atv: "/atv.jpg",
    cultural: "/culture.jpg",
    temple: "/temple.jpg",
    waterfall: "/waterfall.jpg",
    rafting: "/rafting.jpg",
  };

  const lowerTitle = title.toLowerCase();
  const matchedImage = Object.keys(backgroundImages).find((key) =>
    lowerTitle.includes(key)
  );

  // Jika ada gambar yang cocok, gunakan next/image
  if (matchedImage) {
    const backgroundImage = backgroundImages[matchedImage];
    return (
      <div className="relative w-full h-full">
      
      <ImageWithLoader
          src={backgroundImage}
          alt={backgroundImage}
          fallbackSrc="/fallback-image.png"
          classNameProp="max-w-[200px] lg:max-w-[300px] max-h-[200px] h-[150px] md:h-[200px] rounded-md"
          skeletonClassName="max-w-[200px] lg:max-w-[300px] max-h-[200px] h-[150px] md:h-[200px] rounded-md"
          priority={false}
         
            width={3000}
            height={200}
            quality={100}
        />

        <div className="absolute inset-0 w-full h-full bg-black opacity-40"></div>
      
      </div>
    );
  } else {
    // Jika tidak ada gambar yang cocok, gunakan background dengan style
    return (
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `linear-gradient(135deg, #A1C4FD, #C2E9FB, #D4FC79, #96E6A1, #FFF6B7)`,
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-black opacity-40"></div>
      </div>
    );
  }
}

export function BestCategoryCard(props: ActivityBestCategoryCard) {
  return (
    <Card className="relative flex flex-col max-w-[200px] lg:max-w-[300px] max-h-[200px] h-[150px] md:h-[200px] overflow-hidden">
      {/* Background Image */}
      <BackgroundImage title={props.category.title} />

      {/* Konten di atas gambar */}
      <CardContent className="absolute flex flex-col w-full h-full p-4 z-10">
        {/* Title */}
        <ActivityTitleCard title={props.category.title} textColor="text-white" />

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Drawer */}
        <BestCategoryActivityDrawer
          title={`${props.activity.name} Best Activity`}
          description="We have this recommendation for you!"
          activities={props.activity.activities}
        >
          {/* Container untuk tombol */}
          <ExpandedButton title="See activities" />
        </BestCategoryActivityDrawer>
      </CardContent>
    </Card>
  );
}


