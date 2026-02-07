
'use client';

import { create } from 'zustand';

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isSidebarOpen: true, // Set to true by default
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
