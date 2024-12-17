import { ActivityBestCategory } from "@/app/response/activity.response";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ActivityTitleCard } from "./activity-title.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { BestCategoryActivityDrawer } from "./best-category-activity.drawer";
import { ActivityBestCategoryCard } from "@/app/paramaters/activity/paramater";

export function BestCategoryCard(props: ActivityBestCategoryCard) {
  // Placeholder image dari { api }eksternal
  const backgroundImage =
    "https://source.unsplash.com/random/400x400/?nature,travel";

  return (
    <Card
      className={`relative flex flex-col max-w-[200px] lg:max-w-[300px] max-h-[200px] h-[150px] md:h-[200px] overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center`}
        style={{
          background: `
      linear-gradient(
        135deg,
        #A1C4FD,  /* Biru langit pagi */
        #C2E9FB,  /* Biru lembut langit senja */
        #D4FC79,  /* Hijau kekuningan tropis */
        #96E6A1,  /* Hijau pastel dedaunan */
        #FFF6B7   /* Kuning lembut matahari pagi */
      )
    `,
        }}
      >
        {/* Overlay untuk efek redup */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Konten di atas gambar */}
      <CardContent className="relative flex flex-col h-full p-4">
        {/* Title */}
        <ActivityTitleCard title={props.category.title} />

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Drawer */}
        <BestCategoryActivityDrawer title={`${props.activity.name} Best Activity`} description="We have this recomendation for you!" activities={props.activity.activities}> 
        <ExpandedButton title="See activities" />
        </BestCategoryActivityDrawer>
      </CardContent>
    </Card>
  );
}
