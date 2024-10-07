// services/userService.ts
import axiosInstance from './axiosInstance';
import {User} from './interfaces';

export const userService = {
    // Register a new user
    async register(user: User) {
        const response = await axiosInstance.post<User>('/user/register', user);
        return response.data;
    },

    // Login user
    async login(user: User) {
        const response = await axiosInstance.post<{ token: string }>('/user/login', user);
        return response.data.token; // Will return JWT token
    },
};