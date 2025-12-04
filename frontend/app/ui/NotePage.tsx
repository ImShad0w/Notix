'use client'

import { useState, useEffect } from "react";
import useNotesStore from "@/app/store/NoteStore";

interface Note {
  name: string,
  text: string,
}

function NotePage({ name, text }: Note) {

  const [noteText, setNoteText] = useState<string>("");
  const [noteName, setNoteName] = useState<string>("");

  useEffect(() => {
    //Render only one time
    setNoteText(text)
    setNoteName(name)
  }, [])

  function handleInputName(e: any) {
    setNoteName(e.target.value);
    //Also change it globally with store
  }

  function handleInputText(e: any) {
    setNoteText(e.target.value);
    //Also change it globally with store
  }
  return (
    <div className="flex flex-col gap-8">
      <input type="text" value={noteName} className="text-5xl" onChange={handleInputName} />
      <textarea value={noteText} onChange={handleInputText} />
    </div >
  )
}

export default NotePage;
