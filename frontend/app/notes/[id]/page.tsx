import NotePage from "../../ui/NotePage";

export default async function Page({ params }: { params: any }) {
  const { id } = await params;
  const res = await fetch(`http://backend:8000/api/notes/${id}`)
  const note = await res.json();
  return (
    <NotePage name={note.name} text={note.text} />
  )
}


