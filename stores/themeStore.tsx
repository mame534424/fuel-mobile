import { create } from "zustand";

type ThemeType = "light" | "dark";

interface ThemeStore {
  theme: ThemeType;

  toggleTheme: () => void;
}

export const useThemeStore =
  create<ThemeStore>((set) => ({
    theme: "light",

    toggleTheme: () =>
      set((state) => ({
        theme:
          state.theme === "light"
            ? "dark"
            : "light",
      })),
  }));