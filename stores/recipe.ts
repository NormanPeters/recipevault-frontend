// stores/recipe.ts
import {defineStore} from 'pinia';
import {api} from '~/services/api';
import {Recipe} from '~/services/types';

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
        async deleteRecipe(id: number) {
            try {
                const response = await api.deleteRecipe(id);
                if (response) {
                    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
                } else {
                    console.warn('Failed to delete recipe');
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);
                throw error;
            }
        },
        async updateRecipe(id: number, updatedRecipe: Recipe) {
            try {
                const response = await api.updateRecipe(id, updatedRecipe);
                if (response) {
                    const index = this.recipes.findIndex(recipe => recipe.id === id);
                    if (index !== -1) {
                        this.recipes[index] = updatedRecipe;
                    }
                } else {
                    console.warn('Failed to update recipe');
                }
            } catch (error) {
                console.error('Error updating recipe:', error);
                throw error;
            }
        },
        clearSelectedRecipe() {
            this.selectedRecipe = null;
        }
    },
    getters: {
        getRecipes: (state) => state.recipes,
        getSelectedRecipe: (state) => state.selectedRecipe,
    },
});