import axios from "axios";

const API_BASE_URL = "https://test-fe.mysellerpintar.com";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Login failed. Please try again."
        );
    }
};

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            name,
            email,
            password,
            role: "user", // Default role is user
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Registration failed. Please try again."
        );
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/logout`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Logout failed. Please try again."
        );
    }
};