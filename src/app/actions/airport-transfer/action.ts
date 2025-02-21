import { GetVechileRecomendationsParamater } from "@/app/paramaters/airport-transfer/paramater";
import { VechileRecomendationResponse } from "@/app/responses/airport-transfer/response";
import { api } from "@/lib/axios-instance";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

export interface AirportTransferActionResponse<T> {
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

export class AirportTransferAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<AirportTransferActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: response.ok,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<AirportTransferActionResponse<T>> {
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
  ): AirportTransferActionResponse<T> {
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

  static async GetVechilRecomendationRequest(
    param : GetVechileRecomendationsParamater
  ): Promise<AirportTransferActionResponse<Array<VechileRecomendationResponse>>> {
    try {
      const request = `transfer_type=${param.transfer_type}&origin=${param.origin}&destination=${param.destination}&total_passanger=${param.total_passanger}&transfer_date_time=${param.transfer_date_time}&administrative_area_level_3=${param.administrative_area_level_3}&administrative_area_level_4=${param.administrative_area_level_4}`
      const action = await api(`/api/customer/vechiles-recomendation?${request}`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<VechileRecomendationResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<VechileRecomendationResponse>>(error.response || error);
    }
  }
}
