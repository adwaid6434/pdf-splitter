// components/PdfUploader.tsx

"use client";
import { useState } from "react";
import { usePdfStore } from "@/store/usePdfStore";
import { getPdfjs } from "@/lib/pdfClient";

export default function PdfUploader() {
  const setFile = usePdfStore((s) => s.setFile);
  const [fileName, setFileName] = useState("No file chosen");

  async function processFile(file: File) {
    try {
      setFileName(file.name);
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
    } catch (err) {
      console.error(err);
      alert("Failed to load PDF");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files and no other formats");
      return;
    }

    // if (file) processFile(file);
    processFile(file);
  }

  return (
    <div className="w-full flex justify-center px-4 py-12">
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
          gap-4
          rounded-xl
          border-2
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

            if (!file) return;
            if (file.type !== "application/pdf") {
              alert("Only PDF files allowed");
              return;
            }
            processFile(file);

            // if (file) processFile(file);
          }}
          className="hidden"
        />
        <span className="text-sm text-white-500">{fileName}</span>
      </label>
    </div>
  );
}
