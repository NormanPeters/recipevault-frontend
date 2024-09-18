// stores/auth.ts
import { defineStore } from 'pinia';
import { useCookie } from '#app';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userService } from '~/services/userService';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();

    const token = useCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);

    const setAuth = (authData: { token: string; user: any }) => {
        token.value = authData.token;
        user.value = authData.user;
    };

    const clearAuth = () => {
        token.value = null;
        user.value = null;
    };

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await userService.login(credentials);
            setAuth(response);
            await router.push('/');
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            clearAuth();
            // Optionally, make an API call to invalidate the token server-side
            await router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        token,
        user,
        isAuthenticated,
        setAuth,
        clearAuth,
        login,
        logout,
    };
});