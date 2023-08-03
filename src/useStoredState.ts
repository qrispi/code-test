import { SetStateAction, useState } from 'react';
import { v4 as uuid } from "uuid";

const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    created_at: 2+ Date.now(),
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    created_at: 1 + Date.now(),
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    created_at: 3+Date.now(),
  },
];

function useStoredState<T>(key: string) {
  const [state, setState] = useState<Todo[]>(() => {
    const storedState = localStorage.getItem(key);
    if (storedState) {
      return JSON.parse(storedState) as Todo [];
    }
    return initialData
  });

  const setValue = (value: SetStateAction<Todo[]>) => {
    setState((prevState) => {
      const valueToStore = value instanceof Function ? value(prevState) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };  
  return [state, setValue] as const;
}

export default useStoredState;