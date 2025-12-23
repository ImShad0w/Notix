import NoteCard from "./NoteCard"
import useNotesStore from "../store/NoteStore";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import { Edit, Trash2, Power, Menu } from "@deemlol/next-icons";

interface Note {
  name: string,
  text: string,
  id: number,
}

function NoteSideBar({ notes }: { notes: Note[] }) {

  const { createNote, deleteNote, currentNote } = useNotesStore();
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

  return (
    <section className="bg-[#11111b] min-h-screen">
      <div className="flex justify-center gap-5 p-3 sm:gap-2 pt-5">
        <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleCreate}>
          <Edit size={20} />
        </button>
        <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleDelete}>
          <Trash2 size={20} />
        </button>
        <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg" onClick={handleLogout}>
          <Power size={20} />
        </button>
        <button className="cursor-pointer hover:bg-[#cba6f7] hover:text-black text-white transition-colors p-3 rounded-lg">
          <Menu size={20} />
        </button>
      </div>
      {notes.map((note: Note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </section>
  )
}

export default NoteSideBar;
