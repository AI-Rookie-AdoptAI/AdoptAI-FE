"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User, LoginRequest, SignupRequest } from "./types";
import {
  apiLogin,
  apiLogout,
  apiSignup,
  clearTokens,
  getAccessToken,
  saveTokens,
} from "./auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Restore session on mount
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }
    // Token exists in cookie → trust it until first 401
    // (lightweight: avoids an extra /me call on every page load)
    setState((s) => ({ ...s, loading: false }));
  }, []);

  const login = useCallback(
    async (data: LoginRequest) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { tokens, user } = await apiLogin(data);
        saveTokens(tokens);
        setState({ user, loading: false, error: null });
        router.push("/");
      } catch (e) {
        setState((s) => ({
          ...s,
          loading: false,
          error: e instanceof Error ? e.message : "로그인에 실패했어요",
        }));
      }
    },
    [router],
  );

  const signup = useCallback(
    async (data: SignupRequest) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { tokens, user } = await apiSignup(data);
        saveTokens(tokens);
        setState({ user, loading: false, error: null });
        router.push("/");
      } catch (e) {
        setState((s) => ({
          ...s,
          loading: false,
          error: e instanceof Error ? e.message : "회원가입에 실패했어요",
        }));
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    const token = getAccessToken();
    if (token) await apiLogout(token);
    clearTokens();
    setState({ user: null, loading: false, error: null });
    router.push("/login");
  }, [router]);

  const clearError = useCallback(
    () => setState((s) => ({ ...s, error: null })),
    [],
  );

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
