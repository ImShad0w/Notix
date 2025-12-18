'use client';

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin() {
    login({
      email: email,
      password: password,
    })
  }

  return (
    <>
      <label htmlFor="email">Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" />
      <button onClick={handleLogin}>Login!</button>
    </>
  )
}

export default LoginPage;
