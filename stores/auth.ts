// stores/auth.ts
import { defineStore } from 'pinia';
import { api } from '~/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: import.meta.client ? localStorage.getItem('jwtToken') as string | null : null,
        username: import.meta.client ? localStorage.getItem('username') as string | null : null,
    }),
    actions: {
        setToken(token: string, username: string) {
            this.token = token;
            this.username = username;
            if (import.meta.client) {
                localStorage.setItem('jwtToken', token); // Store the token in localStorage
                localStorage.setItem('username', username); // Store the username in localStorage
            }
        },
        clearAuth() {
            this.token = null;
            this.username = null;
            if (import.meta.client) {
                localStorage.removeItem('jwtToken'); // Remove the token from localStorage
                localStorage.removeItem('username'); // Remove the username from localStorage
            }
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