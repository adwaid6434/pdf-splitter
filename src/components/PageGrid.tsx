// components/PageGrid.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { usePdfStore } from "@/store/usePdfStore";

import { loadPdfForThumbs, renderThumbnail } from "@/lib/pdfThumbnail";

export default function PageGrid() {
  const thumbnailBytes = usePdfStore((s) => s.buffers?.thumbnailBytes);

  const pageCount = usePdfStore((s) => s.pageCount);

  const selected = usePdfStore((s) => s.selectedPages);

  const toggle = usePdfStore((s) => s.togglePage);

  const groups = usePdfStore((s) => s.groups);

  const [thumbs, setThumbs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const lastClickedRef = useRef<number | null>(null);

  // usage counter
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
    if (!thumbnailBytes) return;

    let cancelled = false;

    const bytes = thumbnailBytes;

    async function load() {
      setLoading(true);

      const pdf = await loadPdfForThumbs(bytes);

      if (cancelled) return;

      const batchSize = 8;

      // reset thumbnails before starting
      setThumbs([]);

      for (let start = 0; start < pageCount; start += batchSize) {
        if (cancelled) return;

        const end = Math.min(start + batchSize, pageCount);

        const batchPromises = [];

        for (let i = start; i < end; i++) {
          batchPromises.push(renderThumbnail(pdf, i + 1));
        }

        const batchResults = await Promise.all(batchPromises);

        if (cancelled) return;

        // append results while preserving order
        setThumbs((prev) => [...prev, ...batchResults]);
      }

      if (!cancelled) {
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [thumbnailBytes, pageCount]);

  if (!thumbnailBytes) return null;

  return (
    <div>
      {loading && (
        <div className="mb-4 text-sm opacity-70">generating previews...</div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {thumbs.map((src, i) => {
          const page = i + 1;

          const isSelected = selected.includes(page);

          const usage = usageMap[page] ?? 0;

          return (
            <button
              key={page}
              onClick={(e) => {
                if (e.shiftKey && lastClickedRef.current !== null) {
                  const start = Math.min(lastClickedRef.current, page);

                  const end = Math.max(lastClickedRef.current, page);

                  for (let i = start; i <= end; i++) {
                    toggle(i);
                  }
                } else {
                  toggle(page);
                }

                lastClickedRef.current = page;
              }}
              className={`
                relative
                border
                rounded
                overflow-hidden

                transition

                ${
                  isSelected
                    ? `
                      border-blue-800
                      ring-3
                      ring-blue-800
                    `
                    : "border-gray-300"
                }
              `}
            >
              {/* <img src={src} className="w-full" /> */}
              <Image
                src={src}
                alt={`page ${page}`}
                width={300}
                height={420}
                className="w-full h-auto"
              />

              <div className="text-xs p-1 bg-white text-black">page {page}</div>

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

      <p className="text-sm text-gray-500 mt-4">
        Preview thumbnails are compressed for speed. Your final PDF will keep
        the original quality.
      </p>
    </div>
  );
}
