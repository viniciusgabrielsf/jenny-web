import { create } from 'zustand';

type User = {
  id: string;
  fullName: string;
  email: string;
  birthDate: Date;
  avatar?: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
