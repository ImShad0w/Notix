import { useState } from "react";

type User = {
  username: string;
  email: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (data: { name: string, email: string, password: string, password_confirmation: string }) => {
    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Registration failed');

    const meRes = await fetch('http://localhost:8000/api/me', { credentials: 'include' });
    const userData = await meRes.json();
    console.log(userData);
    setUser(userData);
  }
  const login = async (data: { name: string, password: string }) => {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("Login failed");
    const meRes = await fetch('http://localhost:8000/api/me', { credentials: 'include' });
    const userData = await meRes.json();
    setUser(userData);
  }
  const verifyUser = async () => {
    const res = await fetch('http://localhost:8000/api/me', { credentials: 'include' });
    if (!res.ok) return setUser(null);
    const userData = await res.json();
    setUser(userData);
  };
  const logout = async () => {
    await fetch('http://localhost:8000/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };
  return { user, register, login, logout, verifyUser }
}
