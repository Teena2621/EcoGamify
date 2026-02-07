 import { create } from 'zustand';

interface UserState {
  userId: string | null;
  role: 'student' | 'lecturer' | null;
  setUserId: (id: string) => void;
  setRole: (role: 'student' | 'lecturer') => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  role: null,
  setUserId: (id) => set({ userId: id }),
  setRole: (role) => set({ role }),
}));
