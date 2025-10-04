import { http } from './http';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type UpdateUserData = {
  first_name: string;
  last_name: string;
  email: string;
};

export const userService = {
  async getUser(): Promise<User> {
    return await http.get<User>('/api/user');
  },

  async updateUser(data: UpdateUserData): Promise<User> {
    return await http.put<User>('/api/user', data);
  },

  async deleteUser(): Promise<void> {
    await http.delete('/api/user');
  },
};
