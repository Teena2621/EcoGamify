
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { libraryResources as initialResources, LibraryResource } from '@/lib/library-data';

interface LibraryState {
  resources: LibraryResource[];
  addResource: (resource: LibraryResource) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      resources: initialResources,
      addResource: (resource) => {
        set((state) => ({
          resources: [...state.resources, resource],
        }));
      },
    }),
    {
      name: 'library-storage',
    }
  )
);
