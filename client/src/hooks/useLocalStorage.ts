import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, defaultValues: object) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValues;
    }

    return JSON.parse(item);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};
