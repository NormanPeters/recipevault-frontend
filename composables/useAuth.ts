import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
    const authStore = useAuthStore();

    // Function to decode the JWT payload (Base64 to JSON)
    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the JWT
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-specific chars
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload); // Parse the JSON payload
        } catch (error) {
            console.error('Failed to decode JWT', error);
            return null;
        }
    };

    // Function to check if the JWT is expired
    const isTokenExpired = () => {
        const token = useCookie('jwt').value; // Get JWT from cookie
        if (!token) return true;

        const decoded = decodeToken(token); // Decode the JWT
        if (!decoded || !decoded.exp) return true; // If decoding fails or exp is missing, assume expired

        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        return decoded.exp < currentTime; // Check if token is expired
    };

    // Auto-logout if the token is expired
    const checkTokenExpiration = () => {
        if (isTokenExpired()) {
            authStore.logout(); // Log the user out if the token is expired
        }
    };

    return {
        auth: authStore.user,
        setAuth: authStore.setAuth,
        clearAuth: authStore.clearAuth,
        isAuthenticated: authStore.isAuthenticated,
        login: authStore.login,
        logout: authStore.logout,
        isTokenExpired,       // Expose token expiration check
        checkTokenExpiration, // Expose auto-logout on token expiration
    };
};