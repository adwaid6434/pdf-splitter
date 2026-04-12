// store/usePdfStore.ts

import { create } from "zustand";

export type SplitGroup = {
  id: string;
  name: string;
  pages: number[];
};

type State = {
  file?: File;
  pdfBytes?: Uint8Array;

  pageCount: number;

  selectedPages: number[];

  groups: SplitGroup[];

  setFile: (file: File, bytes: Uint8Array, pages: number) => void;

  togglePage: (page: number) => void;

  clearSelection: () => void;

  createGroup: () => void;

  renameGroup: (id: string, name: string) => void;

  deleteGroup: (id: string) => void;
};

export const usePdfStore = create<State>((set, get) => ({
  pageCount: 0,

  selectedPages: [],

  groups: [],

  setFile: (file, bytes, pages) =>
    set({
      file,
      pdfBytes: bytes,
      pageCount: pages,
      selectedPages: [],
      groups: [],
    }),

  togglePage: (page) => {
    const selected = get().selectedPages;

    const updated = selected.includes(page)
      ? selected.filter((p) => p !== page)
      : [...selected, page].sort((a, b) => a - b);

    set({
      selectedPages: updated,
    });
  },

  clearSelection: () =>
    set({
      selectedPages: [],
    }),

  createGroup: () => {
    const pages = get().selectedPages;

    if (!pages.length) return;

    set((state) => ({
      groups: [
        ...state.groups,

        {
          id: crypto.randomUUID(),

          name: `Split ${state.groups.length + 1}`,

          pages,
        },
      ],

      selectedPages: [],
    }));
  },

  renameGroup: (id, name) =>
    set((state) => ({
      groups: state.groups.map((g) => (g.id === id ? { ...g, name } : g)),
    })),

  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    })),
}));
