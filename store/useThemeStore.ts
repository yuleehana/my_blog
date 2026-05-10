import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  setIsDark: (val) => set({ isDark: val }),
}));
