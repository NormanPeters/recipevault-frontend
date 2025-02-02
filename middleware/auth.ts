import { decodeJwt } from 'jose';

export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        try {
            // Decode the token payload
            const decodedToken = decodeJwt(token);

            if (!decodedToken || typeof decodedToken.exp === 'undefined') {
                throw new Error('Invalid token structure');
            }

            const currentTime = Date.now() / 1000; // Current time in seconds

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
