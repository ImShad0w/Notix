import { useState, useEffect } from "react";
import useNotesStore from "../store/NoteStore";
import { api } from "../lib/api";

const useNotes = () => {
  const [loading, setLoading] = useState(false);
  const { setNotes } = useNotesStore();

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/notes");
        console.log(res.data.data);
        setNotes(res.data.data);
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
