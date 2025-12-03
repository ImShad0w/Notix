export default async function Page({ params }: { params: any }) {
  const { id } = await params;
  const res = await fetch(`http://backend:8000/api/notes/${id}`)
  const note = await res.json();
  return (
    <div className="p-8 flex flex-col gap-20">
      <div className="">
        <h1 className="text-5xl">{note.name}</h1>
      </div>
      <div className="">
        <p className="text-2xl">{note.text}</p>
      </div>
    </div>
  )
}


