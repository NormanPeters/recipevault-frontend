// stores/auth.global.ts
import {defineStore} from 'pinia';
import {useCookie} from '#app';
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {userService} from '~/services/userService';

// Define types for login credentials and auth data
interface LoginCredentials {
    username: string;
    password: string;
}

interface AuthData {
    token: string;
}

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();

    // Define the type of token as string | null
    const token = useCookie<string | null>('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
    });

    // isAuthenticated checks if the JWT cookie exists
    const isAuthenticated = computed<boolean>(() => {
        return !!token.value; // Return true if token exists
    });

    // Function to handle user login
    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            const response = await userService.login(credentials);
            setAuth({ token: response }); // Set the JWT token after login
            await router.push('/'); // Redirect to home after login
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    // Set the JWT token
    const setAuth = (authData: AuthData): void => {
        token.value = authData.token;
    };

    // Clear authentication (remove token)
    const clearAuth = (): void => {
        token.value = null;
    };

    // Clear JWT cookie manually (on logout)
    const clearJwtCookie = (): void => {
        document.cookie = 'jwt=; Max-Age=0; path=/; Secure; SameSite=None;';
    };

    // Function to handle user logout
    const logout = async (): Promise<void> => {
        try {
            await userService.logout();
            clearJwtCookie(); // Clear the JWT cookie
            clearAuth(); // Clear the token in memory
            await router.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        token,
        isAuthenticated,
        setAuth,
        clearAuth,
        login,
        logout,
    };
});