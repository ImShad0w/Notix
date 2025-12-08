'use client'

import { useEffect } from "react";
import useNotesStore from "@/app/store/NoteStore";

interface Note {
  id: number,
  name: string,
  text: string,
}

interface Props {
  note: Note,
}

function NotePage({ note }: Props) {

  const { updateCurrentNoteName, updateCurrentNoteText, setCurrentNote, currentNote } = useNotesStore();

  //Set the current note and render it once
  useEffect(() => {
    setCurrentNote(note);
  }, []);

  function handleInputName(e: any) {
    //Also change it globally with store
    updateCurrentNoteName(e.target.value);
  }

  function handleInputText(e: any) {
    //Also change it globally with store
    updateCurrentNoteText(e.target.value);
  }
  return (
    <div className="flex flex-col gap-8">
      <input type="text" value={currentNote?.name} className="text-5xl" onChange={handleInputName} />
      <textarea value={currentNote?.text} onChange={handleInputText} />
    </div >
  )
}

export default NotePage;
