
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Notification = {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (message: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (message) => {
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          message,
          read: false,
          createdAt: new Date(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
    }),
    {
      name: 'notification-storage',
       // We need to properly serialize and deserialize Date objects
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            ...state,
            notifications: state.notifications.map((n: any) => ({
              ...n,
              createdAt: new Date(n.createdAt),
            })),
          };
        },
        setItem: (name, newValue: any) => {
          // custom serialization logic
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              notifications: newValue.state.notifications.map((n: any) => ({
                ...n,
                createdAt: n.createdAt.toISOString(),
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
