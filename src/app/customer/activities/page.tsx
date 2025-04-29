import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { AllActivitiesHero } from "./components/all-activities.hero";
import { AllActivitiesFilterBox } from "./components/all-activities.filter";
import { ActivityAction } from "@/app/actions/activity/action";
import { AllActivitiesList } from "./components/all-activities.activity";

export default async function AllActivities() {
  const data = await ActivityAction.GetAllActivities();

  const activities = data.data;

  return (
    <>
      <LargeNavbar />
      <div className="pt-20 md:pt-22 lg:pt-24">
        <div className="">
          <AllActivitiesHero />
          <div className="container flex flex-col gap-4 md:gap-11 px-3 md:px-8  pt-11 pb-11">
            <AllActivitiesFilterBox />
            <AllActivitiesList activities={activities} />
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
