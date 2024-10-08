// stores/recipe.ts
import { defineStore } from 'pinia';
import { api } from '~/services/api';
import { Recipe } from '~/services/types';

export const useRecipeStore = defineStore('recipe', {
    state: () => ({
        recipes: [] as Recipe[],
        selectedRecipe: null as Recipe | null,
    }),
    actions: {
        async fetchRecipes() {
            try {
                const response = await api.getRecipesByUserId();
                if (response && Array.isArray(response)) {
                    this.recipes = response;
                    console.log('Recipes fetched:', this.recipes);
                } else {
                    console.warn('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
                // You can handle errors more gracefully here, like showing a user-friendly message
                throw error;
            }
        },
        async fetchRecipeById(id: number) {
            try {
                const recipe = await api.getRecipeById(id);
                if (recipe) {
                    this.selectedRecipe = recipe;
                } else {
                    console.warn('Recipe not found:', id);
                }
            } catch (error) {
                console.error('Error fetching recipe by ID:', error);
                throw error;
            }
        },
        async createRecipe(recipe: Recipe) {
            try {
                const newRecipe = await api.createRecipe(recipe);
                if (newRecipe) {
                    this.recipes.push(newRecipe);
                } else {
                    console.warn('Failed to create recipe');
                }
            } catch (error) {
                console.error('Error creating recipe:', error);
                throw error;
            }
        },
    },
    getters: {
        getRecipes: (state) => state.recipes,
        getSelectedRecipe: (state) => state.selectedRecipe,
    },
});