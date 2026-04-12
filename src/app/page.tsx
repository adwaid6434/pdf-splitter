// "use client";

// import PdfUploader from "@/components/PdfUploader";
// import PageGrid from "@/components/PageGrid";
// import CreateSplitButton from "@/components/CreateSplitButton";
// import SplitGroupsPanel from "@/components/SplitGroupsPanel";

// export default function Home() {
//   return (
//     <main className="p-10 space-y-8">
//       <h1 className="text-2xl font-bold">PDF Splitter</h1>
//       <p className="text-gray-500 ">
//         Choose pages and download instantly — fast, simple, free.
//       </p>

//       <PdfUploader />

//       <PageGrid />

//       <p className="text-gray-500 ">
//         *Dont worry about the quality of the split pdfs, they will be just as
//         good as the original.
//       </p>
//       <p className="text-gray-500 ">
//         The images here are only for rendering the preview and thumbnails.*
//       </p>
//       <CreateSplitButton />
//       <SplitGroupsPanel />
//     </main>
//   );
// }

"use client";

import PdfUploader from "@/components/PdfUploader";
import PageGrid from "@/components/PageGrid";
import CreateSplitButton from "@/components/CreateSplitButton";
import SplitGroupsPanel from "@/components/SplitGroupsPanel";

export default function Home() {
  return (
    <main className="p-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Split PDF in seconds
        </h1>

        <p className="text-gray-600 text-lg">
          Select pages, create groups, and download instantly. Fast, simple, and
          completely free.
        </p>
      </header>

      <section className="space-y-6">
        <PdfUploader />

        <div className="space-y-2">
          <PageGrid />

          <p className="text-sm text-gray-500">
            Preview thumbnails are compressed for speed. Your final PDF will
            keep the original quality.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <CreateSplitButton />

        <SplitGroupsPanel />
      </section>
    </main>
  );
}
