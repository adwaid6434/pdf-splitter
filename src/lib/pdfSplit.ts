// lib/pdfSplit.ts

import { PDFDocument } from "pdf-lib";

export async function splitPDF(pdfBytes: Uint8Array, pages: number[]) {
  const src = await PDFDocument.load(pdfBytes);

  const newDoc = await PDFDocument.create();

  const copied = await newDoc.copyPages(
    src,
    pages.map((p) => p - 1),
  );

  copied.forEach((p) => newDoc.addPage(p));

  const bytes = await newDoc.save();

  return new Blob([bytes], {
    type: "application/pdf",
  });
}
