/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddReviewParamater } from "@/app/paramaters/activity-review/paramater";
import { AllActivitiesParamater } from "@/app/paramaters/activity/paramater";
import { BestActivityCategoryNameAndListActivity } from "@/app/response/activity.response";
import { ActivityMetaDataResponse } from "@/app/responses/activity-metadata/response";
import {
  Activity,
  ActivityDetailResponse,
  ActivityDetailSitemap,
  ActivityTitleAndSlugResponse,
} from "@/app/responses/activity/response";
import { api } from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

export interface ActivityActionResponse<T> {
  success: boolean;
  status_code: number;
  data: T;
}

interface ErrorServerObject {
  errors?:
    | {
        [key: string]: string | string[]; //Mendukung string atau array string sebagai nilai
      }
    | string;
  data?:
    | {
        [key: string]: string | string[]; //Mendukung string atau array string sebagai nilai
      }
    | string;
}

export class ActivityAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<ActivityActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: response.ok,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<ActivityActionResponse<T>> {
    const finalResponse = (await response.json()) as ErrorServerObject; // Parsing response JSON ke ErrorServerObject

    let message = "Unknown error occurred";

    // Tangani kasus errors
    if (finalResponse?.errors) {
      if (typeof finalResponse.errors === "string") {
        message = finalResponse.errors; // Jika errors adalah string
      } else if (typeof finalResponse.errors === "object") {
        // Jika errors adalah objek, gabungkan semua nilai menjadi string
        message = Object.values(finalResponse.errors).flat().join("\n");
      }
    }
    // Tangani kasus data
    else if (finalResponse?.data) {
      if (typeof finalResponse.data === "string") {
        message = finalResponse.data; // Jika data adalah string
      } else if (typeof finalResponse.data === "object") {
        // Jika data adalah objek, gabungkan semua nilai menjadi string
        message = Object.values(finalResponse.data).flat().join("\n");
      }
    }

    return {
      success: response.ok,
      status_code: response.status,
      data: message as T, // Gabungkan semua pesan error/data
    };
  }

  private static handleError<T>(
    error: AxiosError<ErrorServerObject>
  ): ActivityActionResponse<T> {
    let message: string = "An unknown error occurred";
    if (error.response?.data?.errors) {
      const errorMessageRaw = error.response.data.errors;
      if (Array.isArray(errorMessageRaw)) {
        const errorMessages = Object.values(error.response.data.errors);
        message = errorMessages.join(", ");
      } else {
        message = errorMessageRaw as string;
      }
      // Combine all error messages into one string
    } else if (error.response?.data?.data) {
      const errorMessageRaw = error.response.data.data;

      if (Array.isArray(errorMessageRaw)) {
        const errorMessages = Object.values(error.response.data.data);
        message = errorMessages.join(", ");
      } else {
        message = errorMessageRaw as string;
      } // Combine all error messages into one string
    } else if (error.message) {
      message = error.message;
    }

    return {
      success: false,
      status_code: error.response?.status || 422,
      data: message as T,
    };
  }

  static async GetPopularActivity(): Promise<
    ActivityActionResponse<Array<Activity>>
  > {
    try {
      const action = await api("/api/homepage/activity", {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<Activity>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<Activity>>(error.response || error);
    }
  }

  static async GetBestDealActivity(): Promise<
    ActivityActionResponse<Array<Activity>>
  > {
    try {
      const action = await api("/api/homepage/best-deals-activity", {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<Activity>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<Activity>>(error.response || error);
    }
  }

  static async GetBestCategoryActivities(
    categoryTitle: string
  ): Promise<ActivityActionResponse<BestActivityCategoryNameAndListActivity>> {
    try {
      const action = await api(
        "/api/customer/best/category/activity?category_name=" +
          encodeURIComponent(categoryTitle),
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<BestActivityCategoryNameAndListActivity>(
        action
      );
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<BestActivityCategoryNameAndListActivity>(
        error.response || error
      );
    }
  }

  static async GetPopularActivityTitleForPlaceholder(): Promise<
    ActivityActionResponse<Array<string>>
  > {
    try {
      const action = await api("/api/customer/placeholder/latest/activity", {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<string>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<string>>(error.response || error);
    }
  }

  static async GetPreviewActivityMetadata(
    slug: string
  ): Promise<ActivityActionResponse<ActivityMetaDataResponse>> {
    try {
      const action = await api(
        `/api/customer/preview/activity/metadata/${slug}`,
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<ActivityMetaDataResponse>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<ActivityMetaDataResponse>(
        error.response || error
      );
    }
  }

  static async GetActivityTitleWithSlug(): Promise<
    ActivityActionResponse<Array<ActivityTitleAndSlugResponse>>
  > {
    try {
      const action = await api("/api/customer/searchbox/title/activity", {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<ActivityTitleAndSlugResponse>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<ActivityTitleAndSlugResponse>>(
        error.response || error
      );
    }
  }

  static async GetActivityDetailSitemap(): Promise<
    ActivityActionResponse<Array<ActivityDetailSitemap>>
  > {
    try {
      const action = await api("/api/customer/sitemap/activity", {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<ActivityDetailSitemap>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<ActivityDetailSitemap>>(
        error.response || error
      );
    }
  }

  static async GetPreviewDetailActivity(
    slug: string
  ): Promise<ActivityActionResponse<ActivityDetailResponse>> {
    try {
      const action = await api(`/api/customer/preview/activity/${slug}`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<ActivityDetailResponse>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<ActivityDetailResponse>(
        error.response || error
      );
    }
  }

  static async GetAllActivities(): Promise<
    ActivityActionResponse<Array<AllActivitiesParamater>>
  > {
    try {
      const action = await api(`/api/customer/search/activity`, {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 3600, // 1hour
        },
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<AllActivitiesParamater>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<AllActivitiesParamater>>(
        error.response || error
      );
    }
  }

  static async GetRecomendedLatestsActivity(): Promise<
    ActivityActionResponse<Array<Activity>>
  > {
    try {
      const action = await api(`/api/customer/recomendation/activity`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<Activity>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<Activity>>(error.response || error);
    }
  }

  static async PostReview(
    payload: AddReviewParamater
  ): Promise<ActivityActionResponse<void>> {
    try {
      const formData = new FormData();
      formData.append("order_id", payload.order_id);

      Object.entries(payload.reviews).forEach(([key, review]) => {
        formData.append(`reviews[${key}][activity_uuid]`, review.activity_uuid);
        formData.append(`reviews[${key}][name]`, review.name);
        formData.append(`reviews[${key}][comment]`, review.comment);
        formData.append(
          `reviews[${key}][total_star]`,
          String(review.total_star)
        );

        Object.entries(review.review_galleries || {}).forEach(
          ([galleryKey, gallery]) => {
            formData.append(
              `reviews[${key}][review_galleries][${galleryKey}][file]`,
              gallery.file
            );
            formData.append(
              `reviews[${key}][review_galleries][${galleryKey}][title]`,
              gallery.title || ""
            );
          }
        );
      });

      const action = await api(
        `/api/customer/activity/review`,
        {
          method: "POST",
          body: formData,
        },
        false
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<void>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<void>(error.response || error);
    }
  }
}
