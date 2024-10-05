// middleware/auth.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // If the user is NOT authenticated and trying to access any page other than /login, redirect to /login
    if (!authStore.isAuthenticated && to.path !== '/login') {
        return navigateTo('/login');
    }

    // If the user is authenticated and tries to access /login, redirect to the home page
    if (authStore.isAuthenticated && to.path === '/login') {
        return navigateTo('/');
    }
});