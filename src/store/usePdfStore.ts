// store/usePdfStore.ts

import { create } from "zustand";

type SplitGroup = {
  id: string;
  name: string;
  pages: number[];
  blob?: Blob;
};

type State = {
  file?: File;
  pdfBytes?: Uint8Array;
  pageCount: number;
  selectedPages: number[];
  groups: SplitGroup[];

  setFile: (file: File, bytes: Uint8Array, pages: number) => void;
  togglePage: (page: number) => void;
  createGroup: () => void;
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
    }),

  togglePage: (page) => {
    const selected = get().selectedPages;

    set({
      selectedPages: selected.includes(page)
        ? selected.filter((p) => p !== page)
        : [...selected, page],
    });
  },

  createGroup: () => {
    const pages = get().selectedPages;

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
}));
