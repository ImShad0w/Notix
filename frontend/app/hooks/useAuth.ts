import { useState, useEffect } from "react";
import { api } from "../lib/api";

type User = {
  name: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [csrfReady, setCsrfReady] = useState(false);

  useEffect(() => {
    // On page refresh, check if user is already logged in
    verifyUser();
  }, []);

  //CSRF Stuff
  const fetchCsrf = async () => {
    await api.get("/sanctum/csrf-cookie");
    setCsrfReady(true);
  };

  const ensureCsrf = async () => {
    if (!csrfReady) {
      await fetchCsrf();
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    setError(null);
    await ensureCsrf();

    try {
      await api.post("/api/register", data);
      return await verifyUser();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Register failed");
      throw err;
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setError(null);
    await ensureCsrf();

    try {
      await api.post("/api/login", data);
      return await verifyUser();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Login failed");
      throw err;
    }
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);

    // mark CSRF as invalid; DO NOT refetch here
    setCsrfReady(false);
  };

  const verifyUser = async () => {
    try {
      const res = await api.get("/api/me");
      setUser(res.data);
      return res.data;
    } catch {
      setUser(null);
      return null;
    }
  };

  return {
    user,
    error,
    register,
    login,
    logout,
    verifyUser,
  };
}
