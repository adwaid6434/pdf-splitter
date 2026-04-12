// components/SplitGroupsPanel.tsx

"use client";

import { splitPDF } from "@/lib/pdfSplit";
import { usePdfStore } from "@/store/usePdfStore";

export default function SplitGroupsPanel() {
  const groups = usePdfStore((s) => s.groups);
  const pdfBytes = usePdfStore((s) => s.pdfBytes);

  async function download(group) {
    const blob = await splitPDF(pdfBytes!, group.pages);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${group.name}.pdf`;

    a.click();
  }

  return (
    <div>
      {groups.map((g) => (
        <div key={g.id}>
          <input defaultValue={g.name} />

          <button onClick={() => download(g)}>download</button>
        </div>
      ))}
    </div>
  );
}
