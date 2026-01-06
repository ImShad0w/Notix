import { create } from "zustand";
import { api } from "../lib/api";

interface Note {
  id: number;
  name: string;
  text: string;
  folder_id: number | null;
}

interface Folder {
  id: number;
  name: string;
}

interface NotesStore {
  notes: Note[];
  currentNote: Note | null;
  folders: Folder[];
  activeFolder: Folder | null;

  setNotes: (notes: Note[]) => void;
  setCurrentNote: (note: Note) => void;
  updateCurrentNoteName: (name: string) => void;
  updateCurrentNoteText: (text: string) => void;
  getNote: (id: number | string) => Note | undefined;
  saveCurrentNote: () => void;
  createNote: () => Promise<number>;
  deleteNote: (id: number) => void;

  //Folders part, maybe will put them in a separate store later
  createFolder: () => void;
  setFolders: (folders: Folder[]) => void;
  setActiveFolder: (folder: Folder) => void;
  deleteFolder: (id: number) => void;
  updateActiveFolder: (name: string) => void;
  addCurrentNoteToFolder: (id: number | null) => void;
}

const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  currentNote: null,
  folders: [],
  activeFolder: null,
  notesWithoutFolder: [],

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
    if (currentNote.name.length < 1) {
      return {}
    } else {
      api.put(`/api/notes/${currentNote.id}`, {
        name: currentNote.name,
        text: currentNote.text,
      });
    }
  },

  createNote: async () => {
    const { notes } = get();
    const res = await api.post("/api/notes", {
      name: "Untitled",
      text: "Dummy text",
      folder_num: null,
    });
    const newNote: Note = { id: res.data.data.id, name: "Untitled", text: "Dummy text", folder_id: null };//Create a new Note

    set({ notes: [...notes, newNote] })//Append it to the array and the current note
    return newNote.id;
  },
  deleteNote: (id) => {
    const { notes, currentNote } = get();
    const filteredNotes = notes.filter(note => note.id != id);
    if (currentNote) {
      api.delete(`/api/notes/${currentNote.id}`);
    }
    set({ notes: filteredNotes })
  },

  createFolder: async () => {
    const { folders } = get();

    const res = await api.post("/api/folders", {
      name: "Test",
    })
    const newFolder: Folder = { id: res.data.data.id, name: "Test" };

    set({ folders: [...folders, newFolder] });
  },

  setFolders: (folders) => set({ folders }),

  setActiveFolder: (folder) => set((state) => {
    if (state.activeFolder?.id === folder.id) {
      return { activeFolder: null };
    } else {
      return { activeFolder: folder };
    }
  }),

  deleteFolder: (id) => {
    const { folders, activeFolder, notes } = get();
    const filteredFolders = folders.filter(folder => folder.id != id);

    //Update notes that belong to the deleted folder: set folder_id to null
    const updatedNotes = notes.map(note =>
      note.folder_id === id ? { ...note, folder_id: null } : note
    );

    if (activeFolder) {
      api.delete(`/api/folders/${activeFolder.id}`)
    }
    set({ folders: filteredFolders, notes: updatedNotes });
  },

  updateActiveFolder: (name) =>
    set((state) => {
      if (!state.activeFolder) return {};

      const updated: Folder = {
        ...state.activeFolder,
        name,
      };

      api.put(`/api/folders/${updated.id}`, {
        name,
      });

      return {
        activeFolder: updated,
        folders: state.folders.map((f) =>
          f.id === updated.id ? updated : f
        ),
      };
    }),

  addCurrentNoteToFolder: (id) =>
    set((state) => {
      if (!state.currentNote) return {};

      const updated: Note = {
        ...state.currentNote,
        folder_id: id,
      };

      //Send the chnages to the backend
      api.put(`/api/notes/${updated.id}`, {
        name: updated.name,
        text: updated.text,
        folder_id: id,
      })

      return {
        currentNote: updated,
        notes: state.notes.map((n) =>
          n.id === updated.id ? updated : n
        ),
      };
    }),
}));

export default useNotesStore;
