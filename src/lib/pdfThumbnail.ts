// lib/pdfThumbnail.ts

"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { getPdfjs } from "@/lib/pdfClient";

export async function loadPdfForThumbs(
  pdfBytes: Uint8Array,
): Promise<PDFDocumentProxy> {
  const pdfjs = await getPdfjs();

  return pdfjs.getDocument({
    data: new Uint8Array(pdfBytes.slice(0)),
  }).promise;
}

export async function renderThumbnail(
  pdf: PDFDocumentProxy,
  pageNumber: number,
): Promise<string> {
  const page = await pdf.getPage(pageNumber);

  const viewport = page.getViewport({
    // increasing will make the thumbnail better but also larger in file size, so find a balance
    // scale: 0.7, // perfect balance
    scale: 0.8,
  });

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) throw new Error("Canvas not supported");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: context,
    viewport,
    canvas, // ✅ required in pdfjs v4 types
  }).promise;

  return canvas.toDataURL();
}
