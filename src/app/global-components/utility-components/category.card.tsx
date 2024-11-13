import { ActivityBestCategory } from "@/app/response/activity.response";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ActivityTitleCard } from "./activity-title.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { BestCategoryActivityDrawer } from "./best-category-activity.drawer";
import { ActivityBestCategoryCard } from "@/app/paramater/activity.paramater";

export function BestCategoryCard(props: ActivityBestCategoryCard) {
  // Placeholder image dari API eksternal
  const backgroundImage = 'https://source.unsplash.com/random/400x400/?nature,travel';

  return (
    <Card className={`relative flex flex-col max-w-[200px] lg:max-w-[300px] max-h-[200px] h-[150px] md:h-[200px] overflow-hidden`}>
      {/* Background Image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay untuk efek redup */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Konten di atas gambar */}
      <CardContent className="relative flex flex-col h-full p-4 text-white">
        {/* Title */}
        <ActivityTitleCard title={props.category.title} />

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Drawer */}
        <BestCategoryActivityDrawer activityList={props.activity} />
      </CardContent>
    </Card>
  );
}