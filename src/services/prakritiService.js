import api from './api';

const prakritiService = {
  getQuestionnaire: async () => {
    try {
      const response = await api.get('/prakriti/questionnaire');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  submitQuestionnaire: async (answers) => {
    try {
      const response = await api.post('/prakriti/assess', answers);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPrakritiResult: async (userId) => {
    try {
      const response = await api.get(`/prakriti/result/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  calculateDosha: (answers) => {
    // Local calculation logic based on Namayush questionnaire
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    Object.values(answers).forEach((answer) => {
      if (answer.dosha) {
        scores[answer.dosha] += answer.weight || 1;
      }
    });

    return scores;
  },

  determinePrakriti: (scores) => {
    const total = scores.vata + scores.pitta + scores.kapha;
    const percentages = {
      vata: (scores.vata / total) * 100,
      pitta: (scores.pitta / total) * 100,
      kapha: (scores.kapha / total) * 100,
    };

    const dominant = Object.keys(percentages).reduce((a, b) =>
      percentages[a] > percentages[b] ? a : b
    );

    // Check for dual dosha (if two doshas are close)
    const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] - sorted[1][1] < 10) {
      return `${sorted[0][0]}-${sorted[1][0]}`;
    }

    return dominant;
  },
};

export default prakritiService;
