import { NextResponse } from "next/server"
import { loginSchema } from "@/schemas/auth-schema"
import { ZodError } from "zod"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = loginSchema.parse(body)

        return NextResponse.json({
            success: true,
            message: "Login berhasil",
            data: {
                token: "dummy-jwt-token",
                user: {
                    id: "1",
                    name: validatedData.email.split("@")[0],
                    email: validatedData.email,
                    role: "user",
                },
            },
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { success: false, errors: error.flatten() },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { success: false, message: "Login gagal" },
            { status: 500 }
        )
    }
}