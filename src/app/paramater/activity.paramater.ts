import { Activity, ActivityBestCategory, BestActivityCategoryNameAndListActivity } from "../response/activity.response";

export type ActivityCardProps = {
    activity: Activity;
    tags: ActivityTags;
    useMobileHeight?: boolean;
    showDesciption?: string;
    showTags?: boolean;
};

export interface ActivityTags {
    first_tag: string,
    second_tag: string,
}

export interface ActivityLandingPage {
    popular_activity: Array<Activity>,
    best_deals_activity: Array<Activity>,
}

export interface ActivityBestCategoryLandingPage {
    best_category: Array<ActivityBestCategory>,
    best_category_activity: Record<string, BestActivityCategoryNameAndListActivity>
}

export interface ActivityBestCategoryCard {
    category: ActivityBestCategory,
    activity:BestActivityCategoryNameAndListActivity,
    useMobileHeight?: boolean
}