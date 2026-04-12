// lib/pdfThumbnail.ts
"use client";

import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export async function loadPdfForThumbs(
  pdfBytes: Uint8Array,
): Promise<pdfjs.PDFDocumentProxy> {
  return await pdfjs.getDocument({
    data: pdfBytes,
  }).promise;
}

export async function renderThumbnail(
  pdf: pdfjs.PDFDocumentProxy,
  pageNumber: number,
): Promise<string> {
  const page = await pdf.getPage(pageNumber);

  const viewport = page.getViewport({
    scale: 0.35,
  });

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) throw new Error("Canvas not supported");

  canvas.width = viewport.width;

  canvas.height = viewport.height;

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;

  return canvas.toDataURL();
}
