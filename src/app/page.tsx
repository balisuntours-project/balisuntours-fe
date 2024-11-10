import Image from "next/image";
import { LargeNavbar } from "./global-components/large.navbar";
import { LandingPageHeroSection } from "./global-components/lading-page.hero";
import { LandingPagePopularActivitySection } from "./global-components/landing-page.activity";
import axios from "axios";
import { Activity } from "./response/activity.response";
import { LandingPageBenefit } from "./global-components/landing-page.benefit";

export default async function Home() {

  const getPopularActivity = async (): Promise<Array<Activity>> => {
    try {
      const result = await axios.get("https://booking.balisuntours.com/homepage/activity");
      return result.data as Array<Activity>;
    } catch (error) {
      console.error(error);
      return []; // Mengembalikan array kosong jika terjadi error
    }
  };

  const getBestDealActivity = async() : Promise<Array<Activity>> => {
    try {
        const result = await axios.get("https://booking.balisuntours.com/homepage/best-deals-activity")
        return result.data
    } catch (error) {
      console.log(error)
      return []
    }
  }
  
  const popularActivity : Array<Activity> =  await getPopularActivity()
  const bestDeals : Array<Activity> =  await getBestDealActivity()
  return (
   <>
   <LargeNavbar />
   <div className="pt-11 md:pt-22 lg:pt-24">
        <div className="">
          <LandingPageHeroSection />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
            <LandingPageBenefit />
          <LandingPagePopularActivitySection best_deals_activity={bestDeals} popular_activity={popularActivity} />
          </div>
        </div>
      </div>
   </>
  );
}
