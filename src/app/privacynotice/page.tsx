"use client";

export default function PrivacyNotice() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Notice</h1>

      <p className="mb-4">
        The site processes PDFs entirely inside the user&apos;s browser.
      </p>
      <p className="mb-4">The PDF never leaves the user&apos;s device.</p>

      <p className="mb-4">All PDF operations happen locally.</p>

      <p className="mb-4">No upload to server.</p>

      <p className="mb-4">No API call.</p>

      <p className="mb-4">No storage.</p>

      <p className="mb-4">No database.</p>

      <p className="mb-4">Everything is client-side nothing is logged.</p>

      <p className="mb-4">Its private and secure.</p>
    </div>
  );
}
