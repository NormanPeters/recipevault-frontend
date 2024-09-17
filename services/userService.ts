// services/userService.ts
import axiosInstance from './axiosInstance';
import { User, Recipe } from './interfaces';

export const userService = {
    // Register a new user
    async register(user: User) {
        const response = await axiosInstance.post<User>('/user/register', user);
        return response.data;
    },

    // Login user
    async login(user: User) {
        const response = await axiosInstance.post<string>('/user/login', user);
        return response.data; // Will either return JWT token or "fail"
    },

    // Get user by ID (with recipes)
    async getUserById(id: number) {
        const response = await axiosInstance.get<User>(`/${id}`);
        return response.data;
    },

    // Get all users (with recipes optionally)
    async getAllUsers() {
        const response = await axiosInstance.get<User[]>('/');
        return response.data;
    },

    // Delete user by username
    async deleteUserByUsername(username: string) {
        const response = await axiosInstance.delete<string>(`/${username}`);
        return response.data;
    }
};