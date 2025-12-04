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

}

const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  currentNote: null,

  setNotes: (notes) => set({ notes }),
  setCurrentNote: (note) => set({ currentNote: note }),

  updateCurrentNoteName: (name) =>
    set((state) => ({
      currentNote: state.currentNote
        ? { ...state.currentNote, name }
        : null
    })),

  updateCurrentNoteText: (text) =>
    set((state) => ({
      currentNote: state.currentNote
        ? { ...state.currentNote, text }
        : null
    })),
}));

export default useNotesStore;
