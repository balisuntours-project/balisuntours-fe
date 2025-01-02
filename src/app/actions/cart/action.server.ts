import { CartItemsResponse } from "@/app/responses/cart/response";
import { api } from "@/lib/axios-instance";
import { apiServer } from "@/lib/axios-instance.server";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export interface CartActionResponse<T> {
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

export class CartServerAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<CartActionResponse<T>> {
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
  ): Promise<CartActionResponse<T>> {
    let finalResponse: any = {};

    //lakukan ini karena jika tidak bada build runtime akan error (karena cookie next header tidak dapat dirender static, page ini static karena /customer/cart tidaka da dynamic param seperti slug)
    if (response instanceof Response) {
      try {
        finalResponse = await response.json();
      } catch {
        finalResponse = {};
      }
    }

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
  ): CartActionResponse<T> {
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

  static async GetCartData(): Promise<
    CartActionResponse<CartItemsResponse | null>
  > {
    try {
      const action = await apiServer(`/api/customer/cart`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<CartItemsResponse | null>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<CartItemsResponse | null>(
        error.response || error
      );
    }
  }
}
