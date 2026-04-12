// components/SplitGroupsPanel.tsx

"use client";

import JSZip from "jszip";

import { splitPDF } from "@/lib/pdfSplit";

import { usePdfStore, SplitGroup } from "@/store/usePdfStore";

export default function SplitGroupsPanel() {
  const groups = usePdfStore((s) => s.groups);

  const splitBytes = usePdfStore((s) => s.buffers?.splitBytes);

  const renameGroup = usePdfStore((s) => s.renameGroup);

  const deleteGroup = usePdfStore((s) => s.deleteGroup);

  async function download(group: SplitGroup): Promise<void> {
    if (!splitBytes) return;

    const blob = await splitPDF(splitBytes, group.pages);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${group.name}.pdf`;

    a.click();

    URL.revokeObjectURL(url);
  }

  async function downloadAll(): Promise<void> {
    if (!splitBytes) return;

    const zip = new JSZip();

    for (const g of groups) {
      const blob = await splitPDF(splitBytes, g.pages);

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
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {groups.map((g: SplitGroup) => (
        <div
          key={g.id}
          className="
            flex flex-col sm:flex-row
            sm:items-center
            gap-3
            border
            rounded-xl
            p-4
            bg-black/5
            shadow-sm
          "
        >
          <input
            value={g.name}
            onChange={(e) => renameGroup(g.id, e.target.value)}
            className="
              flex-1
              border
              rounded-md
              px-3
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-black
            "
          />

          <span
            className="
              text-sm
              text-white
              break-all
              sm:w-48
            "
          >
            pages: {g.pages.join(", ")}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => download(g)}
              className="
                px-3
                py-2
                text-sm
                border
                rounded-md
                hover:bg-gray-800 
                transition
              "
            >
              Download
            </button>

            <button
              onClick={() => deleteGroup(g.id)}
              className="
                px-3
                py-2
                text-sm
                border
                rounded-md
                text-red-600
                hover:bg-gray-800               
                transition
              "
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {groups.length > 0 && (
        <button
          onClick={downloadAll}
          className="
            w-full
            sm:w-fit
            self-end
            px-5
            py-2.5
            rounded-lg
            bg-black
            text-white
            text-sm
            font-medium
            hover:bg-gray-800
            transition
          "
        >
          Download All
        </button>
      )}
    </div>
  );
}
