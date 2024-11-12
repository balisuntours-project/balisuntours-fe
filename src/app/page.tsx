import Image from "next/image";
import { LargeNavbar } from "./global-components/large.navbar";
import { LandingPageHeroSection } from "./global-components/lading-page.hero";
import { LandingPagePopularActivitySection } from "./global-components/landing-page.activity";
import axios from "axios";
import { Activity, ActivityBestCategory } from "./response/activity.response";
import { LandingPageBenefit } from "./global-components/landing-page.benefit";
import { LandingPageBestCategorySection } from "./global-components/landing-page.category";

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


  const getBestCategory = async() : Promise<Array<ActivityBestCategory>> => {
    try {
        const result = await axios.get("https://booking.balisuntours.com/customer/most/category")
        console.log(result.data.data)
        return result.data.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  
  const popularActivity : Array<Activity> =  await getPopularActivity()
  const bestDeals : Array<Activity> =  await getBestDealActivity()
  const bestCategory : Array<ActivityBestCategory> =  await getBestCategory()

  const getActivityFromBestCategory = async (): Promise<Record<string, Array<Activity>>> => {
    const resultMapping: Record<string, Array<Activity>> = {};
  
    await Promise.all(
      bestCategory.map(async (category) => {
        try {
          const result = await axios.get(
            "https://booking.balisuntours.com/customer/best/category/activity?category_name=" + category.title
          );
          
          console.log(result.data)
          // Masukkan hasilnya ke dalam resultMapping dengan key dari category.title
          resultMapping[category.title] = result.data.data;
        } catch (error) {
          console.log(error);
  
          // Jika terjadi error, masukkan array kosong untuk category ini
          resultMapping[category.title] = [];
        }
      })
    );
    console.log(resultMapping)
  
    return resultMapping;
  };

  const activityFromBestCategory = await getActivityFromBestCategory()

  return (
   <>
   <LargeNavbar />
   <div className="pt-11 md:pt-22 lg:pt-24">
        <div className="">
          <LandingPageHeroSection />
          <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
            <LandingPageBenefit />
          <LandingPagePopularActivitySection best_deals_activity={bestDeals} popular_activity={popularActivity} />
          <LandingPageBestCategorySection bestCategory={bestCategory}  />
          </div>
        </div>
      </div>
   </>
  );
}
