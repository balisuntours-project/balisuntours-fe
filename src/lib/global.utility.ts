import { AuthAction } from "@/app/action/action";
import Cookies from "js-cookie";

export class GlobalUtility {
    static truncateText(text: string, maxChars: number): string {
        if (text.length <= maxChars) {
          return text;
        }
        return text.slice(0, maxChars) + "...";
      }

      static OpenBrowserPopup(url: string) {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
    
        const popupWidth = 600;
        const popupHeight = 1000;
        const leftPosition = (screenWidth - popupWidth) / 2;
        const topPosition = (screenHeight - popupHeight) / 2;
    
        // Membuka popup
        const popup = window.open(
            url,
            "_blank",
            `width=600,height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes,resizable=yes`
        );
    
        if (!popup) {
            console.error("Popup gagal dibuka. Periksa pengaturan popup browser Anda.");
        }

        return popup
      }

      static GetAccessToken() : any {
        const accessToken = Cookies.get("assec");
        return accessToken
      } 

      static GetLoginStatusCookie() : boolean {
        const statusCookie = Cookies.get("google-login")
       
        if(statusCookie) {
           return statusCookie.includes("true") ? true : false
        }else {
          return false
        }
      }

      static async DestroyAllCookie(withReloadPage: boolean = true) : Promise<void> {
        Cookies.set("assec", "", {
          path: "/",
          expires: new Date(0),
        });
      
        Cookies.set("google-login", "", {
          path: "/",
          expires: new Date(0),
        });
        
        await AuthAction.LogoutAction()

        if(withReloadPage){
          window.location.reload();
        }
      }

      static IdrCurrencyFormat(money: number) {
        // Menghilangkan angka nol di belakang koma jika ada
        money = parseInt(money.toString().replace(/\.\d+$/, ''));
        let newMoneyFormat: string = ""
        // Jika angka lebih besar dari atau sama dengan 1.000.000, bagi dengan 1.000, lalu format dengan koma
        if (money >= 1000000) {
            newMoneyFormat = Math.floor(money / 1000).toLocaleString('id-ID');
        } else if (money >= 1000) {
            // Jika angka lebih besar dari atau sama dengan 1.000, bagi dengan 1.000 tanpa koma
            newMoneyFormat = Math.floor(money / 1000).toLocaleString('id-ID');
        } else {
            // Jika angka kurang dari 1.000, bagi dengan 1.000 untuk mendapatkan desimal, misalnya 0.5
            newMoneyFormat = (money / 1000).toFixed(1);
        }
    
        return "Rp." + newMoneyFormat.replace('.', ',') + "k"; // Ganti titik dengan koma untuk format IDR
    };
}