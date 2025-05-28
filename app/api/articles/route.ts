import { NextResponse } from "next/server"
import { articleSchema } from "@/schemas/article-schema"
import { ZodError } from "zod"

export async function GET(request: Request) {
    try {
        // Simulasi data artikel
        const articles = [
            {
                id: "1",
                title: "Pengenalan Next.js",
                content: "Next.js adalah framework React yang powerful...",
                category: "Teknologi",
                createdAt: new Date().toISOString(),
            },
        ]

        return NextResponse.json({
            success: true,
            data: articles,
            totalPages: 1,
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data artikel" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = articleSchema.parse(body)

        // Simulasi response create article
        return NextResponse.json({
            success: true,
            message: "Artikel berhasil dibuat",
            data: {
                ...validatedData,
                id: "2",
                createdAt: new Date().toISOString(),
                author: { id: "1", name: "Admin" },
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
            { success: false, message: "Gagal membuat artikel" },
            { status: 500 }
        )
    }
}