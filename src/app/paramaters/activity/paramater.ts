import { ActivityPackagePreviewDetailResponse } from "@/app/responses/activity-package/response";
import {
  ActivityBestCategory,
  BestActivityCategoryNameAndListActivity,
} from "../../response/activity.response";
import {
  Activity,
  ActivityDetailResponse,
} from "../../responses/activity/response";
import { ActivityPackagePriceResponse } from "@/app/responses/activity-package-price/response";
import { IncrementDecrementEnum } from "@/app/enums/activity/activity.enum";
import { ActivityCategoryResponse } from "@/app/responses/activity-category/response";
import React from "react";

export type ActivityCardProps = {
  activity: Activity;
  tags: ActivityTags;
  useMobileHeight?: boolean;
  showDesciption?: string;
  showTags?: boolean;
  withStyledConfig?: boolean;
};

export interface ActivityTags {
  first_tag: string;
  second_tag: string;
}

export interface ActivityLandingPage {
  popular_activity: Array<Activity>;
  best_deals_activity: Array<Activity>;
}

export interface ActivitySuggestionType {
  popular_activity: Array<Activity>;
}

export interface ActivityBestCategoryLandingPage {
  best_category: Array<ActivityBestCategory>;
  best_category_activity: Record<
    string,
    BestActivityCategoryNameAndListActivity
  >;
}

export interface ActivityBestCategoryCard {
  category: ActivityBestCategory;
  activity: BestActivityCategoryNameAndListActivity;
  useMobileHeight?: boolean;
}

export interface DetailActivityParamater {
  slug: string;
}

export interface ActivityDrawerParamater {
  activities: Array<Activity>;
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface DetailActivityTitleParamater
  extends Pick<
    ActivityDetailResponse,
    | "title"
    | "sub_title"
    | "rating"
    | "total_participant"
    | "total_review"
    | "total_star"
    | "ordered"
    | "zoom_map"
    | "activity_categories"
    | "activity_address"
    | "coordinate_location"
  > {}

export interface DetailActivityHeroParamater
  extends Pick<
    ActivityDetailResponse,
    "activity_main_photo" | "activity_galleries" | "is_published"
  > {}

export interface DetailActivityPackageParamater
  extends Pick<
    ActivityDetailResponse,
    | "hightlight"
    | "description"
    | "activity_packages"
    | "additional_description"
    | "activity_galleries"
    | "is_published"
    | "reviews"
    | "more_reviews_url"
  > {}

export interface DetailActivityReviewParamater
  extends Pick<ActivityDetailResponse, "reviews" | "more_reviews_url"> {}

export interface PackageListsParamater
  extends Omit<ActivityPackagePreviewDetailResponse, "itineraries"> {}

export interface ItineraryListsParamater
  extends Pick<ActivityPackagePreviewDetailResponse, "itineraries"> {}

export interface PriceListsParamater extends ActivityPackagePriceResponse {
  qty: number;
}

export interface WhatToExpectParamater
  extends Pick<
    ActivityDetailResponse,
    "additional_description" | "activity_galleries"
  > {}

export interface CalculateTotalPriceParamater {
  new_qty: number;
  price: number;
  current_total_price: number;
  action: IncrementDecrementEnum;
}

export interface AllActivitiesParamater extends Activity {
  activity_categories: Array<ActivityCategoryResponse>;
}

export interface RecentlyOrRecomendedActivityParamater {
  slug: string;
  image: string;
  title: string;
  smaller_price: number;
  viewed_on: Date | string;
}
