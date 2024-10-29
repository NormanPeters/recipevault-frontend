// middleware/auth.ts
import jwtDecode from 'jwt-decode';

export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            const decodedToken = (jwtDecode as any)(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('authToken');
                console.log('Token expired');
                return navigateTo('/login');
            }
        } catch (error) {
            localStorage.removeItem('authToken');
            console.error('Error decoding token:', error);
            return navigateTo('/login');
        }
    } else if (to.name !== 'login') {
        console.log('No token found');
        return navigateTo('/login');
    }
});