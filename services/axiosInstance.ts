// services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        // 'http://localhost:8080/api',
        'https://recipevault-backend.onrender.com/api',
    withCredentials: true,
});

// Interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        // Include the JWT token in the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;