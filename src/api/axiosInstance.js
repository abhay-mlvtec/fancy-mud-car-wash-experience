import axios from 'axios';

const API = axios.create({
    baseURL: "https://fancy-mud-car-wash-backend.onrender.com/api", 
    headers: {
     "Content-Type": "application/json",
    },
});

// Attach JWT token automatically if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
