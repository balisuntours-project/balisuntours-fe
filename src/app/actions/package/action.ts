import {
  ActivityDetailResponse,
  ActivityDetailSitemap,
  ActivityTitleAndSlugResponse,
} from "@/app/responses/activity/response";
import { api } from "@/lib/axios-instance";
import { AxiosError } from "axios";

export interface ActivityPackageActionResponse<T> {
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

export class ActivityPackageAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<ActivityPackageActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: true,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static handleError<T>(
    error: AxiosError<ErrorServerObject>
  ): ActivityPackageActionResponse<T> {
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

  static async GetPackageValidDateToBook(
    uuid: string
  ): Promise<ActivityPackageActionResponse<number>> {
    try {
      const action = await api(
        `/customer/activity/package/check-diff-days/${uuid}`,
        {
          method: "GET",
        }
      );

      return this.handleResponse<number>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<number>(error as AxiosError<ErrorServerObject>);
    }
  }
}
