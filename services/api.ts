// services/api.ts
import axiosInstance from './axiosInstance';
import { User, Recipe, Ingredient, NutritionalValue, RecipeStep } from './types';

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

    async searchRecipeByTitle(title: string): Promise<Recipe> {
        try {
            const response = await axiosInstance.get<Recipe>('/recipe/title', {
                params: { title },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching for recipe by title:', error);
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

    // Ingredient section
    async createIngredient(recipeId: number, ingredient: Ingredient): Promise<Ingredient> {
        try {
            const response = await axiosInstance.post<Ingredient>(`/recipes/${recipeId}/ingredients`, ingredient);
            return response.data;
        } catch (error) {
            console.error('Error creating ingredient:', error);
            throw error;
        }
    },

    async getAllIngredientsByRecipe(recipeId: number): Promise<Ingredient[]> {
        try {
            const response = await axiosInstance.get<Ingredient[]>(`/recipes/${recipeId}/ingredients`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            throw error;
        }
    },

    async getIngredientById(recipeId: number, ingredientId: number): Promise<Ingredient> {
        try {
            const response = await axiosInstance.get<Ingredient>(`/recipes/${recipeId}/ingredients/${ingredientId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ingredient by ID:', error);
            throw error;
        }
    },

    async updateIngredient(recipeId: number, ingredientId: number, ingredientDetails: Ingredient): Promise<Ingredient> {
        try {
            const response = await axiosInstance.put<Ingredient>(`/recipes/${recipeId}/ingredients/${ingredientId}`, ingredientDetails);
            return response.data;
        } catch (error) {
            console.error('Error updating ingredient:', error);
            throw error;
        }
    },

    async deleteIngredient(recipeId: number, ingredientId: number): Promise<string> {
        try {
            const response = await axiosInstance.delete<string>(`/recipes/${recipeId}/ingredients/${ingredientId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            throw error;
        }
    },

    // Nutritional Value section
    async createNutritionalValue(recipeId: number, nutritionalValue: NutritionalValue): Promise<NutritionalValue> {
        try {
            const response = await axiosInstance.post<NutritionalValue>(`/recipes/${recipeId}/nutritionalValues`, nutritionalValue);
            return response.data;
        } catch (error) {
            console.error('Error creating nutritional value:', error);
            throw error;
        }
    },

    async getAllNutritionalValuesByRecipe(recipeId: number): Promise<NutritionalValue[]> {
        try {
            const response = await axiosInstance.get<NutritionalValue[]>(`/recipes/${recipeId}/nutritionalValues`);
            return response.data;
        } catch (error) {
            console.error('Error fetching nutritional values:', error);
            throw error;
        }
    },

    async getNutritionalValueById(recipeId: number, nutritionalValueId: number): Promise<NutritionalValue> {
        try {
            const response = await axiosInstance.get<NutritionalValue>(`/recipes/${recipeId}/nutritionalValues/${nutritionalValueId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching nutritional value by ID:', error);
            throw error;
        }
    },

    async updateNutritionalValue(recipeId: number, nutritionalValueId: number, nutritionalDetails: NutritionalValue): Promise<NutritionalValue> {
        try {
            const response = await axiosInstance.put<NutritionalValue>(`/recipes/${recipeId}/nutritionalValues/${nutritionalValueId}`, nutritionalDetails);
            return response.data;
        } catch (error) {
            console.error('Error updating nutritional value:', error);
            throw error;
        }
    },

    async deleteNutritionalValue(recipeId: number, nutritionalValueId: number): Promise<string> {
        try {
            const response = await axiosInstance.delete<string>(`/recipes/${recipeId}/nutritionalValues/${nutritionalValueId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting nutritional value:', error);
            throw error;
        }
    },

    // Recipe Step section
    async createRecipeStep(recipeId: number, recipeStep: RecipeStep): Promise<RecipeStep> {
        try {
            const response = await axiosInstance.post<RecipeStep>(`/recipes/${recipeId}/steps`, recipeStep);
            return response.data;
        } catch (error) {
            console.error('Error creating recipe step:', error);
            throw error;
        }
    },

    async getAllStepsByRecipe(recipeId: number): Promise<RecipeStep[]> {
        try {
            const response = await axiosInstance.get<RecipeStep[]>(`/recipes/${recipeId}/steps`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe steps:', error);
            throw error;
        }
    },

    async getRecipeStepById(recipeId: number, stepId: number): Promise<RecipeStep> {
        try {
            const response = await axiosInstance.get<RecipeStep>(`/recipes/${recipeId}/steps/${stepId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe step by ID:', error);
            throw error;
        }
    },

    async updateRecipeStep(recipeId: number, stepId: number, stepDetails: RecipeStep): Promise<RecipeStep> {
        try {
            const response = await axiosInstance.put<RecipeStep>(`/recipes/${recipeId}/steps/${stepId}`, stepDetails);
            return response.data;
        } catch (error) {
            console.error('Error updating recipe step:', error);
            throw error;
        }
    },

    async deleteRecipeStep(recipeId: number, stepId: number): Promise<string> {
        try {
            const response = await axiosInstance.delete<string>(`/recipes/${recipeId}/steps/${stepId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting recipe step:', error);
            throw error;
        }
    },
};