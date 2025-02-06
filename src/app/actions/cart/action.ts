/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  StoreCartParamater,
  UpdateCartParamater,
} from "@/app/paramaters/cart/paramater";
import { api } from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

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

export class CartAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<CartActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: response.ok,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<CartActionResponse<T>> {
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

  static async StoreToCart(
    payload: StoreCartParamater
  ): Promise<CartActionResponse<Array<string> | string>> {
    try {
      const action = await api(`/api/customer/cart`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<Array<string> | string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<Array<string> | string>(
        error.response || error
      );
    }
  }

  static async UpdateCart(
    payload: UpdateCartParamater
  ): Promise<CartActionResponse<Omit<UpdateCartParamater, "type">>> {
    try {
      const action = await api(`/api/customer/cart/order/edit`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result =
        this.handleResponse<Omit<UpdateCartParamater, "type">>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<Omit<UpdateCartParamater, "type">>(
        error.response || error
      );
    }
  }

  static async DestroySingleCart(
    orderId: string
  ): Promise<CartActionResponse<string>> {
    try {
      const action = await api(
        `/api/customer/cart/order/delete?temporary_order_id=${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<string>(error.response || error);
    }
  }

  static async DestroyAllCart(
    orderIds: Array<string>
  ): Promise<CartActionResponse<string>> {
    try {
      const stringOrderIds = JSON.stringify(orderIds);
      const action = await api(
        `/api/customer/cart/orders/delete?temporary_order_ids=${stringOrderIds}`,
        {
          method: "DELETE",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      const result = this.handleResponse<string>(action);

      return result;
    } catch (error: any) {
      return this.handleFetchError<string>(error.response || error);
    }
  }

  static async FreeTourValidation(
    payload: string
  ): Promise<CartActionResponse<boolean>> {
    try {
      const action = await api(
        `/api/customer/free-tour-validation?cart_data=${[payload]}`,
        {
          method: "POST",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<boolean>(action);
    } catch (error: any) {
      console.log(error);
      return this.handleFetchError<boolean>(error.response || error);
    }
  }
}
