"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
};

type AuthContextType = {
    token: string | null;
    user: User | null;
    setAuth: (data: { token: string; user: User }) => void;
    clearAuth: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setAuth = (data: { token: string; user: User }) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    };

    const clearAuth = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider
            value={{ token, user, setAuth, clearAuth, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}