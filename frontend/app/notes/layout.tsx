'use client';

import useNotes from "../hooks/useNotes";
import NoteSideBar from "../ui/NoteSideBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading, notes } = useNotes();
  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <main className="grid grid-cols-[20%_80%]">
      <NoteSideBar notes={notes} />
      <section className="bg-[#181825]">{children}</section>
    </main>
  )
}
