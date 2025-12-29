'use client'

import { Folder, Edit2, Trash2 } from "@deemlol/next-icons";
import NoteCard from "./NoteCard";
import useNotesStore from "../store/NoteStore";
import { useState } from "react";

interface Folder {
  id: number;
  name: string;
}

interface FolderCardProps {
  folder: Folder;
  isActive: boolean | null;
  onClick: () => void;
}

export default function FolderCard({
  folder,
  isActive,
  onClick,
}: FolderCardProps) {

  const { deleteFolder, updateActiveFolder, notes } = useNotesStore();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  function handleDeleteFolder(e: React.MouseEvent) {
    e.stopPropagation();
    deleteFolder(folder.id);
  }

  function handleEditFolder(e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(true);
    setName(folder.name);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const trimmed = name.trim();
      if (trimmed && trimmed !== folder.name) {
        updateActiveFolder(trimmed);
      }
      setEditing(false);
    }
  }
  return (
    <div>
      {/* Folder header */}
      <div
        onClick={onClick}
        className={`${isActive
          ? 'p-4 rounded cursor-pointer flex items-center justify-between  bg-[#cba6f7] text-black'
          : 'p-4 rounded cursor-pointer flex items-center justify-between hover:bg-[#cba6f7] hover:text-black'}`}
      >
        <div className="flex items-center gap-2">
          <Folder size={15} />

          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-transparent border-b border-black outline-none text-sm"
            />
          ) : (
            <span>{folder.name}</span>
          )}
        </div>

        {isActive && (
          <div className="flex items-center gap-2">
            <Edit2
              size={15}
              onClick={handleEditFolder}
              className="cursor-pointer"
            />
            <Trash2
              size={15}
              onClick={handleDeleteFolder}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
        )}
      </div>

      {/* Expandable notes */}
      {
        isActive && notes?.length > 0 && (
          <div
            className="ml-6 flex flex-col relative pl-3 before:absolute before:top-0 before:left-0 before:h-full before:w-[1px] before:bg-gray-500"
          >
            {notes
              .filter((note) => note.folder_id === folder.id)
              .map((note) => (
                <NoteCard note={note} key={note.id} />
              ))}
          </div>
        )
      }
    </div >
  );

}

