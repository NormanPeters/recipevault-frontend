// services/api.ts
import axiosInstance from './axiosInstance';
import type { User, Recipe } from './types';

export const api = {
    // User section
    async register(user: User): Promise<User> {
        try {
            const response = await axiosInstance.post<User>('/user/register', user);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    async login(user: User): Promise<string> {
        try {
            const response = await axiosInstance.post<{ token: string }>('/user/login', user);
            return response.data.token; // Will return JWT token
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    },

    // Recipe section
    async getRecipesByUserId(): Promise<Recipe[]> {
        try {
            const response = await axiosInstance.get<Recipe[]>('/user/recipe');
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    },

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            const response = await axiosInstance.post<Recipe>('/recipe', recipe);
            return response.data;
        } catch (error) {
            console.error('Error creating recipe:', error);
            throw error;
        }
    },

    async getRecipeById(id: number): Promise<Recipe> {
        try {
            const response = await axiosInstance.get<Recipe>(`/recipe/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            throw error;
        }
    },

    async updateRecipe(id: number, recipeDetails: Recipe): Promise<Recipe> {
        try {
            const response = await axiosInstance.put<Recipe>(`/recipe/${id}`, recipeDetails);
            return response.data;
        } catch (error) {
            console.error('Error updating recipe:', error);
            throw error;
        }
    },

    async deleteRecipe(id: number): Promise<string> {
        try {
            const response = await axiosInstance.delete<string>(`/recipe/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting recipe:', error);
            throw error;
        }
    },
};