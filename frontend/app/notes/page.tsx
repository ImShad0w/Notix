import NoteCard from "@/app/ui/NoteCard";

export default async function NoteView() {
  const data = await fetch("http://backend:8000/api/notes");
  const res = await data.json();
  const notes = res.data;

  return (
    <>
      {
        notes.map((note: any) => (
          <NoteCard name={note.name} text={note.text} />
        ))
      }
    </>
  )
}
