

// src/axiosInstance.ts
import axios from 'axios';
const BaseURL = 'http://localhost:4000/api' ;
const axiosInstance = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


const getToken = (): string => {
  // Simulating getting a token from local storage
  // Replace this with your actual logic to retrieve the token
  return localStorage.getItem('authToken') || '';
};
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {

    config.headers.Authorization = `Bearer ${localStorage.getItem('accesstoken')}`;
      
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    
    console.log("res",response)
    return response;
  },
  async(error) => {
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

