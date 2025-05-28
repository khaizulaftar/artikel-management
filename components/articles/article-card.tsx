import { Article } from "@/types/article";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
    article: Article;
    onClick?: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
    return (
        <div
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            {article.image && (
                <div className="relative h-48">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>
                        {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.content}
                </p>
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/user/articles/${article.id}`}>Baca Selengkapnya</Link>
                </Button>
            </div>
        </div>
    );
}