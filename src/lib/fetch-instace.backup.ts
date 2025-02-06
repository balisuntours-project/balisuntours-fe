import { AuthAction } from "@/app/action/action";
import Cookies from "js-cookie";

interface FetchOptions extends RequestInit {
  headers?: { [key: string]: string };
}

// Menambahkan baseURL (pastikan ini sesuai dengan URL backend Anda)
const baseURL = process.env.BACKEND_DOMAIN || "http://localhost:8000";

const api = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const token = Cookies.get("assec"); // Ambil token dari cookie
  const headers: { [key: string]: string } = {
    ...options.headers,
    FROM_NEXT: "true", // custom header
    ...(token && { Authorization: `Bearer ${token}` }), // jika ada token, tambahkan Authorization header
  };

  // Menggabungkan baseURL dengan url yang diberikan
  const fullUrl = `${baseURL}${url}`;

  headers["Content-Type"] = "application/json";

  // Opsi default untuk fetch
  const config: FetchOptions = {
    method: options.method || "GET",
    headers,
    credentials: "include", // Kirim cookie
    ...options, // Merge dengan opsi tambahan
  };

  try {
    const response = await fetch(fullUrl, config);
    console.log(response);
    // Jika berhasil (status 2xx)
    if (response.ok) {
      return response;
    }

    // Jika token expired (401), coba refresh token
    if (response.status === 401) {
      return handleUnauthorizedError(fullUrl, config, response);
    }

    // Throw error jika status selain 2xx dan 401
    //throw new Error(`HTTP error! Status: ${response.status}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
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
    console.log(newToken);
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

    throw new Error("Failed to refresh token");
  } catch (refreshError) {
    console.error("Failed to refresh token:", refreshError);
    // Jika refresh token gagal, arahkan ke halaman login
    // window.location.href = "/login"; // Redirect ke halaman login
    console.log(refreshError);
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

export { api };
