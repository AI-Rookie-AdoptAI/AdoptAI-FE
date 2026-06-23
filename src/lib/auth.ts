import type { AuthTokens, LoginRequest, SignupRequest, User } from "./types";
import { API_BASE_URL } from "./constants";

const ACCESS_TOKEN_KEY = "adopt_access_token";
const REFRESH_TOKEN_KEY = "adopt_refresh_token";

// ─── Token storage (cookies for middleware access) ────────────────────────────

export function saveTokens(tokens: AuthTokens) {
  const maxAge = tokens.expiresIn;
  document.cookie = `${ACCESS_TOKEN_KEY}=${tokens.accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `${REFRESH_TOKEN_KEY}=${tokens.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function clearTokens() {
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
  document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0`;
}

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${ACCESS_TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function authFetch<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { detail?: string }).detail ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Auth API calls ───────────────────────────────────────────────────────────

export async function apiLogin(data: LoginRequest): Promise<{ tokens: AuthTokens; user: User }> {
  const raw = await authFetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: { id: string; email: string; name: string; created_at: string };
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: data.email, password: data.password }),
  });

  return {
    tokens: {
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      expiresIn: raw.expires_in,
    },
    user: {
      id: raw.user.id,
      email: raw.user.email,
      name: raw.user.name,
      createdAt: raw.user.created_at,
    },
  };
}

export async function apiSignup(data: SignupRequest): Promise<{ tokens: AuthTokens; user: User }> {
  const raw = await authFetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: { id: string; email: string; name: string; created_at: string };
  }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email: data.email, password: data.password, name: data.name }),
  });

  return {
    tokens: {
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      expiresIn: raw.expires_in,
    },
    user: {
      id: raw.user.id,
      email: raw.user.email,
      name: raw.user.name,
      createdAt: raw.user.created_at,
    },
  };
}

export async function apiRefreshToken(refreshToken: string): Promise<AuthTokens> {
  const raw = await authFetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  return {
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
    expiresIn: raw.expires_in,
  };
}

export async function apiGetMe(accessToken: string): Promise<User> {
  const raw = await authFetch<{
    id: string;
    email: string;
    name: string;
    created_at: string;
  }>("/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return { id: raw.id, email: raw.email, name: raw.name, createdAt: raw.created_at };
}

export async function apiLogout(accessToken: string): Promise<void> {
  await authFetch("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).catch(() => {});
}
