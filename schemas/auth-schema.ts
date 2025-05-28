import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
})

// Contoh validasi di src/schemas/auth-schema.ts
export const registerSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password tidak sama", // ← Pastikan password match
    path: ["confirmPassword"],
});