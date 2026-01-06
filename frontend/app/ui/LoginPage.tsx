'use client';

import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    await login({
      email: email,
      password: password,
    })
    router.replace("/notes");
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-[90vh] py-12 px-4">
        <h1 className="text-5xl font-bold mb-8">Login</h1>

        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex flex-col">
            <label className="mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-gray-700"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="bg-purple-400 hover:bg-purple-500 text-gray-900 font-semibold  p-5 rounded-lg"
            >
              Login!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;
