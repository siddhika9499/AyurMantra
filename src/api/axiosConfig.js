import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Dosha Scores
  getDoshaScores: () => axiosInstance.get('/dosha-scores'),
  updateDoshaScores: (scores) => axiosInstance.post('/dosha-scores', scores),

  // User Profile
  getUserProfile: () => axiosInstance.get('/profile'),
  updateUserProfile: (profile) => axiosInstance.put('/profile', profile),

  // Food Tracking
  getFoodTracking: () => axiosInstance.get('/food-tracking'),
  addMeal: (meal) => axiosInstance.post('/food-tracking/meal', meal),
  getMealSuggestions: () => axiosInstance.get('/food-tracking/suggestions'),

  // Questions/Assessment
  getQuestions: () => axiosInstance.get('/questions'),
  submitAnswers: (answers) => axiosInstance.post('/questions/submit', answers),
};

export default axiosInstance;
