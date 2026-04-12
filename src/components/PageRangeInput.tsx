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
    <div className="flex gap-2">
      <input
        placeholder="1-5,8,10-12"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1"
      />

      <button
        onClick={applyRange}
        className="
          border px-2
        "
      >
        select range
      </button>
    </div>
  );
}
