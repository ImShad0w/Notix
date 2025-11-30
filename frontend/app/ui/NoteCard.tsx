'use client'

interface NoteProps {
  name: string,
  text: string,
}

export default function NoteCard({ name, text }: NoteProps) {

  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>Text: {text}</h2>
    </div>
  )
}
