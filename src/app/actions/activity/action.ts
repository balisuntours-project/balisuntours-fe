import { AllActivitiesParamater } from "@/app/paramaters/activity/paramater";
import {
  Activity,
  ActivityDetailResponse,
  ActivityDetailSitemap,
  ActivityTitleAndSlugResponse,
} from "@/app/responses/activity/response";
import { api } from "@/lib/axios-instance";
import { AxiosError } from "axios";
import { unstable_cache } from "next/cache";

export interface ActivityActionResponse<T> {
  success: boolean;
  status_code: number;
  data: T;
}

interface ErrorServerObject {
  errors?:
    | {
        [key: string]: string; //Dynamic properties with string values
      }
    | string;
  data?:
    | {
        [key: string]: string; //Dynamic properties with string values
      }
    | string;
}

export class ActivityAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<ActivityActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: true,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
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

  static async GetActivityTitleWithSlug(): Promise<
    ActivityActionResponse<Array<ActivityTitleAndSlugResponse>>
  > {
    try {
      const action = await api("/customer/searchbox/title/activity", {
        method: "GET",
      });

      return this.handleResponse<Array<ActivityTitleAndSlugResponse>>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<Array<ActivityTitleAndSlugResponse>>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }

  static async GetActivityDetailSitemap(): Promise<
    ActivityActionResponse<Array<ActivityDetailSitemap>>
  > {
    try {
      const action = await api("/customer/sitemap/activity", {
        method: "GET",
      });

      return this.handleResponse<Array<ActivityDetailSitemap>>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<Array<ActivityDetailSitemap>>(
        error as AxiosError<ErrorServerObject>
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

      return this.handleResponse<ActivityDetailResponse>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<ActivityDetailResponse>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }

  static async GetAllActivities(
    title?: string,
    categoriesUuid?: string
  ): Promise<ActivityActionResponse<Array<AllActivitiesParamater>>> {
    try {
      const action = await api(`/api/customer/search/activity`, {
        method: "GET",
        cache: "force-cache",
        next: {
          revalidate: 60
        }
      });

      return this.handleResponse<Array<AllActivitiesParamater>>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<Array<AllActivitiesParamater>>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }

  static async GetRecomendedLatestsActivity(): Promise<
    ActivityActionResponse<Array<Activity>>
  > {
    try {
      const action = await api(`/customer/recomendation/activity`, {
        method: "GET",
      });

      return this.handleResponse<Array<Activity>>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<Array<Activity>>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }
}
