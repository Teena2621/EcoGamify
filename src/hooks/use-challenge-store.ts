
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Challenge = {
  id: string;
  question: string;
  xp: number;
};

type Submission = {
  challengeId: string;
  studentName: string;
  answer: string;
  submittedAt: Date;
}

interface ChallengeState {
  challenges: Challenge[];
  submissions: Submission[];
  addChallenge: (question: string) => void;
  submitAnswer: (challengeId: string, answer: string, studentName: string) => void;
}

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set, get) => ({
      challenges: [
        {
          id: 'challenge-1',
          question: 'What are three simple habits you can adopt this week to reduce your personal water consumption at home?',
          xp: 50,
        },
      ],
      submissions: [],
      addChallenge: (question) => {
        const newChallenge: Challenge = {
          id: `challenge-${get().challenges.length + 1}`,
          question,
          xp: Math.floor(Math.random() * 50) + 50, // Random XP between 50 and 100
        };
        set((state) => ({
          challenges: [...state.challenges, newChallenge],
        }));
      },
      submitAnswer: (challengeId, answer, studentName) => {
        const newSubmission: Submission = {
          challengeId,
          studentName,
          answer,
          submittedAt: new Date(),
        };
        set(state => ({
          submissions: [newSubmission, ...state.submissions]
        }));
        console.log(`Answer for challenge ${challengeId} from ${studentName}: ${answer}`);
      },
    }),
    {
      name: 'challenge-storage', // unique name for localStorage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            ...state,
            submissions: state.submissions.map((s: any) => ({
              ...s,
              submittedAt: new Date(s.submittedAt),
            })),
          };
        },
        setItem: (name, newValue: any) => {
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              submissions: newValue.state.submissions.map((s: any) => ({
                ...s,
                submittedAt: s.submittedAt.toISOString(),
              })),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      }
    }
  )
);
