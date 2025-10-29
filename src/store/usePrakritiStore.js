import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePrakritiStore = create(
  persist(
    (set) => ({
      prakritiType: null, // vata, pitta, kapha, or combination
      questionnaireAnswers: {},
      doshaScores: {
        vata: 0,
        pitta: 0,
        kapha: 0,
      },
      assessmentDate: null,

      setPrakritiType: (type) => set({ prakritiType: type }),

      updateAnswers: (answers) =>
        set((state) => ({
          questionnaireAnswers: { ...state.questionnaireAnswers, ...answers },
        })),

      setDoshaScores: (scores) =>
        set({
          doshaScores: scores,
          assessmentDate: new Date().toISOString(),
        }),

      resetPrakriti: () =>
        set({
          prakritiType: null,
          questionnaireAnswers: {},
          doshaScores: { vata: 0, pitta: 0, kapha: 0 },
          assessmentDate: null,
        }),
    }),
    {
      name: 'prakriti-storage',
    }
  )
);

export default usePrakritiStore;
