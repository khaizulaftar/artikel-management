import axios from "axios";

const API_BASE_URL = "https://test-fe.mysellerpintar.com";

export interface GetArticlesParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
}

export const getArticles = async (params: GetArticlesParams = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`, {
            params: {
                page: params.page || 1,
                limit: params.limit || 9,
                search: params.search || undefined,
                category: params.category || undefined,
            },
        });
        return {
            data: response.data.data,
            totalPages: response.data.totalPages,
        };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch articles"
        );
    }
};

export const getArticleById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch article"
        );
    }
};

export const getArticlesByCategory = async (
    category: string,
    limit: number = 3,
    excludeId?: string
) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`, {
            params: {
                category,
                limit,
            },
        });

        // Filter out the current article if excludeId is provided
        const articles = response.data.data;
        return excludeId
            ? articles.filter((article: any) => article.id !== excludeId)
            : articles;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch related articles"
        );
    }
};

export const createArticle = async (articleData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/articles`, articleData);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to create article"
        );
    }
};

export const updateArticle = async (id: string, articleData: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to update article"
        );
    }
};

export const deleteArticle = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/articles/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to delete article"
        );
    }
};