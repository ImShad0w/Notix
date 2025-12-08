'use client'

import Link from "next/link";

interface Note {
  id: number,
  name: string,
  text: string,
}

interface NoteCardProps {
  note: Note,
}
export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <div className="p-4 rounded cursor-pointer hover:bg-[#94e2d5]">
        {note.name}
      </div>
    </Link>
  );
}
