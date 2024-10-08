// stores/recipe.ts
import { defineStore } from 'pinia';
import { api } from '~/services/api';
import { Recipe } from '~/services/types';
import { useAuthStore } from './auth';

export const useRecipeStore = defineStore('recipe', {
    state: () => ({
        recipes: [] as Recipe[],
        selectedRecipe: null as Recipe | null,
    }),
    actions: {
        async fetchRecipes() {
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                try {
                    this.recipes = await api.getRecipesByUserId();
                    console.log('Recipes fetched:', this.recipes);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                    throw error;
                }
            } else {
                console.warn('User is not authenticated. Cannot fetch recipes.');
            }
        },
        async fetchRecipeById(id: number) {
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                try {
                    this.selectedRecipe = await api.getRecipeById(id);
                } catch (error) {
                    console.error('Error fetching recipe by ID:', error);
                    throw error;
                }
            } else {
                console.warn('User is not authenticated. Cannot fetch recipe.');
            }
        },
        async createRecipe(recipe: Recipe) {
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                try {
                    const newRecipe = await api.createRecipe(recipe);
                    this.recipes.push(newRecipe);
                } catch (error) {
                    console.error('Error creating recipe:', error);
                    throw error;
                }
            } else {
                console.warn('User is not authenticated. Cannot create recipe.');
            }
        },
    },
    getters: {
        getRecipes: (state) => state.recipes,
        getSelectedRecipe: (state) => state.selectedRecipe,
    },
});