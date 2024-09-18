// composables/useAuth.ts
import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
    const authStore = useAuthStore();

    return {
        auth: authStore.user,
        setAuth: authStore.setAuth,
        clearAuth: authStore.clearAuth,
        isAuthenticated: authStore.isAuthenticated,
        login: authStore.login,
        logout: authStore.logout,
    };
};