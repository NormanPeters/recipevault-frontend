// stores/auth.ts
import { defineStore } from 'pinia';
import { userService } from '@/services/userService'; // Import your userService

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        clearToken() {
            this.token = null; // Clear the token
        },

        async login(username: string, password: string) {
            try {
                const token = await userService.login({ username, password });
                this.setToken(token);

                console.log('Login successful');
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },

        logout() {
            this.clearToken();
            console.log('Logout successful');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token, // Check if the user is authenticated
        getToken: (state) => state.token, // Get the token
    },
});