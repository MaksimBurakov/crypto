import { create } from 'zustand';
import { fakeRequest } from '../api/fakeRequest';

interface AuthState {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLogged: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user'),
  isLogged: !!localStorage.getItem('user'),

  login: async (email) => {
    try {
      await fakeRequest(true);
      localStorage.setItem('user', email);
      set({ user: email, isLogged: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },

  logout: async () => {
    try {
      await fakeRequest(true);
      localStorage.removeItem('user');
      set({ user: null, isLogged: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));
