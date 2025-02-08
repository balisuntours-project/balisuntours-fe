import {
  DetailActivityParamater,
  RecentlyOrRecomendedActivityParamater,
} from "@/app/paramaters/activity/paramater";

import { notFound } from "next/navigation";
import { generateMetadata } from "./dynamic.metadata";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { DetailActivityTitle } from "./components/detail-activity.title";
import { DetailActivityHero } from "./components/detail-activity.hero";
import { ActivityActionServer } from "@/app/actions/activity/action.server";
import { DetailActivityPackage } from "./components/detail-activity.package";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { SetRecentlyViewedActivityToStorage } from "./components/set-previewed-storage.activity";
import { ActivityAction } from "@/app/actions/activity/action";
import { Activity } from "@/app/responses/activity/response";
import { ActivitySuggestion } from "./components/activity-suggestion";

export { generateMetadata };

export default async function PreviewActivity({
  params,
}: {
  params: Promise<DetailActivityParamater>;
}) {
  const slug = (await params).slug;

  const data = await ActivityActionServer.GetPreviewDetailActivity(slug);

  if (!data.success) {
    notFound();
  }

  const activity = data.data;

  const dataForRecentlyShowedActivity: RecentlyOrRecomendedActivityParamater = {
    slug: activity.slug,
    title: activity.title,
    image: activity.activity_main_photo.files.url,
    smaller_price: activity.smaller_price,
    viewed_on: new Date(),
  };

  const randomActivity = await ActivityActionServer.GetRandomRecomendedActivity(activity.uuid);

  return (
    <>
      <LargeNavbar />
      <SetRecentlyViewedActivityToStorage
        activity={dataForRecentlyShowedActivity}
      />
      <div className="pt-11 md:pt-32 lg:pt-32 relative">
        <div className="md:container flex flex-col md:px-8  md:pt-11 pb-11 w-full">
          <div className="flex flex-col md:flex-col-reverse">
            <DetailActivityHero
              activity_main_photo={activity.activity_main_photo}
              activity_galleries={activity.activity_galleries}
              is_published={activity.is_published}
            />

            <div className="px-5 md:px-0">
              <DetailActivityTitle
                title={activity.title}
                sub_title={activity.sub_title}
                rating={activity.rating}
                total_participant={activity.total_participant}
                total_review={activity.total_review}
                total_star={activity.total_star}
                activity_address={activity.activity_address}
                zoom_map={activity.zoom_map}
                ordered={activity.ordered}
                activity_categories={activity.activity_categories}
                coordinate_location={activity.coordinate_location}
              />
            </div>
          </div>

          <div className="px-5 md:px-0">
            <DetailActivityPackage
              hightlight={activity.hightlight}
              description={activity.description}
              activity_packages={activity.activity_packages}
              additional_description={activity.additional_description}
              activity_galleries={activity.activity_galleries}
              is_published={activity.is_published}
              reviews={activity.reviews}
              more_reviews_url={activity.more_reviews_url}
            />
          </div>
          <div className="px-5 md:px-0">
            <ActivitySuggestion popular_activity={randomActivity.data} />
          </div>
          {/* <DetailActivityReviews reviews={activity.reviews} more_reviews_url={activity.more_reviews_url} /> */}
        </div>

        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection className="mb-20 md:mb-0" />
        </div>
      </div>
    </>
  );
}
