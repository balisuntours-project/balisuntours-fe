import { StoreCartParamater } from "@/app/paramaters/cart/paramater";
import {
    ActivityDetailResponse,
    ActivityDetailSitemap,
    ActivityTitleAndSlugResponse,
  } from "@/app/responses/activity/response";
  import api from "@/lib/axios-instance";
import { CurrencyListEnum } from "@/lib/global.enum";
  import { AxiosError } from "axios";
  
  export interface CartActionResponse<T> {
    success: boolean;
    status_code: number;
    message?: string;
    data: T;
  }
  
  interface ErrorServerObject {
    errors?: {
      [key: string]: string; //Dynamic properties with string values
    } | string;
    data?: {
        [key: string]: string; //Dynamic properties with string values
      } | string;
  }
  
  export class CartAction {
    private static handleResponse<T>(response: any): CartActionResponse<T> {
      return {
        success: true,
        status_code: response.status,
        message: response.data?.message ?? "No response message",
        data: response.data?.data ?? response.data,
      };
    }
  
    private static handleError<T>(
      error: AxiosError<ErrorServerObject>
    ): CartActionResponse<T> {
      let message: string = "An unknown error occurred";
      if (error.response?.data?.errors) {
        const errorMessageRaw = error.response.data.errors
        if(Array.isArray(errorMessageRaw)) {
            const errorMessages = Object.values(error.response.data.errors)
            message = errorMessages.join(", ")
        }else {
            message = errorMessageRaw as string
        }
      // Combine all error messages into one string
      } else if(error.response?.data?.data){
        const errorMessageRaw = error.response.data.data
       
        
        if(Array.isArray(errorMessageRaw)) {
            const errorMessages = Object.values(error.response.data.data)
            message = errorMessages.join(", ")
        }else {
            message = errorMessageRaw as string
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
  
    static async StoreToCart(payload: StoreCartParamater): Promise<
      CartActionResponse<Array<string>|string>
    > {
      try {
        const action = await api.post(`/api/customer/cart`, payload);
        
        return this.handleResponse<Array<string>|string>(action);
      } catch (error) {
        console.error(error);
        return this.handleError<Array<string>|string>(
          error as AxiosError<ErrorServerObject>
        );
      }
    }

    static async FreeTourValidation(payload: string): Promise<
    CartActionResponse<boolean>
  > {
    try {
      const action = await api.post(`/api/customer/free-tour-validation?cart_data=${[payload]}`);
     
      return this.handleResponse<boolean>(action);
    } catch (error) {
      console.error(error);
      return this.handleError<boolean>(
        error as AxiosError<ErrorServerObject>
      );
    }
  }

  }
  