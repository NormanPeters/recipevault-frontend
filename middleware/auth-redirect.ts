// middleware/auth-redirect.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // If the user is NOT authenticated and trying to access any page other than /login, redirect them to /login
    if (!authStore.isAuthenticated.value && to.path !== '/login') {
        return navigateTo('/login');
    }
});