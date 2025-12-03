'use client';

import useNotes from "../hooks/useNotes";
import NoteSideBar from "../ui/NoteSideBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading, notes } = useNotes();
  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <main className="grid grid-cols-[20%_80%] h-screen">
      <aside className="overflow-y-auto">
        <NoteSideBar notes={notes} />
      </aside>
      <section className="bg-[#181825] overflow-y-auto flex flex-column">{children}</section>
    </main>
  )
}
