//Learn what is useRef and use it to create a timer
//Understand the logic behind what i want to make

import useNotesStore from "../store/NoteStore";
import { useEffect, useRef } from "react";

export function useAutosave(value: any, onSave: Function, delay = 2000) {
  const timeoutRef = useRef<NodeJS.Timeout | any>(null);
  const { } = useNotesStore();
  useEffect(() => {
    // Clear any old timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start a new timer
    timeoutRef.current = setTimeout(() => {
      onSave(value);
    }, delay);

    // Cleanup when value changes or component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, [value, onSave, delay]);
}




