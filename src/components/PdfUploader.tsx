// components/PdfUploader.tsx
"use client";

import { usePdfStore } from "@/store/usePdfStore";

import * as pdfjs from "pdfjs-dist";

export default function PdfUploader() {
  const setFile = usePdfStore((s) => s.setFile);

  async function processFile(file: File) {
    const bytes = new Uint8Array(await file.arrayBuffer());

    const pdf = await pdfjs.getDocument({
      data: bytes,
    }).promise;

    setFile(file, bytes, pdf.numPages);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) processFile(file);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="
        border-dashed
        border-2
        p-10
        text-center
        cursor-pointer
      "
    >
      drag & drop pdf here
      <br />
      or click to upload
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) processFile(file);
        }}
      />
    </div>
  );
}
