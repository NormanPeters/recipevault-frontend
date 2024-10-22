// composables/useRecipe.ts
import { Ref } from 'vue';
import { Recipe } from '~/services/types';

export function useRecipe(recipe: Ref<Recipe>) {
    const addIngredient = () => {
        if (!recipe.value.ingredients) {
            recipe.value.ingredients = [];
        }
        recipe.value.ingredients.push({ title: '', amount: 0, unit: 'g', recipe: {} as Recipe });
    };

    const removeIngredient = (index: number) => {
        if (recipe.value.ingredients) {
            recipe.value.ingredients.splice(index, 1);
        }
    };

    const addTool = () => {
        if (!recipe.value.tools) {
            recipe.value.tools = [];
        }
        recipe.value.tools.push({ title: '', amount: 0, recipe: {} as Recipe });
    };

    const removeTool = (index: number) => {
        if (recipe.value.tools) {
            recipe.value.tools.splice(index, 1);
        }
    };

    const addStep = () => {
        if (!recipe.value.steps) {
            recipe.value.steps = [];
        }
        recipe.value.steps.push({ stepDescription: '', stepNumber: 0, recipe: {} as Recipe });
    };

    const removeStep = (index: number) => {
        if (recipe.value.steps) {
            recipe.value.steps.splice(index, 1);
        }
    };

    const addNutritionalValue = () => {
        if (!recipe.value.nutritionalValues) {
            recipe.value.nutritionalValues = [];
        }
        recipe.value.nutritionalValues.push({ title: '', amount: 0, recipe: {} as Recipe });
    };

    const removeNutritionalValue = (index: number) => {
        if (recipe.value.nutritionalValues) {
            recipe.value.nutritionalValues.splice(index, 1);
        }
    };

    return {
        addIngredient,
        removeIngredient,
        addTool,
        removeTool,
        addStep,
        removeStep,
        addNutritionalValue,
        removeNutritionalValue,
    };
}
