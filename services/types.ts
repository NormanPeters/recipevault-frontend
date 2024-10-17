// services/types.ts
export interface User {
    id: number;
    username: string;
    recipes: Recipe[];
}

export interface Recipe {
    recipeId?: number;
    user?: User;
    title?: string;
    description?: string;
    imageUrl?: string;
    isFavourite?: boolean;
    time?: string;
    sourceUrl?: string;
    servings?: number;
    portionSize?: number;
    ingredients?: Ingredient[];
    nutritionalValues?: NutritionalValue[];
    steps?: RecipeStep[];
    tools?: Tool[];
}

export interface Ingredient {
    ingredientId?: number;
    title: string;
    amount: number;
    unit: string;
    recipe: Recipe;
}

export interface NutritionalValue {
    nutritionalValueId?: number;
    title: string;
    amount: number;
    recipe: Recipe;
}

export interface RecipeStep {
    stepId?: number;
    stepDescription: string;
    stepNumber: number;
    recipe: Recipe;
}

export interface Tool {
    toolId?: number;
    title: string;
    amount: number;
    recipe: Recipe;
}
