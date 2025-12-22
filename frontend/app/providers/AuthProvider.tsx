'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 👇 ensures CSRF is fetched ONLY ONCE
  const csrfFetched = useRef(false);

  const fetchCsrfOnce = async () => {
    if (csrfFetched.current) return;
    csrfFetched.current = true;
    await api.get("/sanctum/csrf-cookie");
  };

  const verifyUser = async () => {
    try {
      const res = await api.get("/api/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  // 🔒 bootstrap auth ONCE
  useEffect(() => {
    const bootstrap = async () => {
      await fetchCsrfOnce();
      await verifyUser();
    };
    bootstrap();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    await api.post("/api/login", data);
    await verifyUser();
  };

  const register = async (data: any) => {
    await api.post("/api/register", data);
    await verifyUser();
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    // ❌ DO NOT reset CSRF
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

