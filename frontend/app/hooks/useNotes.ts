import { useState, useEffect } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

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
  return { notes, loading }
}

export default useNotes;
