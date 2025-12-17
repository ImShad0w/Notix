"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const fetchCsrf = async () => {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });
    };
    fetchCsrf();
  }, []);

  function handleRegister() {
    router.push("/register");
  }
  function handleLogin() {
    router.push("/login");
  }

  return (
    <>
      <div className="flex flex-col items-center mt-40">
        <h1 className="text-white text-6xl font-bold">Notix, recall improved.</h1>
        <div className="flex gap-10 mt-40">
          <button onClick={handleRegister} className="bg-[#8839ef] p-2.5 text-4xl rounded-lg">Register</button>
          <button onClick={handleLogin} className="bg-[#8839ef] p-2.5 text-4xl rounded-lg">Login</button>
        </div>
      </div>
    </>
  )
}

