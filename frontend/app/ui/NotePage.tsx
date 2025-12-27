'use client'

import { useEffect } from "react";
import useNotesStore from "@/app/store/NoteStore";

interface Note {
  id: number,
  name: string,
  text: string,
  folder_num: number | null;
}

interface Props {
  note: Note,
}

function NotePage({ note }: Props) {

  const { updateCurrentNoteName, updateCurrentNoteText, setCurrentNote, currentNote, saveCurrentNote } = useNotesStore();

  //Set the current note and render it once
  useEffect(() => {
    setCurrentNote(note);
  }, []);

  function handleInputName(e: any) {
    //Also change it globally with store
    updateCurrentNoteName(e.target.value);
    saveCurrentNote(); // Will change this to an autoSave hook later
  }

  function handleInputText(e: any) {
    //Also change it globally with store
    updateCurrentNoteText(e.target.value);
    saveCurrentNote(); // Will change this to an autoSave hook later
  }

  function renderNote() {
    return (
      <>
        <input type="text" value={currentNote?.name} className="text-7xl w-auto text-bold" onChange={handleInputName} />
        <textarea value={currentNote?.text} onChange={handleInputText} className="min-h-screen w-auto text-3xl" />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {currentNote ? renderNote() : <h1>No note available!</h1>}
    </div >
  )
}

export default NotePage;
