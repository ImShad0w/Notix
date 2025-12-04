import { useState, useEffect } from "react";
import useNotesStore from "../store/NoteStore";

const useNotes = () => {
  const [loading, setLoading] = useState(false);
  const { setNotes } = useNotesStore();

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/notes");
        const data = await res.json();
        setNotes(data.data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, [])
  return { loading }
}

export default useNotes;
