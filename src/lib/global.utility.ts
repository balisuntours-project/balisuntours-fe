import { AuthAction } from "@/app/action/action";
import Cookies from "js-cookie";

import { WITA_TIMEZONE } from "./timezone.constant";
import { toZonedTime } from "date-fns-tz";
import {
  startOfDay,
  addDays,
  isBefore,
  format,
  parseISO,
  isSameYear,
  startOfMonth,
  parse,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      domain: process.env.TOP_LEVEL_DOMAIN,
      expires: new Date(0),
    });

    Cookies.set("google-login", "", {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
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

  static FormatDateFromStringToAnyFormatType(
    stringDate: string,
    dateFnsFormatType: string
  ): string {
    const formattedDate = format(
      parse(stringDate, "EEE dd MMM yyyy HH:mm", new Date()),
      dateFnsFormatType
    );

    return formattedDate;
  }

  static SetFormattedStandartDate(date: string | Date): Date {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    // console.log(date, "wakuwakuwaku")
    //console.log(parsedDate)
    const utcDate = startOfDay(parsedDate);
    //console.log(utcDate)
    const formattedDate = format(utcDate, "yyyy-MM-dd"); // Format tanggal ke string UTC
    //console.log(formattedDate)
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
    try {
      const date = parseISO(dateString); // Pastikan dateString adalah ISO 8601
      const formattedDate = format(date, "EEEE, MMMM d, yyyy");
      return formattedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date";
    }
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
    // Tentukan breakpoint untuk mobile (misalnya, 767px)
    const mobileBreakpoint = 767;

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

  static StringToSlug(string: string) {
    // Mengubah huruf menjadi huruf kecil
    let slug = string.toLowerCase();
    // Mengganti spasi dengan tanda strip (-)
    slug = slug.replace(/\s+/g, "-");
    // Menghilangkan tanda strip di awal dan akhir string
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
  }

  static StringToSlugEncodedString(string: string) {
    // Mengencode string untuk menghindari karakter yang mengganggu
    const encodedString = encodeURIComponent(string);
    // Mengubah huruf menjadi huruf kecil
    let slug = encodedString.toLowerCase();
    // Mengganti karakter yang tidak diinginkan dengan tanda strip (-)
    slug = slug.replace(/%20/g, "-"); // Mengganti spasi yang di-encode
    slug = slug.replace(/[^a-z0-9-]/g, ""); // Menghapus karakter yang tidak diinginkan
    // Menghilangkan tanda strip di awal dan akhir string
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
  }

  static generateRandom4DigitsNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  static InputFormatterForPhoneAllowNumberAndPlus(phone: string) {
    const filteredValue = phone.replace(/[^0-9+]/g, "");
    return filteredValue;
  }

  static IsValidUrl(url: string) {
    const urlPattern = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  static IsHTMLContentEmpty(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || ""; // Ambil teks dari konten HTML
    return textContent.trim().length === 0; // Cek apakah teks kosong
  }
}
