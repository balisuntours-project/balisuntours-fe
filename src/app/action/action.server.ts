import { apiServer } from "@/lib/axios-instance.server";
import { CookieValidateJwtResponseType } from "@/lib/global.type";

export class AuthActionServer {
  static async RefreshToken() {
    try {
      const response = await apiServer("/api/customer/auth/refresh/validate", {
        method: "POST",
      });

      const finalResult = await response.json();

      const result: CookieValidateJwtResponseType = finalResult;

      return result;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Agar interceptor tahu refresh gagal
    }
  }

  static async GetUserRole() {
    try {
      const response = await apiServer("/api/user", {
        method: "GET",
      });

      const finalResult = await response.json();

      return finalResult.data;
    } catch (error) {
      console.error("Error fetching user data:", error);

      return {
        role: "guest"
      }
    }
  }
}
