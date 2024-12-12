import { AuthAction } from '@/app/action/action';
import axios from 'axios';
import Cookies from 'js-cookie';

// Buat instance Axios
const api = axios.create({
    baseURL: process.env.BACKEND_DOMAIN,
    withCredentials: true, // Cookie otomatis dilampirkan
});

// Interceptor untuk menyisipkan Authorization header
api.interceptors.request.use((config) => {
    const token = Cookies.get('assec'); // Baca access token dari cookie
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Tambahkan header Authorization
    }
    config.headers['FROM_NEXT'] = `true` //customer header
    return config;
});

// Flag untuk menghindari looping
let isRefreshing = false;

// Interceptor untuk menangani response (termasuk token expired)
api.interceptors.response.use(
    (response) => response, // Jika respons sukses, langsung kembalikan
    async (error) => {
    
        const originalRequest = error.config;

         if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Jika refresh token sedang berjalan, tolak request ini
                return Promise.reject(error);
            }

            try {
                isRefreshing = true;
                originalRequest._retry = true; // Tandai agar tidak masuk loop
                const newToken = await AuthAction.RefreshToken();

                // Update header Authorization pada request yang gagal
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                // Kirim ulang request yang gagal
                return api.request(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);

                // Jika refresh token gagal, arahkan ke halaman login
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error); // Jika bukan 401 atau gagal refresh token
    }
);

export default api;
