import NoteCard from "./NoteCard"
import useNotesStore from "../store/NoteStore";
import { useRouter } from "next/navigation";

interface Note {
  name: string,
  text: string,
  id: number,
}

function NoteSideBar({ notes }: { notes: Note[] }) {

  const { createNote, deleteNote, currentNote } = useNotesStore();
  const router = useRouter();

  function handleCreate() {
    const id = createNote();
    router.push(`/notes/${id}`);
  }

  function handleDelete() {
    if (!currentNote) return;
    deleteNote(currentNote.id);
    router.push("/notes");
  }

  return (
    <section className="bg-[#11111b]">
      <div className="flex gap-10 p-3">
        <button className="bg-[#181825] text-[#8c8fa1]" onClick={handleCreate}>Create note</button>
        <button className="bg-[#181825] text-[#8c8fa1]" onClick={handleDelete}>Delete note</button>
        <button className="bg-[#181825] text-[#8c8fa1]">Collapse</button>
      </div>
      {notes.map((note: Note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </section>
  )
}

export default NoteSideBar;
