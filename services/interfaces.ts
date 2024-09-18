// services/interfaces.ts
export interface User {
    id?: number;
    username: string;
    password?: string;
    recipes?: Recipe[];
}

export interface Recipe {
    id: number;
    title: string;
    description: string;
    user: User;
}
