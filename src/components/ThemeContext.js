'use client';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [textColor, setTextColor] = useState('text-stone-50'); // default white

  return (
    <ThemeContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}