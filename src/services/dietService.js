import api from './api';

const dietService = {
  getDietPlan: async (userId) => {
    try {
      const response = await api.get(`/diet/plan/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  generateDietPlan: async (prakritiData) => {
    try {
      const response = await api.post('/diet/generate', prakritiData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getFoodLogs: async (userId, date) => {
    try {
      const response = await api.get(`/diet/food-logs/${userId}`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addFoodLog: async (foodData) => {
    try {
      const response = await api.post('/diet/food-logs', foodData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  analyzeFoodImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post('/diet/analyze-food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getNutritionData: async (foodItem) => {
    try {
      const response = await api.get(`/diet/nutrition/${foodItem}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getSeasonalRecommendations: async (location) => {
    try {
      const response = await api.get('/diet/seasonal-recommendations', {
        params: { location },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default dietService;
