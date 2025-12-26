import NoteCard from "./NoteCard"
import useNotesStore from "../store/NoteStore";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import { Edit, Trash2, Power, Sidebar, FolderPlus } from "@deemlol/next-icons";

interface Note {
  name: string,
  text: string,
  id: number,
}

type NoteSideBarProps = {
  onToggle: () => void;
  collapsed: boolean;
  notes: Note[];
}

function NoteSideBar({ notes, onToggle, collapsed }: NoteSideBarProps) {

  const { createNote, deleteNote, currentNote, getFolders, createFolder } = useNotesStore();
  const router = useRouter();
  const { logout } = useAuth();

  function handleCreate() {
    const id = createNote();
    router.push(`/notes/${id}`);
  }

  function handleDelete() {
    if (!currentNote) return;
    deleteNote(currentNote.id);
    router.push("/notes");
  }

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  function handleCreateFolder() {
    createFolder();
    getFolders();
  }

  return (
    <section
      className={`bg-[#11111b] min-h-screen overflow-hidden transition-[width] duration-300 ease-in-out
      ${collapsed ? "w-16" : "w-64"}`}>

      <div className="flex justify-center gap-1 p-3 pt-5">
        {!collapsed && (
          <>
            <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleCreate}>
              <Edit size={20} />
            </button>
            <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleDelete}>
              <Trash2 size={20} />
            </button>
            <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleLogout}>
              <Power size={20} />
            </button>
            <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleCreateFolder}>
              <FolderPlus size={20} />
            </button>
          </>
        )}

        <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={onToggle}>
          <Sidebar size={20} />
        </button>
      </div>

      <div
        className={`${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 translate-x-0"}`}>
        {notes.map((note: Note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </section>

  )
}

export default NoteSideBar;
