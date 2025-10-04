type ErrorResponse = {
  message?: string;
  error?: string;
};

export const http = {
  async get<T = unknown>(path: string, init?: RequestInit): Promise<T> {
    const base = import.meta.env.VITE_API_URL ?? '';
    const token = localStorage.getItem('sesh_token');

    const res = await fetch(base + path, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
      ...init,
    });

    if (!res.ok) {
      await handleErrorResponse(res);
    }

    return (await res.json()) as T;
  },

  async post<T = unknown>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const base = import.meta.env.VITE_API_URL ?? '';
    const token = localStorage.getItem('sesh_token');

    const res = await fetch(base + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
      body: JSON.stringify(body ?? {}),
      ...init,
    });

    if (!res.ok) {
      await handleErrorResponse(res);
    }

    return (await res.json()) as T;
  },
};

async function handleErrorResponse(res: Response): Promise<never> {
  let errorMessage = `Request failed: ${res.status}`;

  try {
    const data = (await res.json()) as ErrorResponse;
    errorMessage = data.message || data.error || errorMessage;
  } catch {
    try {
      const text = await res.text();
      if (text) errorMessage = text;
    } catch {
      // Fallback zur Standard-Fehlermeldung
    }
  }

  if (res.status === 401) {
    localStorage.removeItem('sesh_token');
    window.location.href = '/login';
  }

  throw new Error(errorMessage);
}
