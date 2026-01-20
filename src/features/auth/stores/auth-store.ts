import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
}));
