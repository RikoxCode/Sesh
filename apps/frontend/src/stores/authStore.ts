import { create } from 'zustand';
import { authService } from '../services/auth';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('sesh_token'),
  token: localStorage.getItem('sesh_token'),

  async login(email, password) {
    const token = await authService.login(email, password);
    localStorage.setItem('sesh_token', token);
    set({ isAuthenticated: true, token });
  },

  logout() {
    localStorage.removeItem('sesh_token');
    set({ isAuthenticated: false, token: null });
    window.location.href = '/login';
  },
}));
