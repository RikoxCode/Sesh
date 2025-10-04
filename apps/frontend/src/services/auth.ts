import { http } from './http';

type LoginResponse = {
  token: string;
};

export const authService = {
  async login(email: string, password: string): Promise<string> {
    try {
      const res = await http.post<LoginResponse>('/api/login', { email, password });
      return res.token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Login fehlgeschlagen');
      }
      throw new Error('Login fehlgeschlagen');
    }
  },

  async logout(): Promise<void> {
    await http.post('/api/logout');
    return;
  },
};
