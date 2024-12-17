

import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import ActivityCard from "./utility-components/activity.card";
import { ActivityLandingPage } from "../paramaters/activity/paramater";
import { LandingPageActivityMobileSection } from "./landing-page-mobile.activity";
import { LandingPageActivityDesktopSection } from "./landing-page-desktop.activity";
import Link from "next/link";

export function LandingPagePopularActivitySection(props: ActivityLandingPage) {
  return (
    <div>
       {/* Mobile */}
       <LandingPageActivityMobileSection popular_activity={props.popular_activity} best_deals_activity={props.best_deals_activity} />
      
      {/* Large */}
      <LandingPageActivityDesktopSection popular_activity={props.popular_activity} best_deals_activity={props.best_deals_activity} />
      <div className="pt-8 mx-auto w-3/4 md:w-1/3 ">
      <Link href={`${process.env.BACKEND_DOMAIN}/customer/activities`} >
        <ExpandedButton title="See More" />
      </Link>
      </div>
    </div>
  );
}
