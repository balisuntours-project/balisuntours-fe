import { api } from "@/lib/axios-instance";
import { CookieValidateJwtResponseType } from "@/lib/global.type";
import axios from "axios";
import Cookies from "js-cookie";
import {
  LoginParamater,
  RegisterParamater,
} from "../api/auth/paramater/auth.paramater";

export class AuthAction {
  static async RefreshToken() {
    //const tokenRefresh = Cookies.get('refresh');

    try {
      const response = await api("/api/customer/auth/refresh/validate", {
        method: "POST",
      });

      const finalResult = await response.json();

      const result: CookieValidateJwtResponseType = finalResult;

      // Simpan token baru di cookie (bukan HttpOnly)
      // Cookies.set("assec" , result.access_token.value, {
      //     path: "/",
      //     expires: 10,
      //     //httpOnly: result.access_token.http_only ? true : false,
      //     secure: result.access_token.secure ? true : false,
      //     sameSite: "lax"
      // })

      // Cookies.set("refresh" , result.refresh_token.value, {
      //     path: "/",
      //     expires: Math.floor(result.refresh_token.ttl / 86400) ,
      //     httpOnly: result.refresh_token.http_only ? true : false,
      //     secure: result.refresh_token.secure ? true : false,
      //     sameSite: "lax"
      // })

      return result.access_token.value;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Agar interceptor tahu refresh gagal
    }
  }

  static async RegisterUser(payload: RegisterParamater) {
    try {
      const result = await api("/api/customer/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (result.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async LoginUser(payload: LoginParamater) {
    try {
      const result = await api("/api/customer/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (result.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log(error)
      console.log(error);
      return false;
    }
  }

  static async LoginInternalUser(payload: LoginParamater) {
    try {
      const result = await api("/api/internal/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (result.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // console.log(error)
      console.log(error);
      return false;
    }
  }

  static async LogoutAction() {
    try {
      await api("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }
  }
}
