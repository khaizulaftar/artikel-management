import { Article } from "@/types/article"

export const dummyArticles: Article[] = [
    {
        id: "1",
        title: "Pengenalan Next.js",
        content: "Next.js adalah framework React yang memungkinkan Anda membuat aplikasi web dengan server-side rendering dan static site generation.",
        category: "Teknologi",
        image: "/placeholder-article.jpg",
        createdAt: "2023-10-01T10:00:00Z",
        updatedAt: "2023-10-01T10:00:00Z",
        author: {
            id: "1",
            name: "Admin",
        },
    },
    // Tambahkan lebih banyak artikel dummy sesuai kebutuhan
];

export const dummyCategories = [
    {
        id: "1",
        name: "Teknologi",
        description: "Artikel tentang perkembangan teknologi terbaru",
    },
    // Tambahkan lebih banyak kategori dummy sesuai kebutuhan
];