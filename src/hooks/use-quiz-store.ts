
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { quizzes as initialQuizzes, Quiz } from '@/lib/quiz-data';

interface QuizState {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizzes: initialQuizzes,
      addQuiz: (quiz) => {
        set((state) => ({
          quizzes: [...state.quizzes, quiz],
        }));
      },
    }),
    {
      name: 'quiz-storage',
    }
  )
);
