/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CancelBookingParamater,
  CheckoutFinalPayloadParamater,
  CheckoutUnconfirmedBookingParamater,
} from "@/app/paramaters/booking/paramater";
import {
  CheckoutBookingResponse,
  CheckoutUnconfirmedBookingResponse,
} from "@/app/responses/booking/response";
import { api } from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

export interface BookingActionResponse<T> {
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

export class BookingAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<BookingActionResponse<T>> {
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
  ): Promise<BookingActionResponse<T>> {
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
  ): BookingActionResponse<T> {
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

  static async CancelBooking(
    bookingUuid: string,
    payload: CancelBookingParamater
  ): Promise<BookingActionResponse<void>> {
    try {
      const action = await api(
        `/api/customer/order/waiting/cancel/${bookingUuid}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<void>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<void>(error.response || error);
    }
  }

  static async CheckoutUnconfirmedBooking(
    payload: CheckoutUnconfirmedBookingParamater
  ): Promise<BookingActionResponse<CheckoutBookingResponse | string>> {
    try {
   
      const action = await api(`/api/customer/order/waiting/checkout`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result =
        this.handleResponse<CheckoutBookingResponse | string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<CheckoutBookingResponse | string>(
        error.response || error
      );
    }
  }

  static async CheckoutBooking(
    payload: CheckoutFinalPayloadParamater
  ): Promise<BookingActionResponse<CheckoutBookingResponse | string>> {
    try {
      const action = await api(`/api/customer/payment`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<CheckoutBookingResponse | string>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<CheckoutBookingResponse | string>(
        error.response || error
      );
    }
  }
}
