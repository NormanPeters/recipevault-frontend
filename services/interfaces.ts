// services/interfaces.ts
interface User {
    id: number;
    username: string;
    recipes: Recipe[];
}

interface Recipe {
    recipeId: number;
    user: User;
    imageUrl: string;
    title: string;
    description: string;
    isFavourite: boolean;
    ingredients: Ingredient[];
    nutritionalValues: NutritionalValue[];
    steps: RecipeStep[];
}

interface Ingredient {
    ingredientId: number;
    title: string;
    amount: number;
    unit: string;
    recipe: Recipe;
}

interface NutritionalValue {
    nutritionalValueId: number;
    title: string;
    amount: number;
    recipe: Recipe;
}

interface RecipeStep {
    stepId: number;
    stepDescription: string;
    stepNumber: number;
    recipe: Recipe;
}
