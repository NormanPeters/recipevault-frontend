// composables/useRecipe.ts
import {Recipe} from '~/services/types';

export function useRecipe() {
    const measurementUnits = ['', 'g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'piece'];

    const addIngredient = (recipe: Recipe) => {
        if (!recipe.ingredients) {
            recipe.ingredients = [];
        }
        recipe.ingredients.push({ title: '', amount: 0, unit: 'g', recipe: {} as Recipe });
    };

    const removeIngredient = (recipe: Recipe, index: number) => {
        if (recipe.ingredients) {
            recipe.ingredients.splice(index, 1);
        }
    };

    const addNutritionalValue = (recipe: Recipe) => {
        if (!recipe.nutritionalValues) {
            recipe.nutritionalValues = [];
        }
        recipe.nutritionalValues.push({ title: '', amount: 0, recipe: {} as Recipe });
    };

    const removeNutritionalValue = (recipe: Recipe, index: number) => {
        if (recipe.nutritionalValues) {
            recipe.nutritionalValues.splice(index, 1);
        }
    };

    const addTool = (recipe: Recipe) => {
        if (!recipe.tools) {
            recipe.tools = [];
        }
        recipe.tools.push({ title: '', amount: 0, recipe: {} as Recipe });
    };

    const removeTool = (recipe: Recipe, index: number) => {
        if (recipe.tools) {
            recipe.tools.splice(index, 1);
        }
    };

    const addStep = (recipe: Recipe) => {
        if (!recipe.steps) {
            recipe.steps = [];
        }
        recipe.steps.push({ stepDescription: '', stepNumber: 0, recipe: {} as Recipe });
    };

    const removeStep = (recipe: Recipe, index: number) => {
        if (recipe.steps) {
            recipe.steps.splice(index, 1);
        }
    };

    return {
        measurementUnits,
        addIngredient,
        removeIngredient,
        addNutritionalValue,
        removeNutritionalValue,
        addTool,
        removeTool,
        addStep,
        removeStep,
    };
}