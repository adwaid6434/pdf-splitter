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
    <main className="p-10 space-y-10">
      {/* LEFT */}
      <header className="space-y-1 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Split PDF in seconds
        </h1>
        <p className="text-gray-600 text-sm">
          Select pages, create groups, and download instantly. Fast, secure, and
          completely free.
        </p>
      </header>

      {/* CENTER */}
      <section className="space-y-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <PdfUploader />
        </div>
      </section>
      <PageGrid />

      {/* LEFT */}
      <section className="space-y-4 max-w-xl">
        <CreateSplitButton />
      </section>
      <SplitGroupsPanel />
    </main>
  );
}
