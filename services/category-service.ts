import axios from "axios";

const API_BASE_URL = "https://test-fe.mysellerpintar.com";

export interface GetCategoriesParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const getCategories = async (params: GetCategoriesParams = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`, {
            params: {
                page: params.page || 1,
                limit: params.limit || 10,
                search: params.search || undefined,
            },
        });
        return {
            data: response.data.data,
            totalPages: response.data.totalPages,
        };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch categories"
        );
    }
};

export const getCategoryById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch category"
        );
    }
};

export const createCategory = async (name: string, description: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, {
            name,
            description,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to create category"
        );
    }
};

export const updateCategory = async (id: string, name: string, description: string) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/categories/${id}`, {
            name,
            description,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to update category"
        );
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to delete category"
        );
    }
};