import { NextResponse } from "next/server";
import { registerSchema } from "@/schemas/auth-schema";
import { ZodError } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        // Simulasi response sukses
        return NextResponse.json({
            success: true,
            message: "Registrasi berhasil",
            data: {
                token: "dummy-jwt-token",
                user: {
                    id: "1",
                    name: validatedData.name,
                    email: validatedData.email,
                    role: "user",
                },
            },
        }, {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        // Handle validation error
        if (error instanceof ZodError) {
            return NextResponse.json({
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Validasi gagal"
            }, { status: 400 });
        }

        // Handle other errors
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan server"
        }, { status: 500 });
    }
}