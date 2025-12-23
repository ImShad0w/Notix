'use client';

import useNotes from "../hooks/useNotes";
import NoteSideBar from "../ui/NoteSideBar";
import useNotesStore from "../store/NoteStore";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading } = useNotes();
  const { notes } = useNotesStore();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/");
    }
  }, [user, router])

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="grid grid-cols-[15%_85%] h-screen w-screen">
      <aside className="overflow-y-auto min-h-screen">
        <NoteSideBar notes={notes} />
      </aside>
      <section className="bg-[#181825] overflow-y-auto flex flex-col p-20">
        {children}
      </section>
    </main>
  );
}
