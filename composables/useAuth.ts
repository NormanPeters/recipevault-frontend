// composables/useAuth.ts
export const useAuth = () => {
    const auth = useState('auth', () => null); // Initialwert für den Benutzer

    const setAuth = (user) => {
        auth.value = user;
    };

    const isAuthenticated = () => {
        return !!auth.value;
    };

    return {
        auth,
        setAuth,
        isAuthenticated,
    };
};