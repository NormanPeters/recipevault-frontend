// services/interfaces.ts

// Recipe interface (simplified based on what is likely to be in a Recipe entity)
export interface Recipe {
    id: number;
    title: string;
    description: string;
    user: User; // This is the user who created the recipe
}

// User interface adjusted based on your Java entity
export interface User {
    id?: number; // optional because it might not be set when creating a new user
    username: string;
    password?: string; // password can be omitted in some cases (e.g., when listing users)
    recipes?: Recipe[]; // optional, since recipes might not always be loaded
}