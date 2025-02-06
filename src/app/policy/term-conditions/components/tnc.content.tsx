"use client";

import "../../../styles/styled-ul.css";

export function TermAndConditionsContentSection({
  content,
}: {
  content: string;
}) {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 lg:p-6">
        <section className="mb-4">
          <div
            className="prose-ol:list-disc prose-sm md:prose-base px-4 py-2 text-black"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </section>
      </main>
    </>
  );
}
