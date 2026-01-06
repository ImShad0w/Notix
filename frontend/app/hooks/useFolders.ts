import { useState, useEffect } from "react";
import useNotesStore from "../store/NoteStore";
import { api } from "../lib/api";

const useFolders = () => {
  const [loadingFolders, setLoading] = useState(false);
  const { setFolders } = useNotesStore();

  useEffect(() => {
    const getFolders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/folders");
        console.log(res.data.data);
        setFolders(res.data.data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getFolders();
  }, [])
  return { loadingFolders }
}

export default useFolders;
