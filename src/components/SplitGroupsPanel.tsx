// components/SplitGroupsPanel.tsx
"use client";

import JSZip from "jszip";

import { splitPDF } from "@/lib/pdfSplit";

import { usePdfStore, SplitGroup } from "@/store/usePdfStore";

export default function SplitGroupsPanel() {
  const groups = usePdfStore((s) => s.groups);

  const pdfBytes = usePdfStore((s) => s.pdfBytes);

  const renameGroup = usePdfStore((s) => s.renameGroup);

  const deleteGroup = usePdfStore((s) => s.deleteGroup);

  async function download(group: SplitGroup): Promise<void> {
    if (!pdfBytes) return;

    const blob = await splitPDF(pdfBytes, group.pages);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${group.name}.pdf`;

    a.click();

    URL.revokeObjectURL(url);
  }

  async function downloadAll(): Promise<void> {
    if (!pdfBytes) return;

    const zip = new JSZip();

    for (const g of groups) {
      const blob = await splitPDF(pdfBytes, g.pages);

      zip.file(`${g.name}.pdf`, blob);
    }

    const zipBlob = await zip.generateAsync({
      type: "blob",
    });

    const url = URL.createObjectURL(zipBlob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "splits.zip";

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      {groups.map((g: SplitGroup) => (
        <div key={g.id} className="flex gap-2 items-center">
          <input
            value={g.name}
            onChange={(e) => renameGroup(g.id, e.target.value)}
            className="border px-2 py-1"
          />

          <span className="text-sm">
            pages:
            {g.pages.join(", ")}
          </span>

          <button onClick={() => download(g)} className="border px-2 py-1">
            download
          </button>

          <button
            onClick={() => deleteGroup(g.id)}
            className="border px-2 py-1"
          >
            delete
          </button>
        </div>
      ))}

      {groups.length > 0 && (
        <button
          onClick={downloadAll}
          className="
            bg-black
            text-white
            px-4 py-2
          "
        >
          download all
        </button>
      )}
    </div>
  );
}
