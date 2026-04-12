// lib/pdfSplit.ts

import { PDFDocument } from "pdf-lib";

export async function splitPDF(
  pdfBytes: Uint8Array,
  pages: number[],
): Promise<Blob> {
  const srcDoc = await PDFDocument.load(pdfBytes);

  const newDoc = await PDFDocument.create();

  const copiedPages = await newDoc.copyPages(
    srcDoc,
    pages.map((p) => p - 1),
  );

  copiedPages.forEach((page) => newDoc.addPage(page));

  const newBytes = await newDoc.save();

  // force standard ArrayBuffer
  const safeBuffer = new ArrayBuffer(newBytes.length);

  new Uint8Array(safeBuffer).set(newBytes);

  return new Blob([safeBuffer], {
    type: "application/pdf",
  });
}
