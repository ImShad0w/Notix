'use client'

import { Folder, Edit2, Trash2 } from "@deemlol/next-icons";
import useNotesStore from "../store/NoteStore";

interface Folder {
  id: number;
  name: string;
}

interface FolderCardProps {
  folder: Folder;
  isActive: boolean | null;
  onClick: () => void;
}

export default function FolderCard({ folder, isActive, onClick }: FolderCardProps) {
  const { deleteFolder } = useNotesStore();

  function handleDeleteFolder() {
    deleteFolder(folder.id);
  }

  return (
    <div
      onClick={onClick}
      className="p-4 rounded cursor-pointer flex items-center justify-between hover:bg-[#cba6f7] hover:text-black"
    >
      <div className="flex items-center gap-2">
        <Folder size={15} />
        <span>{folder.name}</span>
      </div>

      {isActive && (
        <div className="flex items-center gap-2">
          <Edit2 size={15} />
          <Trash2 size={15} onClick={handleDeleteFolder} />
        </div>
      )}
    </div>
  );
}
