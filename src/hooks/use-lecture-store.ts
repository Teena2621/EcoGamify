 'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

export type Lecture = {
  id: string;
  title: string;
  url: string;
  required_points: number;
  reward_points: number;
  progress?: number;
  xp?: number;
  doubts?: any[];
};

type LectureStore = {
  lectures: Lecture[];
  fetchLectures: (userId: string) => Promise<void>;
};

export const useLectureStore = create<LectureStore>((set) => ({
  lectures: [],
  fetchLectures: async (userId: string) => {
    try {
      const res = await fetch(`/api/videos?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.videos) {
        const lectures = data.videos.map((v: any) => ({
          id: v.id.toString(),
          title: v.title,
          url: v.url,
          required_points: v.required_points,
          reward_points: v.reward_points,
          progress: 0, // you can update this with actual progress later
          xp: v.reward_points,
          doubts: [],
        }));
        set({ lectures });
      } else {
        console.error('Failed to fetch lectures', data.error);
      }
    } catch (err) {
      console.error('Error fetching lectures', err);
    }
  },
}));
