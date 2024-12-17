import Image from "next/image";
import { LargeNavbar } from "./global-components/large.navbar";
import { LandingPageHeroSection } from "./global-components/lading-page.hero";
import { LandingPagePopularActivitySection } from "./global-components/landing-page.activity";
import axios from "axios";
import { ActivityBestCategory, BestActivityCategoryNameAndListActivity } from "./response/activity.response";
import { LandingPageBenefit } from "./global-components/landing-page.benefit";
import { LandingPageBestCategorySection } from "./global-components/landing-page.category";
import { LandingPageFooterSection } from "./global-components/landing-page.footer";
import { api }from "@/lib/axios-instance";
import { Activity } from "./responses/activity/response";

export default async function Home() {

  const getPopularActivity = async (): Promise<Array<Activity>> => {
    try {
      const result = await api("/homepage/activity", {
        method: "GET"
      });
      const finalResult = await result.json()
      console.log(finalResult)
      return finalResult as Array<Activity>;
    
    } catch (error) {
      console.error(error);
      return []; // Mengembalikan array kosong jika terjadi error
    }
  };

  const getBestDealActivity = async() : Promise<Array<Activity>> => {
    try {
        const result = await api("/homepage/best-deals-activity", {
          method: "GET"
        })
        const finalResult = await result.json()
        return finalResult
    } catch (error) {
      console.log(error)
      return []
    }
  }


  const getBestCategory = async() : Promise<Array<ActivityBestCategory>> => {
    try {
        const result = await api("/customer/most/category", {
          method: "GET"
        })
        const finalResult = await result.json()
        return finalResult.data
    } catch (error) {
      console.log(error)
      return []
    }
  }


  const popularActivity : Array<Activity> =  await getPopularActivity()
  const bestDeals : Array<Activity> =  await getBestDealActivity()
  const bestCategory : Array<ActivityBestCategory> =  await getBestCategory()

  const getActivityFromBestCategory = async (): Promise<Record<string, BestActivityCategoryNameAndListActivity>> => {
    const resultMapping: Record<string, BestActivityCategoryNameAndListActivity> = {};
  
    await Promise.all(
      bestCategory.map(async (category) => {
        
        try {
          const result = await api(
            "/customer/best/category/activity?category_name=" + encodeURIComponent(category.title),
            {
              method: "GET"
            }
          );
          
          const finalResult = await result.json()
          // Masukkan hasilnya ke dalam resultMapping dengan key dari category.title
          resultMapping[category.title] = finalResult.data;
        } catch (error) {
          console.log(error);
  
          // Jika terjadi error, masukkan array kosong untuk category ini
          resultMapping[category.title] = {
            name: "Oops something when wrong",
            activities: []
          };
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
          <LandingPageBestCategorySection best_category={bestCategory} best_category_activity={activityFromBestCategory}  />
         
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
