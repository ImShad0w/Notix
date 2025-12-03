'use client'

import Link from "next/link";

interface NoteProps {
  name: string,
  id: number,
}

export default function NoteCard({ name, id }: NoteProps) {
  return (
    <Link href={`/notes/${id}`}>
      <div className="p-4 rounded cursor-pointer hover:bg-[#94e2d5]">
        {name}
      </div>
    </Link>
  );
}
