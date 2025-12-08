"use client";

import NotePage from "../../ui/NotePage";
import useNotesStore from "@/app/store/NoteStore";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;

  const note = useNotesStore((s) => s.getNote(Number(id)));

  if (note) {
    return <NotePage note={note} />;
  } else {
    return <h1>No note selected yet...</h1>;
  }
}

