import NoteCard from "./NoteCard"

interface Note {
  name: string,
  text: string,
}

function NoteSideBar({ notes }: { notes: Note[] }) {
  return (
    <section className="bg-[#11111b]">
      {notes.map((note: Note) => (
        <NoteCard name={note.name} key={note.name} />
      ))}
    </section>
  )
}

export default NoteSideBar;
