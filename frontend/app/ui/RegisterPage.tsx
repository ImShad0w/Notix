'use client';
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

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
    router.replace("/notes");
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-[90vh] py-12 px-4">
        <h1 className="text-5xl font-bold mb-8">Register</h1>

        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded-lg bg-gray-700"
            />
          </div>

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

          <div className="flex flex-col">
            <label className="mb-2 text-gray-300">Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setPassConf(e.target.value)}
              className="p-3 rounded-lg bg-gray-700"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRegister}
              className="bg-purple-400 hover:bg-purple-500 text-gray-900 font-semibold  p-5 rounded-lg"
            >
              Register!
            </button>
          </div>
        </div>
      </div>
    </>
  );

}

export default RegisterPage;

