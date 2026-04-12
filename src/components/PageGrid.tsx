// components/PageGrid.tsx

"use client";

import { usePdfStore } from "@/store/usePdfStore";

export default function PageGrid() {
  const pageCount = usePdfStore((s) => s.pageCount);
  const selected = usePdfStore((s) => s.selectedPages);
  const toggle = usePdfStore((s) => s.togglePage);

  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: pageCount }).map((_, i) => {
        const page = i + 1;

        const isSelected = selected.includes(page);

        return (
          <button
            key={page}
            onClick={() => toggle(page)}
            className={`border p-4 rounded
              ${isSelected ? "bg-blue-200" : ""}
            `}
          >
            Page {page}
          </button>
        );
      })}
    </div>
  );
}
