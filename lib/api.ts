import axios from "axios";

export const api = axios.create({
    baseURL: "https://test-fe.mysellerpintar.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// Interceptor untuk request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor untuk response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }

        // Format error response yang konsisten
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Terjadi kesalahan";

        return Promise.reject(new Error(errorMessage));
    }
);