import {
  ActivityDetailResponse,
  ActivityDetailSitemap,
  ActivityTitleAndSlugResponse,
} from "@/app/responses/activity/response";
import api from "@/lib/axios-instance";
import { CurrencyListEnum } from "@/lib/global.enum";
import { AxiosError } from "axios";

export interface CurrencyActionResponse<T> {
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

export class CurrencyAction {
  private static handleResponse<T>(response: any): CurrencyActionResponse<T> {
    return {
      success: true,
      status_code: response.status,
      data: response.data?.data ?? response.data,
    };
  }

  private static handleError<T>(
    error: AxiosError<ErrorServerObject>
  ): CurrencyActionResponse<T> {
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

  static async GetCurrency(
    currency: CurrencyListEnum = CurrencyListEnum.usd
  ): Promise<CurrencyActionResponse<number>> {
    try {
      const action = await api.get(`/api/currency/${currency}`);

      return this.handleResponse<number>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<number>(error as AxiosError<ErrorServerObject>);
    }
  }
}
