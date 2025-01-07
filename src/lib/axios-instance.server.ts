
import { AuthActionServer } from "@/app/action/action.server";
import { cookies } from "next/headers";

interface FetchOptions extends RequestInit {
  headers?: { [key: string]: string };
}

// Menambahkan baseURL (pastikan ini sesuai dengan URL backend Anda)
const baseURL = process.env.BACKEND_DOMAIN || "http://localhost:8000";

const apiServer = async (
  url: string,
  options: FetchOptions = {},
  jsonType: boolean = true  
): Promise<Response> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString(); // Serialize cookies
  const token = cookieStore.get("assec");

  const headers: { [key: string]: string } = {
    Cookie: cookie,
    ...(token ? { Authorization: "Bearer " + token.value } : {}),
    "from-next": "allowed",
    ...options.headers
  };

  // Menggabungkan baseURL dengan url yang diberikan
  const fullUrl = `${baseURL}${url}`;

  if(jsonType) {
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

    /* refresh token mekanism untuk fetch api sisi server/SSR dipindah ke middleware karena lebih flexbile */
    // Jika token expired (401), coba refresh token
    //   if (response.status === 401) {
    //     return handleUnauthorizedError(fullUrl, config, response);
    //   }

    // Untuk status lain, kembalikan response
    return response;
  } catch (error) {
    throw error; // Tetap lempar error untuk exception network
  }
};

/* // Flag untuk menghindari looping refresh token
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
    const newToken = await AuthActionServer.RefreshToken(); // Panggil refresh token
    //console.log(newToken);
    // Update header Authorization dengan token baru
    originalConfig.headers = {
      ...originalConfig.headers,
      Authorization: `Bearer ${newToken.access_token.value}`,
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

    // Jika refresh token juga gagal (401 atau lainnya), kembalikan response asli
    return oldResponse; // Kembalikan response asli ke pemanggil
  } finally {
    isRefreshing = false;
  }
}; */

export { apiServer };
