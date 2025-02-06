import { AuthAction } from "@/app/action/action";
import Cookies from "js-cookie";

interface FetchOptions extends RequestInit {
  headers?: { [key: string]: string };
}

// Menambahkan baseURL (pastikan ini sesuai dengan URL backend Anda)
const baseURL = process.env.BACKEND_DOMAIN || "http://localhost:8000";

const api = async (
  url: string,
  options: FetchOptions = {},
  jsonType: boolean = true
): Promise<Response> => {
  const token = Cookies.get("assec"); // Ambil token dari cookie
  const headers: { [key: string]: string } = {
    ...options.headers,
    "from-next": "allowed", // custom header
    ...(token && { Authorization: `Bearer ${token}` }), // jika ada token, tambahkan Authorization header
  };

  // Menggabungkan baseURL dengan url yang diberikan
  const fullUrl = `${baseURL}${url}`;

  if (jsonType) {
    headers["Content-Type"] = "application/json";
  }
  headers["Accept"] = "application/json";

  // Opsi default untuk fetch
  const config: FetchOptions = {
    method: options.method || "GET",
    headers,
    credentials: "include", // Kirim cookie
    ...options, // Merge dengan opsi tambahan
  };

  try {
    const response = await fetch(fullUrl, config);

    // Jika berhasil (status 2xx)
    if (response.ok) {
      return response;
    }

    // Jika token expired (401), coba refresh token
    if (response.status === 401) {
      return handleUnauthorizedError(fullUrl, config, response);
    }

    // Untuk status lain, kembalikan response
    return response;
  } catch (error) {
    console.error(error);
    throw error; // Tetap lempar error untuk exception network
  }
};

// Flag untuk menghindari looping refresh token
let isRefreshing = false;

// Tangani error 401 dan refresh token
const handleUnauthorizedError = async (
  url: string,
  originalConfig: FetchOptions,
  oldResponse: Response
): Promise<Response> => {
  if (isRefreshing) {
    // Jika refresh token sedang berlangsung, tolak request
    return Promise.reject(new Error("Token refresh is in progress."));
  }

  try {
    isRefreshing = true;
    const newToken = await AuthAction.RefreshToken(); // Panggil refresh token

    // Update header Authorization dengan token baru
    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${newToken}`,
    };

    // Kirim ulang request yang gagal
    const retriedResponse = await fetch(url, originalConfig);

    // Jika berhasil, kembalikan response
    if (retriedResponse.ok) {
      return retriedResponse;
    }

    // Jika retried response gagal (selain 401), kembalikan ke pemanggil
    return retriedResponse;
  } catch (refreshError) {
    console.error("Failed to refresh token:", refreshError);
    //remove cookie2 yang membandel
    Cookies.remove("assec", {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
    });
    Cookies.remove("google-login", {
      path: "/",
      domain: process.env.TOP_LEVEL_DOMAIN,
    });

    // Jika refresh token juga gagal (401 atau lainnya), kembalikan response asli
    return oldResponse; // Kembalikan response asli ke pemanggil
  } finally {
    isRefreshing = false;
  }
};

export { api };
