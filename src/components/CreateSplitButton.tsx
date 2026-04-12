"use client";

import { usePdfStore } from "@/store/usePdfStore";

export default function CreateSplitButton() {
  const create = usePdfStore((s) => s.createGroup);

  return (
    <button onClick={create} className="px-4 py-2 bg-black text-white">
      Create split
    </button>
  );
}
