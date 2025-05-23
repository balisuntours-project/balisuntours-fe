import { StoreFreeVoucherParamater } from "@/app/paramaters/free-voucher/paramater";
import { ActivityListResponse, NewFreeVoucherResponse, PackageListResponse, PriceListResponse } from "@/app/responses/free-voucher/response";
import { api } from "@/lib/axios-instance";
import { GlobalUtility } from "@/lib/global.utility";

export interface FreeVoucherActionResponse<T> {
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

export class FreeVoucherAction {
  private static async handleResponse<T>(
    response: Response
  ): Promise<FreeVoucherActionResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: response.ok,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<FreeVoucherActionResponse<T>> {
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
  static async GetActivityList(): Promise<
    FreeVoucherActionResponse<Array<ActivityListResponse>>
  > {
    try {
      const action = await api(
        `/api/admin/activities-attachment`,
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<ActivityListResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<ActivityListResponse>>(
        error.response || error
      );
    }
  }

  static async GetPackageList(activityUuid: string): Promise<
    FreeVoucherActionResponse<Array<PackageListResponse>>
  > {
    try {
      const action = await api(
        `/api/admin/packages-attachment/${activityUuid}`,
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<PackageListResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<PackageListResponse>>(
        error.response || error
      );
    }
  }

  static async GetPriceList(packageUuid: string): Promise<
    FreeVoucherActionResponse<Array<PriceListResponse>>
  > {
    try {
      const action = await api(
        `/api/admin/prices-attachment/${packageUuid}`,
        {
          method: "GET",
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<PriceListResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<PriceListResponse>>(
        error.response || error
      );
    }
  }

  static async StoreFreeVoucher(payload: StoreFreeVoucherParamater): Promise<
    FreeVoucherActionResponse<Array<NewFreeVoucherResponse>>
  > {
    try {
      const action = await api(
        `/api/admin/free-package-unit`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<NewFreeVoucherResponse>>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<NewFreeVoucherResponse>>(
        error.response || error
      );
    }
  }
}
