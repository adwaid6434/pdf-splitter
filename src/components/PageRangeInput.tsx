"use client";

import { useState } from "react";

import { usePdfStore } from "@/store/usePdfStore";

import { parsePageRange } from "@/lib/parsePageRange";

export default function PageRangeInput() {
  const setSelected = usePdfStore((s) => s.togglePage);

  const clear = usePdfStore((s) => s.clearSelection);

  const [value, setValue] = useState("");

  function applyRange() {
    clear();

    const pages = parsePageRange(value);

    pages.forEach((p) => setSelected(p));
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:items-center">
      <input
        placeholder="1-5,8,10-12"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full
          rounded-md
          border
          px-3
          py-2
          text-sm
          outline-none
          transition
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

      <button
        onClick={applyRange}
        className="
          w-full sm:w-auto
          rounded-md
          border
          px-4
          py-2
          text-sm
          font-medium
          transition
          hover:bg-gray-100
          active:scale-[0.98]
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        select range
      </button>
    </div>
  );
}
