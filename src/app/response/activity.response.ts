import { Activity } from "../responses/activity/response";

export interface ActivityBestCategory {
  title: string;
  description: string;
  image: string;
  activities_url: string;
}

export interface BestActivityCategoryNameAndListActivity {
  name: string;
  activities: Array<Activity>;
}
