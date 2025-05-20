import { create } from 'zustand';

interface AuthState {
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLogged: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user'),
  isLogged: !!localStorage.getItem('user'),

  login: (email) => {
    localStorage.setItem('user', email);
    set({ user: email, isLogged: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isLogged: false });
  },
}));
