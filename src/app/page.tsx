import { LargeNavbar } from "./global-components/large.navbar";
import { LandingPageHeroSection } from "./global-components/lading-page.hero";
import { LandingPagePopularActivitySection } from "./global-components/landing-page.activity";
import {
  ActivityBestCategory,
  BestActivityCategoryNameAndListActivity,
} from "./response/activity.response";
import { LandingPageBenefit } from "./global-components/landing-page.benefit";
import { LandingPageBestCategorySection } from "./global-components/landing-page.category";
import { LandingPageFooterSection } from "./global-components/landing-page.footer";
import { Activity } from "./responses/activity/response";
import { ActivityAction } from "./actions/activity/action";
import { ActivityCategoryAction } from "./actions/category/action";
import { LandingRecentlyViewedActivity } from "./global-components/landing-page-recently.activity";
import { LandingPageRentalVechileSection } from "./global-components/landing-page.rental";

export default async function Home() {
  const batchResult = await Promise.allSettled([
    ActivityAction.GetPopularActivity(),
    ActivityAction.GetBestDealActivity(),
    ActivityCategoryAction.GetBestActivityCategories(),
  ]);

  batchResult.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Error in promise ${index + 1}:`, result.reason);
    }
  });

  const popularActivity: Array<Activity> =
    batchResult[0].status === "fulfilled" ? batchResult[0].value.data : [];
  const bestDeals: Array<Activity> =
    batchResult[1].status === "fulfilled" ? batchResult[1].value.data : [];
  const bestCategory: Array<ActivityBestCategory> =
    batchResult[2].status === "fulfilled" ? batchResult[2].value.data : [];

  const getActivityFromBestCategory = async (): Promise<
    Record<string, BestActivityCategoryNameAndListActivity>
  > => {
    const resultMapping: Record<
      string,
      BestActivityCategoryNameAndListActivity
    > = {};

    await Promise.all(
      bestCategory.map(async (category) => {
        const finalResult = await ActivityAction.GetBestCategoryActivities(
          category.title
        );
        if (finalResult.success) {
          resultMapping[category.title] = finalResult.data;
        } else {
          resultMapping[category.title] = {
            name: "Oops something when wrong",
            activities: [],
          };
        }
      })
    );
    return resultMapping;
  };

  const activityFromBestCategory = await getActivityFromBestCategory();

  return (
    <>
      <LargeNavbar />
      <div className="pt-11 md:pt-22 lg:pt-24">
        <div className="">
          <LandingPageHeroSection />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
            <LandingRecentlyViewedActivity />
            <LandingPageBenefit />
            <LandingPagePopularActivitySection
              best_deals_activity={bestDeals}
              popular_activity={popularActivity}
            />
            <LandingPageBestCategorySection
              best_category={bestCategory}
              best_category_activity={activityFromBestCategory}
            />
            <LandingPageRentalVechileSection />
          </div>
          <hr />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
            <LandingPageFooterSection />
          </div>
        </div>
      </div>
    </>
  );
}
