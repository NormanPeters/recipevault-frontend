// services/axiosInstance.ts
import axios from 'axios';
import { useAuthStore } from '~/stores/auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

// Interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        // Include the JWT token in the Authorization header
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;