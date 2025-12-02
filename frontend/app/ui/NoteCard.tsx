'use client'

interface NoteProps {
  name: string,
}

export default function NoteCard({ name }: NoteProps) {

  return (
    <div className=" text-sm p-5 text-white">
      <h1>{name}</h1>
    </div>
  )
}
