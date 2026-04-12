import type * as PDFJS from "pdfjs-dist";

type PdfJsType = typeof PDFJS;

let pdfjsPromise: Promise<PdfJsType> | null = null;

export async function getPdfjs(): Promise<PdfJsType> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/build/pdf.mjs").then(
      (mod) => (mod.default ?? mod) as PdfJsType,
    );

    const pdfjs = await pdfjsPromise;

    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }

  return pdfjsPromise;
}
