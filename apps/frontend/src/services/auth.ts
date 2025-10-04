import { http } from './http'

type LoginResponse = { token: string }

export const authService = {
  async login(email: string, password: string): Promise<string> {
    // Später aktivieren:
    // const res = await http.post<LoginResponse>('/auth/login', { email, password })
    // return res.token

    // Mock
    await new Promise((r) => setTimeout(r, 600))
    if (email.length <= 3 || password.length <= 3) throw new Error('Invalid credentials')
    return 'dev-token'
  },
  async logout(): Promise<void> {
    // Optional: http.post('/auth/logout') wenn Backend Logout verlangt
    return
  },
}