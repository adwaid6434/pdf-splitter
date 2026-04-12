// components/PageGrid.tsx
"use client";

import { useEffect, useState } from "react";

import { usePdfStore } from "@/store/usePdfStore";

import { loadPdfForThumbs, renderThumbnail } from "@/lib/pdfThumbnail";

export default function PageGrid() {
  const pdfBytes = usePdfStore((s) => s.pdfBytes);

  const pageCount = usePdfStore((s) => s.pageCount);

  const selected = usePdfStore((s) => s.selectedPages);

  const toggle = usePdfStore((s) => s.togglePage);

  const groups = usePdfStore((s) => s.groups);

  const [thumbs, setThumbs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // track usage frequency

  const usageMap = groups
    .flatMap((g) => g.pages)
    .reduce(
      (acc, p) => {
        acc[p] = (acc[p] ?? 0) + 1;

        return acc;
      },
      {} as Record<number, number>,
    );

  useEffect(() => {
    if (!pdfBytes) return;

    // create locally narrowed variable
    const bytes = pdfBytes;

    async function load() {
      setLoading(true);

      const pdf = await loadPdfForThumbs(bytes);

      const promises = Array.from({
        length: pageCount,
      }).map((_, i) => renderThumbnail(pdf, i + 1));

      const results = await Promise.all(promises);

      setThumbs(results);

      setLoading(false);
    }

    load();
  }, [pdfBytes, pageCount]);

  if (!pdfBytes) return null;

  return (
    <div>
      {loading && (
        <div
          className="
            mb-4
            text-sm
            opacity-70
          "
        >
          generating previews...
        </div>
      )}

      <div
        className="
          grid
          grid-cols-4
          gap-4
        "
      >
        {thumbs.map((src, i) => {
          const page = i + 1;

          const isSelected = selected.includes(page);

          const usage = usageMap[page] ?? 0;

          return (
            <button
              key={page}
              onClick={() => toggle(page)}
              className={`
                relative
                border
                rounded
                overflow-hidden

                transition

                ${
                  isSelected
                    ? `
                    border-blue-500
                    ring-2
                    ring-blue-300
                  `
                    : "border-gray-300"
                }
              `}
            >
              <img
                src={src}
                className="
                  w-full
                "
              />

              {/* page label */}

              <div
                className="
                  text-xs
                  p-1
                  bg-white
                "
              >
                page {page}
              </div>

              {/* usage badge */}

              {usage > 0 && (
                <div
                  className="
                    absolute
                    top-1
                    right-1
                    text-xs
                    px-1
                    bg-black
                    text-white
                    rounded
                  "
                >
                  {usage}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
