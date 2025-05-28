import { z } from "zod"

export const articleSchema = z.object({
    title: z.string().min(5, "Judul minimal 5 karakter"),
    content: z.string().min(20, "Konten minimal 20 karakter"),
    category: z.string().min(1, "Kategori harus dipilih"),
    image: z.string().url("URL gambar tidak valid").optional(),
})