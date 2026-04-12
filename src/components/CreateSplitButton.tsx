"use client";

import { usePdfStore } from "@/store/usePdfStore";

export default function CreateSplitButton() {
  const create = usePdfStore((s) => s.createGroup);

  return (
    <button
      onClick={create}
      className="
        inline-flex items-center justify-center
        px-5 py-2.5
        rounded-xl
        bg-gradient-to-r from-black to-neutral-800
        text-white text-sm font-medium
        shadow-md
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
      "
    >
      Create split
    </button>
  );
}
