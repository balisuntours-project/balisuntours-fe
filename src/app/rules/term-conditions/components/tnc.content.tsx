"use client";

import { TermConditionsContent } from "../content";

export function TermAndConditionsContentSection() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 lg:p-6">
        {TermConditionsContent.map((section) => (
          <section
            id={section.title}
            key={section.title}
            className="mb-4 scroll-mt-24"
          >
            <h2 className="text-base md:text-lg font-bold">{section.title}</h2>
            <div
              className="text-sm md:text-base px-4 py-2 text-black list-disc list-inside"
              dangerouslySetInnerHTML={{
                __html: section.description,
              }}
            />
          </section>
        ))}
      </main>
    </>
  );
}
