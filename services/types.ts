// services/types.ts
export interface User {
    id?: number;
    username: string;
    password: string;
    recipes?: Recipe[];
}

export interface Recipe {
    recipeId?: number;
    user?: User;
    title: string;
    description: string;
    imageUrl: string;
    favorite: boolean;
    time: string;
    sourceUrl: string;
    servings: number;
    portionSize: number;
    ingredients: Ingredient[];
    nutritionalValues: NutritionalValue[];
    steps: RecipeStep[];
    tools: Tool[];
    tags: Tag[];
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

export interface Tag {
    tagId?: number;
    tagType: TagType;
    recipe: Recipe;
}

export enum TagType {
    MEAT = "MEAT",
    FISH = "FISH",
    VEGETARIAN = "VEGETARIAN",
    VEGAN = "VEGAN",
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD",
    APPETIZER = "APPETIZER",
    MAIN_COURSE = "MAIN_COURSE",
    DESSERT = "DESSERT",
    BREAKFAST = "BREAKFAST",
    SOUP = "SOUP",
    CASSEROLE = "CASSEROLE",
    SNACK = "SNACK",
    BEVERAGE = "BEVERAGE",
    LACTOSE_FREE = "LACTOSE_FREE",
    LOW_CARB = "LOW_CARB",
    GLUTEN_FREE = "GLUTEN_FREE",
    PALEO = "PALEO",
    LOW_SUGAR = "LOW_SUGAR",
    CLEAN_EATING = "CLEAN_EATING"
}