// components/PdfUploader.tsx

"use client";
"use client";

import { usePdfStore } from "@/store/usePdfStore";
import { getPdfjs } from "@/lib/pdfClient";

export default function PdfUploader() {
  const setFile = usePdfStore((s) => s.setFile);

  async function processFile(file: File) {
    const pdfjs = await getPdfjs();

    const originalBuffer = await file.arrayBuffer();

    const viewerBytes = new Uint8Array(originalBuffer.slice(0));
    const thumbnailBytes = new Uint8Array(originalBuffer.slice(0));
    const splitBytes = new Uint8Array(originalBuffer.slice(0));

    const pdf = await pdfjs.getDocument({
      data: viewerBytes,
    }).promise;

    setFile(
      file,
      {
        viewerBytes,
        thumbnailBytes,
        splitBytes,
      },
      pdf.numPages,
    );
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
      className="border-2 border-dashed p-10 text-center cursor-pointer"
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
        className="mt-3"
      />
    </div>
  );
}
