
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SignupFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role?: "student" | "lecturer";
  address: string;
  city: string;
  country: string;
  email: string;
  otp: string;
}

interface SignupState {
  formData: SignupFormData;
  setData: (data: Partial<SignupFormData>) => void;
  reset: () => void;
}

const initialState: SignupFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: undefined,
  address: '',
  city: '',
  country: '',
  email: '',
  otp: '',
};

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      formData: initialState,
      setData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      reset: () => set({ formData: initialState }),
    }),
    {
      name: 'signup-storage-v2', // New key to clear old storage
    }
  )
);
