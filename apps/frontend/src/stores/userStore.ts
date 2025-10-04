import { create } from 'zustand';
import { userService, User, UpdateUserData } from '../services/user';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  updateUser: (data: UpdateUserData) => Promise<void>;
  deleteUser: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const user = await userService.getUser();
      set({ user, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Fehler beim Laden',
        loading: false,
      });
    }
  },

  updateUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await userService.updateUser(data);
      set({ user, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Fehler beim Speichern',
        loading: false,
      });
      throw error;
    }
  },

  deleteUser: async () => {
    set({ loading: true, error: null });
    try {
      await userService.deleteUser();
      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Fehler beim Löschen',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
