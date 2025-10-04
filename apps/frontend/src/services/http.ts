export const http = {
  async get<T = unknown>(path: string, init?: RequestInit): Promise<T> {
    const base = import.meta.env.VITE_API_URL ?? ''
    const token = localStorage.getItem('sesh_token')

    const res = await fetch(base + path, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
      ...init,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `Request failed: ${res.status}`)
    }
    return (await res.json()) as T
  },
  async post<T = unknown>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const base = import.meta.env.VITE_API_URL ?? ''
    const token = localStorage.getItem('sesh_token')

    const res = await fetch(base + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
      body: JSON.stringify(body ?? {}),
      ...init,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `Request failed: ${res.status}`)
    }
    return (await res.json()) as T
  },
}