import { ActivityCategoryParamater } from "@/app/paramaters/activity-category/paramater";
import {
  ActivityDetailResponse,
  ActivityDetailSitemap,
  ActivityTitleAndSlugResponse,
} from "@/app/responses/activity/response";
import { api } from "@/lib/axios-instance";
import { AxiosError } from "axios";

export interface ActivityCategoryActionResponse<T> {
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

export class ActivityCategoryAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<ActivityCategoryActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: true,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static handleError<T>(
    error: AxiosError<ErrorServerObject>
  ): ActivityCategoryActionResponse<T> {
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

  static async GetActivityCategories(): Promise<
    ActivityCategoryActionResponse<Array<ActivityCategoryParamater>>
  > {
    try {
      const action = await api(`/customer/categories`, {
        method: "GET",
      });

      return this.handleResponse<Array<ActivityCategoryParamater>>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<Array<ActivityCategoryParamater>>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }
}
