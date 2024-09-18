// composables/useAuth.ts
export const useAuth = () => {
    const auth = useState('auth', () => null);

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