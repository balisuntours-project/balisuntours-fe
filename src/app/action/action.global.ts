import { api }from "@/lib/axios-instance";
import { Activity } from "../responses/activity/response";

export class ActionGlobalHomePage {
    static async GetPopularActivity() {
        try {
            const result = await api("/homepage/activity", {
              method: "GET"
            });
            const finalResult = await result.json()
          
            return finalResult.data as Array<Activity>;
          
          } catch (error) {
            console.error(error);
            return []; // Mengembalikan array kosong jika terjadi error
          }
    }
}