const clientBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:13001';
const serverBaseUrl = process.env.API_URL ?? clientBaseUrl;

export function apiBaseUrl() {
  return typeof window === 'undefined' ? serverBaseUrl : clientBaseUrl;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = `API lỗi ${response.status}`;
    try {
      const body = await response.json();
      message = Array.isArray(body.message) ? body.message.join(', ') : body.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function formatScore(score?: number | null) {
  if (score === null || score === undefined) return 'Chưa có';
  return score.toFixed(2);
}

export function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ');
}
