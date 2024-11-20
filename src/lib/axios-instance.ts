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
    return config;
});

// Interceptor untuk menangani response (termasuk token expired)
api.interceptors.response.use(
    (response) => response, // Jika respons sukses, langsung kembalikan
    async (error) => {
        if (error.response && error.response.status == 401) {
            try {
                // Panggil fungsi untuk refresh token
                const newToken = await AuthAction.RefreshToken();

                // Update header Authorization pada request yang gagal
                error.config.headers['Authorization'] = `Bearer ${newToken}`;

                // Kirim ulang request yang gagal
                return api.request(error.config);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // Redirect ke login jika refresh token gagal
               // window.location.href = '/login';
            }
        }

        return Promise.reject(error); // Jika bukan 401 atau gagal refresh token
    }
);

export default api;
