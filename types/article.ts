export interface Article {
    id: string;
    title: string;
    content: string;
    category: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string;
    };
}