import { VechileCategoryResponse } from "@/app/responses/vechile-category/response";
import {
  GetSingleVechileResponse,
  VechileMainPhotoResponse,
} from "@/app/responses/vechile/response";
import { apiServer } from "@/lib/axios-instance.server";
import { GlobalUtility } from "@/lib/global.utility";
import { AxiosError } from "axios";

export interface VechileActionServerResponse<T> {
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

export class VechileActionServer {
  private static async handleResponse<T>(
    response: Response
  ): Promise<VechileActionServerResponse<T>> {
    const finalResponse = await response.json();
    return {
      success: response.ok,
      status_code: response.status,
      data: finalResponse.data ?? finalResponse,
    };
  }

  private static async handleFetchError<T>(
    response: Response
  ): Promise<VechileActionServerResponse<T>> {
    let finalResponse: any = {};

    //lakukan ini karena jika tidak bada build runtime akan error (karena cookie next header tidak dapat dirender static, page ini static karena /customer/booking tidaka da dynamic param seperti slug)
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
  ): VechileActionServerResponse<T> {
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

  static async GetAllVechileMainPhoto(): Promise<
    VechileActionServerResponse<Array<VechileMainPhotoResponse>>
  > {
    try {
      const action = await apiServer(`/api/admin/vechile-main-photos`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<Array<VechileMainPhotoResponse>>(action);
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<Array<VechileMainPhotoResponse>>(
        error.response || error
      );
    }
  }

  static async GetSingleVechile(
    uuid: string
  ): Promise<VechileActionServerResponse<GetSingleVechileResponse>> {
    try {
      const action = await apiServer(`/api/admin/vechile/${uuid}`, {
        method: "GET",
      });

      if (!action.ok) {
        GlobalUtility.TriggerExceptionFetchApi(action);
      }

      return this.handleResponse<GetSingleVechileResponse>(action);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return this.handleFetchError<GetSingleVechileResponse>(
        error.response || error
      );
    }
  }
}
