// services/userService.ts
import axiosInstance from './axiosInstance';
import { User } from './interfaces';

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

    // Logout user
    async logout() {
        const response = await axiosInstance.post<string>('/user/logout');
        return response.data; // Optionally, return a success message
    },

    // Get user by ID (with recipes)
    async getUserById(id: number) {
        const response = await axiosInstance.get<User>(`/user/${id}`);
        return response.data;
    },

    // Get all users (with recipes optionally)
    async getAllUsers() {
        const response = await axiosInstance.get<User[]>('/user');
        return response.data;
    },

    // Delete user by username
    async deleteUserByUsername(username: string) {
        const response = await axiosInstance.delete<string>(`/user/${username}`);
        return response.data;
    }
};