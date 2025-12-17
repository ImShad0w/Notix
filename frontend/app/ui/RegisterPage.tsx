'use client';
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");

  async function handleRegister() {
    await register({
      name: username,
      email,
      password,
      password_confirmation: passConf,
    });
  }

  return (
    <>
      <div>
        <label>Username</label>
        <input type="text" onChange={e => setUsername(e.target.value)} />

        <label>Email</label>
        <input type="email" onChange={e => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" onChange={e => setPassword(e.target.value)} />

        <label>Password confirm</label>
        <input type="password" onChange={e => setPassConf(e.target.value)} />
      </div>

      <button onClick={handleRegister}>Register!</button>
    </>
  );
}

export default RegisterPage;

