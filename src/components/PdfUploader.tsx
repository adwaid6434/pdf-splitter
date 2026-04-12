// components/PdfUploader.tsx

"use client";

import { usePdfStore } from "@/store/usePdfStore";

export default function PdfUploader() {
  const setFile = usePdfStore((s) => s.setFile);

  async function handleUpload(file: File) {
    // dynamic import prevents SSR crash
    const pdfjsLib = await import("pdfjs-dist");

    const bytes = new Uint8Array(await file.arrayBuffer());

    const pdf = await pdfjsLib.getDocument({
      data: bytes,
    }).promise;

    setFile(file, bytes, pdf.numPages);
  }

  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (file) handleUpload(file);
      }}
    />
  );
}
