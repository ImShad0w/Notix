import { useState } from "react";
import { api } from "../lib/api";

type User = {
  username: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCsrf = async () => {
    await api.get("/sanctum/csrf-cookie");
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    setError(null);

    try {
      await getCsrf();
      const res = await api.post("/api/register", data);
      setUser(res.data);
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Register failed");
      throw err;
    }
  };

  const login = async (data: {
    email: string;
    password: string;
  }) => {
    setError(null);

    try {
      await getCsrf();
      const res = await api.post("/api/login", data);
      setUser(res.data);
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Login failed");
      throw err;
    }
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

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
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
