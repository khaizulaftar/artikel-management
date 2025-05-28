import { api } from "@/lib/api";

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: 'user' | 'admin';
    };
}

export const register = async (data: {
    name: string;
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/auth/register", {
            ...data,
            role: "user" // Default role
        });

        // Simpan token dan data user
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Error sudah diformat oleh interceptor
    }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>("/auth/login", { email, password });

        // Simpan token dan data user
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error; // Error sudah diformat oleh interceptor
    }
};

export const logout = async (): Promise<void> => {
    try {
        await api.post("/auth/logout");
    } finally {
        // Bersihkan storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};