"use client"; // kalau komponen ini client component

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Card as CardLayout, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"; 
import { DocumentTypes, Post } from "contentlayer/generated";
import { BlogReadMoreButton } from "@/components/custom-ui/blog-read-more.buttont";

export function BlogCard({ item }: { item: DocumentTypes | Post }) {
  // fallback data agar SSR & client sama
  const imageSrc = useMemo(() => item?.image || "/placeholder.png", [item]);
  const title = useMemo(() => item?.title || "Untitled Post", [item]);
  const description = useMemo(() => item?.description || "No description available.", [item]);
  const slug = useMemo(() => item?.slug || "#", [item]);

  return (
    <CardLayout
      key={item?.id || Math.random()}
      className="flex flex-col text-clip rounded-sm border border-border"
    >
      <CardHeader>
        <div className="w-full rounded-xl">
          <Image
            height={250}
            width={250}
            src={imageSrc}
            alt={title}
            className="aspect-[16/9] rounded-t-lg size-full object-cover object-center"
          />
        </div>
      </CardHeader>

      <CardContent className="px-6 md:px-8 md:py-8 lg:px-8 lg:py-4">
        <CardTitle className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
          {title}
        </CardTitle>

        <CardDescription className="mb-3 text-muted-foreground md:mb-4 lg:mb-6 truncate">
          {description}
        </CardDescription>

        <Link href={`/blog/${slug}`} passHref legacyBehavior>
          <a target="_blank" className="mt-5 flex items-center hover:underline">
            <BlogReadMoreButton />
          </a>
        </Link>
      </CardContent>
    </CardLayout>
  );
}
