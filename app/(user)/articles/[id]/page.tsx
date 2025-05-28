"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getArticleById, getArticlesByCategory } from "@/services/article-service";
import { Article } from "@/types/article";
import ArticleCard from "@/components/articles/article-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetailPage() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated || user?.role !== "user") {
            router.push("/auth/login");
        }
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const fetchedArticle = await getArticleById(id as string);
                setArticle(fetchedArticle);

                // Fetch related articles
                if (fetchedArticle.category) {
                    const related = await getArticlesByCategory(fetchedArticle.category, 3, id as string);
                    setRelatedArticles(related);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch article");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    if (!isAuthenticated || user?.role !== "user") {
        return null;
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-64 w-full" />
                    <div className="space-y-2">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="h-4 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <Button variant="outline" onClick={() => router.push("/user")}>
                    Kembali ke Daftar Artikel
                </Button>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <p className="text-gray-500">Artikel tidak ditemukan</p>
                    <Button variant="outline" onClick={() => router.push("/user")}>
                        Kembali ke Daftar Artikel
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="outline" onClick={() => router.push("/user")} className="mb-6">
                Kembali ke Daftar Artikel
            </Button>

            <article className="mb-12">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span>Kategori: {article.category}</span>
                    <span>•</span>
                    <span>
                        Dipublikasikan pada: {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                </div>
                {article.image && (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}
                <div className="prose max-w-none">
                    <p>{article.content}</p>
                </div>
            </article>

            {relatedArticles.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((related) => (
                            <ArticleCard
                                key={related.id}
                                article={related}
                                onClick={() => router.push(`/user/articles/${related.id}`)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}