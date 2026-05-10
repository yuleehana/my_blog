'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setIsDark = useThemeStore((state) => state.setIsDark);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const initialTheme = savedTheme || systemTheme;

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, [setIsDark]);

  return <>{children}</>;
}
