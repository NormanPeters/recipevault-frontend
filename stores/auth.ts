// stores/auth.ts
import { defineStore } from 'pinia';
import { api } from '~/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        username: null as string | null,
    }),
    actions: {
        setToken(token: string, username: string) {
            this.token = token;
            this.username = username;
        },
        clearAuth() {
            this.token = null;
            this.username = null;
        },

        async login(username: string, password: string) {
            try {
                const token = await api.login({ username, password });
                this.setToken(token, username);
                console.log('Login successful');
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },

        logout() {
            this.clearAuth(); // Clear both token and username
            console.log('Logout successful');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
    },
});