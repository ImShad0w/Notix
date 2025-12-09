import { create } from "zustand";

interface Note {
  id: number;
  name: string;
  text: string;
}

interface NotesStore {
  notes: Note[];
  currentNote: Note | null;

  setNotes: (notes: Note[]) => void;
  setCurrentNote: (note: Note) => void;
  updateCurrentNoteName: (name: string) => void;
  updateCurrentNoteText: (text: string) => void;
  getNote: (id: number | string) => Note | undefined;
  saveCurrentNote: () => void;
}

const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  currentNote: null,

  setNotes: (notes) => set({ notes }),
  setCurrentNote: (note) => set({ currentNote: note }),

  //Updates the name and stores it in the new notes array
  updateCurrentNoteName: (name) =>
    set((state) => {
      if (!state.currentNote) return {};

      const updated = { ...state.currentNote, name };

      return {
        currentNote: updated,
        notes: state.notes.map((n) =>
          n.id === updated.id ? updated : n
        ),
      };
    }),

  //Updates the text and stores it in the new notes array
  updateCurrentNoteText: (text) =>
    set((state) => {
      if (!state.currentNote) return {};

      const updated = { ...state.currentNote, text };

      return {
        currentNote: updated,
        notes: state.notes.map((n) =>
          n.id === updated.id ? updated : n
        ),
      };
    }),
  getNote: (id) => {
    const state = get();
    return state.notes.find(note => note.id === id);
  },

  saveCurrentNote: async () => {
    const { currentNote } = get();
    if (!currentNote) return {};
    await fetch(`http://localhost:8000/api/notes/${currentNote.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentNote.name,
        text: currentNote.text
      })
    })
  }
}));

export default useNotesStore;
