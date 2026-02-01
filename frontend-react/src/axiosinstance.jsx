import axios from "axios";

const isDevelopment = import.meta.env.MODE === 'development';
const devBase = import.meta.env.VITE_BACKEND_BASE_API ?? 'http://127.0.0.1:8000/api/v1';
const prodBase = import.meta.env.VITE_BACKEND_BASE_API_DEPLOY ?? 'https://stocksight-gp5w.onrender.com/api/v1';
const baseURL = isDevelopment ? devBase : prodBase;
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})


// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){
            const accessToken = localStorage.getItem('access_token')
            if(accessToken){
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    // Handle failed responses
    async function(error){
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem('refresh_token')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                localStorage.setItem('access_token', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;