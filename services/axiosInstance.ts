// services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Deine Backend-URL
    withCredentials: true,  // Stellt sicher, dass Cookies automatisch gesendet werden
});

export default axiosInstance;