import {
  CheckoutBookingCarDataCompleteParamater,
  CheckoutToPaymentParamater,
  GetVechileRecomendationsParamater,
} from "@/app/paramaters/airport-transfer/paramater";
import {
  TransactionListResponse,
  VechileRecomendationResponse,
} from "@/app/responses/airport-transfer/response";
import { CheckoutBookingResponse } from "@/app/responses/booking/response";
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
    param: GetVechileRecomendationsParamater
  ): Promise<
    AirportTransferActionResponse<Array<VechileRecomendationResponse>>
  > {
    try {
      let request = `transfer_type=${param.transfer_type}&origin=${param.origin}&destination=${param.destination}&origin_coordinate=${param.origin_coordinate}&destination_coordinate=${param.destination_coordinate}&total_passanger=${param.total_passanger}&transfer_date_time=${param.transfer_date_time}&administrative_area_level_3=${param.administrative_area_level_3}&administrative_area_level_4=${param.administrative_area_level_4}`;

      if (param.origin_place_id && param.destination_place_id) {
        request += `&origin_place_id=${param.origin_place_id}&destination_place_id=${param.destination_place_id}`;
      }

      const action = await api(
        `/api/customer/vechiles-recomendation-by-distance?${request}`,
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<VechileRecomendationResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<VechileRecomendationResponse>>(
        error.response || error
      );
    }
  }

  static async AddBookingVechileData(
    param: CheckoutBookingCarDataCompleteParamater
  ): Promise<AirportTransferActionResponse<string>> {
    try {
      const action = await api(`/api/customer/booking-data`, {
        method: "POST",
        body: JSON.stringify(param),
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<string>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<string>(error.response || error);
    }
  }

  static async CheckoutToPayment(
    param: CheckoutToPaymentParamater,
    bookingUuid: string
  ): Promise<AirportTransferActionResponse<CheckoutBookingResponse | string>> {
    try {
      const action = await api(
        `/api/customer/checkout-booking-data/${bookingUuid}`,
        {
          method: "POST",
          body: JSON.stringify(param),
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<CheckoutBookingResponse | string>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<CheckoutBookingResponse | string>(
        error.response || error
      );
    }
  }

  static async GetCustomerTransactionList(): Promise<
    AirportTransferActionResponse<Array<TransactionListResponse>>
  > {
    try {
      const action = await api(`/api/customer/airport-transfer/transaction`, {
        method: "GET",
      });
      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result =
        this.handleResponse<Array<TransactionListResponse>>(action);
      return result;
    } catch (error: any) {
      return this.handleFetchError<Array<TransactionListResponse>>(
        error.response || error
      );
    }
  }
}
