import api from "@/lib/axios-instance";
import { Activity } from "../responses/activity/response";

export class ActionGlobalHomePage {
    static async GetPopularActivity() {
        try {
            const result = await api.get("/homepage/activity");
           console.log(result.data)
            return result.data as Array<Activity>;
          
          } catch (error) {
            console.error(error);
            return []; // Mengembalikan array kosong jika terjadi error
          }
    }
}