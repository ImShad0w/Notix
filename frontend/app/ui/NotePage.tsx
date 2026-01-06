'use client'

import React, { useEffect } from "react";
import useNotesStore from "@/app/store/NoteStore";
import { Folder } from "@deemlol/next-icons";

interface Note {
  id: number,
  name: string,
  text: string,
  folder_id: number | null;
}

interface Props {
  note: Note,
}

function NotePage({ note }: Props) {

  const { updateCurrentNoteName, updateCurrentNoteText, setCurrentNote, currentNote, saveCurrentNote, addCurrentNoteToFolder, folders } = useNotesStore();

  //Set the current note and render it once
  useEffect(() => {
    setCurrentNote(note);
  }, []);

  function handleInputName(e: React.ChangeEvent<HTMLInputElement>) {
    //Also change it globally with store
    updateCurrentNoteName(e.target.value);
    saveCurrentNote(); // Will change this to an autoSave hook later
  }

  function handleInputText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //Also change it globally with store
    updateCurrentNoteText(e.target.value);
    saveCurrentNote(); // Will change this to an autoSave hook later
  }

  function handleMoveToFolder(e: React.ChangeEvent<HTMLSelectElement>) {
    const folderId = e.target.value === "null" ? null : Number(e.target.value); // "null" becomes null
    addCurrentNoteToFolder(folderId);
  }

  function FolderSelector() {
    return (
      <select onChange={handleMoveToFolder}>
        <option defaultValue={"null"}>Select a folder...</option>
        <option value="null">No folder</option>
        {
          folders.map((f) => (
            <option value={f.id} key={f.id}>{f.name}</option>
          ))
        }
      </select >
    )
  }

  function renderNote() {
    return (
      <>
        <input type="text" value={currentNote?.name} className="text-7xl w-auto text-bold" onChange={handleInputName} />
        <FolderSelector />
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
