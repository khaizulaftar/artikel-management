"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { logout as logoutUser } from "@/services/auth-service";

export default function LogoutPage() {
    const { clearAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logoutUser();
                clearAuth();
                router.push("/auth/login");
            } catch (error) {
                console.error("Logout error:", error);
                router.push("/auth/login");
            }
        };

        performLogout();
    }, [clearAuth, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p>Sedang keluar...</p>
            </div>
        </div>
    );
}