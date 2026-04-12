"use client";

import PdfUploader from "@/components/PdfUploader";
import PageGrid from "@/components/PageGrid";
import CreateSplitButton from "@/components/CreateSplitButton";
import SplitGroupsPanel from "@/components/SplitGroupsPanel";

export default function Home() {
  return (
    <main className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">PDF Splitter</h1>

      <PdfUploader />

      <PageGrid />

      <CreateSplitButton />

      <SplitGroupsPanel />
    </main>
  );
}
