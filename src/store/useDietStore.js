import { create } from 'zustand';

const useDietStore = create((set) => ({
  currentDietPlan: null,
  foodLogs: [],
  nutritionData: null,
  seasonalRecommendations: [],

  setDietPlan: (plan) => set({ currentDietPlan: plan }),

  addFoodLog: (log) =>
    set((state) => ({
      foodLogs: [...state.foodLogs, { ...log, id: Date.now() }],
    })),

  updateFoodLog: (id, updatedLog) =>
    set((state) => ({
      foodLogs: state.foodLogs.map((log) =>
        log.id === id ? { ...log, ...updatedLog } : log
      ),
    })),

  deleteFoodLog: (id) =>
    set((state) => ({
      foodLogs: state.foodLogs.filter((log) => log.id !== id),
    })),

  setNutritionData: (data) => set({ nutritionData: data }),

  setSeasonalRecommendations: (recommendations) =>
    set({ seasonalRecommendations: recommendations }),

  clearDietData: () =>
    set({
      currentDietPlan: null,
      foodLogs: [],
      nutritionData: null,
      seasonalRecommendations: [],
    }),
}));

export default useDietStore;
