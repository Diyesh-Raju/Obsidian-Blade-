import { create } from "zustand";

interface ThemeStore {
  isHoveringBubble: boolean;
  setHoveringBubble: (hovering: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isHoveringBubble: false,
  setHoveringBubble: (hovering) => set({ isHoveringBubble: hovering }),
}));
