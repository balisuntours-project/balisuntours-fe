/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CancelBookingParamater,
  CheckoutFinalPayloadParamater,
  CheckoutUnconfirmedBookingParamater,
} from "@/app/paramaters/booking/paramater";
import { TransferCoinParamater } from "@/app/paramaters/coin/paramater";
import {
  CheckoutBookingResponse,
  CheckoutUnconfirmedBookingResponse,
} from "@/app/responses/booking/response";
import { CoinConfigurationResponse, CoinHistoryTransactionResponse, UserCoinBalanceResponse } from "@/app/responses/coin/response";
import { api } from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

export interface CoinActionResponse<T> {
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

export class CoinAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<CoinActionResponse<T>> {
    const finalResponse = await response.json();

    return {
      success: response.ok,
      status_code: response.status,
      data: Object.prototype.hasOwnProperty.call(finalResponse, "data")
        ? finalResponse.data
        : finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<CoinActionResponse<T>> {
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
  ): CoinActionResponse<T> {
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

  static async CoinConfiguration(): Promise<
    CoinActionResponse<CoinConfigurationResponse>
  > {
    try {
      const action = await api(`/api/customer/coin-configuration`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<CoinConfigurationResponse>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<CoinConfigurationResponse>(error.response || error);
    }
  }

  static async CoinBalance(): Promise<
    CoinActionResponse<UserCoinBalanceResponse>
  > {
    try {
      const action = await api(`/api/customer/coin-balance`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<UserCoinBalanceResponse>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<UserCoinBalanceResponse>(error.response || error);
    }
  }

  static async CoinHistory(subDaysFilter: number): Promise<
    CoinActionResponse<Array<CoinHistoryTransactionResponse>>
  > {
    try {
      const action = await api(`/api/customer/coin-history?filter_sub_days=${subDaysFilter}`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<Array<CoinHistoryTransactionResponse>>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<Array<CoinHistoryTransactionResponse>>(error.response || error);
    }
  }

   static async ReservedCoinHistory(): Promise<
    CoinActionResponse<Array<CoinHistoryTransactionResponse>>
  > {
    try {
      const action = await api(`/api/customer/reserved-coin-history`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<Array<CoinHistoryTransactionResponse>>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<Array<CoinHistoryTransactionResponse>>(error.response || error);
    }
  }

  static async FindUserBeforeTransferCoin(email: string): Promise<
    CoinActionResponse<string>
  > {
    try {
      const action = await api(`/api/customer/find-user?email=${email}`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<string>(error.response || error);
    }
  }

  static async TransferCoin(payload: TransferCoinParamater): Promise<
    CoinActionResponse<string>
  > {
    try {
      const action = await api(`/api/customer/transfer-coin`, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<string>(error.response || error);
    }
  }
}
