// components/PdfUploader.tsx

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
    <div className="w-full flex justify-center px-4 py-10">
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="
          w-full
          max-w-xl
          flex
          flex-col
          items-center
          justify-center
          gap-3
          border
          border-gray-300
          rounded-xl
          p-10
          text-center
          cursor-pointer
          transition
          focus-within:ring-2
          focus-within:ring-black
        "
      >
        <span className="text-lg font-medium">Drag & drop PDF here</span>

        <span className="text-sm text-gray-500">or click to upload</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) processFile(file);
          }}
          className="
            mt-2
            w-full
            text-sm
            file:mr-4
            file:py-2
            file:px-4
            file:border
            file:border-gray-300
            file:rounded-md
            file:bg-white
            file:text-sm
            file:font-medium
            file:cursor-pointer
            hover:file:bg-gray-100
          "
        />
      </label>
    </div>
  );
}
