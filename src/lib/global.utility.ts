import { AuthAction } from "@/app/action/action";
import Cookies from "js-cookie";

import { WITA_TIMEZONE } from "./timezone.constant";
import { toDate, toZonedTime } from "date-fns-tz";
import {
  startOfDay,
  addDays,
  isAfter,
  isEqual,
  isBefore,
  format,
  parseISO,
  isSameYear,
  startOfMonth,
  subDays,
} from "date-fns";
import { CurrencyListEnum, CurrencyListSymbolEnum } from "./global.enum";

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
      console.error(
        "Popup gagal dibuka. Periksa pengaturan popup browser Anda."
      );
    }

    return popup;
  }

  static GetAccessToken(): any {
    const accessToken = Cookies.get("assec");
    return accessToken;
  }

  static GetLoginStatusCookie(): boolean {
    const statusCookie = Cookies.get("google-login");

    if (statusCookie) {
      return statusCookie.includes("true") ? true : false;
    } else {
      return false;
    }
  }

  static async DestroyAllCookie(withReloadPage: boolean = true): Promise<void> {
    await AuthAction.LogoutAction();

    Cookies.set("assec", "", {
      path: "/",
      expires: new Date(0),
    });

    Cookies.set("google-login", "", {
      path: "/",
      expires: new Date(0),
    });

    if (withReloadPage) {
      window.location.reload();
    }
  }

  static IdrCurrencyFormat(money: number) {
    // Menghilangkan angka nol di belakang koma jika ada
    money = parseInt(money.toString().replace(/\.\d+$/, ""));
    let newMoneyFormat: string = "";
    // Jika angka lebih besar dari atau sama dengan 1.000.000, bagi dengan 1.000, lalu format dengan koma
    if (money >= 1000000) {
      newMoneyFormat = Math.floor(money / 1000).toLocaleString("id-ID");
    } else if (money >= 1000) {
      // Jika angka lebih besar dari atau sama dengan 1.000, bagi dengan 1.000 tanpa koma
      newMoneyFormat = Math.floor(money / 1000).toLocaleString("id-ID");
    } else {
      // Jika angka kurang dari 1.000, bagi dengan 1.000 untuk mendapatkan desimal, misalnya 0.5
      newMoneyFormat = (money / 1000).toFixed(1);
    }

    return "Rp." + newMoneyFormat.replace(".", ",") + "k"; // Ganti titik dengan koma untuk format IDR
  }

  static ConvertionCurrencyFormat(
    price: number,
    exchangeRate: number,
    currency: CurrencyListEnum = CurrencyListEnum.usd
  ) {
    currency =
      currency == CurrencyListEnum.rupiah ? CurrencyListEnum.usd : currency;
    const convertedAmount = price / exchangeRate;
    const twoDigitPrice = convertedAmount.toFixed(2);

    let currencyResult = `${CurrencyListSymbolEnum.usd}${twoDigitPrice}`;
    Object.entries(CurrencyListSymbolEnum).some(([symbolCurrency, symbol]) => {
      if (currency == symbolCurrency) {
        currencyResult = `${symbol}${twoDigitPrice}`;
        return true; // Menghentikan iterasi seperti `break`
      }
    });

    return currencyResult;
  }

  static SetFormattedStandartDate(date: string|Date): Date {
    const utcDate = startOfDay(date);
    const formattedDate = format(utcDate, "yyyy-MM-dd"); // Format tanggal ke string UTC
    return new Date(formattedDate);
  }

  static AllowedDates(date: Date, diffDaysAllowedDate: number): boolean {
    const now = new Date();

    // Konversi waktu sekarang ke WITA
    const nowInWITA = toZonedTime(now, WITA_TIMEZONE);

    // Ambil awal hari di zona waktu WITA
    const todayWITA = startOfDay(nowInWITA);

    // Hitung batas hari berikutnya di WITA
    const tomorrowWITA = addDays(todayWITA, diffDaysAllowedDate);

    // Konversi tanggal input ke WITA untuk dibandingkan
    const dateInWITA = toZonedTime(date, WITA_TIMEZONE);

    // Jika tanggal sebelum batas, maka disabled
    return isBefore(dateInWITA, tomorrowWITA);
  }

  static FormatBeautifullDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = format(date, "EEEE, MMMM d, yyyy");

    return formattedDate;
  }

  static checkDateInput(
    selectedDate: string | Date | undefined
  ): string | Date | null {
    if (!selectedDate) return null;

    const currentDate = new Date();
    const parsedDate =
      typeof selectedDate === "string" ? parseISO(selectedDate) : selectedDate;

    const isPastYear = isBefore(
      parsedDate,
      new Date(currentDate.getFullYear(), 0, 1)
    );
    const isSameYearAndBeforeCurrentMonth =
      isSameYear(parsedDate, currentDate) &&
      isBefore(parsedDate, startOfMonth(currentDate));

    if (isPastYear || isSameYearAndBeforeCurrentMonth) {
      return null;
    }

    return selectedDate;
  }

  static IsValidDaysBefore(selectedDate: string | Date, diffDays: number = 1) {
    const today = startOfDay(new Date()); // Reset waktu menjadi awal hari
    const allowedDays = addDays(today, diffDays);
    const selected = startOfDay(new Date(selectedDate)); // Reset waktu untuk tanggal yang dipilih

    return isBefore(selected, allowedDays); // Cek apakah tanggal yang dipilih lebih awal dari bbrapa hari lalu
  }

  static CheckScreenOnMobile = () => {
    // Tentukan breakpoint untuk mobile (misalnya, 640px)
    const mobileBreakpoint = 640;

    // Cek apakah lebar layar kurang dari atau sama dengan breakpoint
    return window.innerWidth <= mobileBreakpoint;
  };

  static CountMaxPaginationPage(
    totalItem: number,
    itemPerpage: number
  ): number {
    return Math.ceil(totalItem / itemPerpage);
  }

  static TriggerExceptionFetchApi(response: Response) {
    throw {
      status: response.status,
      statusText: response.statusText,
      response: response,
    };
  }
}
