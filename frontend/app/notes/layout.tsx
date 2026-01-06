'use client';

import useNotes from "../hooks/useNotes";
import useFolders from "../hooks/useFolders";
import NoteSideBar from "../ui/NoteSideBar";
import useNotesStore from "../store/NoteStore";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useNotes();
  const { loadingFolders } = useFolders();
  const { notes, folders } = useNotesStore();
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user === null) {
      router.replace("/");
    }
  }, [user, authLoading, router])

  if (loading && loadingFolders) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="grid grid-cols-[auto_1fr] h-screen w-screen">
      <aside className="overflow-y-auto min-h-screen">
        <NoteSideBar
          notes={notes.filter(n => n.folder_id === null)}
          folders={folders}
          collapsed={collapsed}
          onToggle={() => setCollapsed(prev => !prev)}
        />
      </aside>
      <section className="bg-[#181825] overflow-y-auto flex flex-col p-20">
        {children}
      </section>
    </main>
  );
}
