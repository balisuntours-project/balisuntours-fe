import Link from "next/link";
import type { Post, DocumentTypes } from "contentlayer/generated";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import {
  Card as CardLayout,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogReadMoreButton } from "@/components/custom-ui/blog-read-more.buttont";

export function BlogCard({ item }: { item: DocumentTypes | Post }) {
  return (
    <CardLayout
      key={item.id}
      className="flex flex-col text-clip rounded-sm border border-border"
    >
      <CardHeader>
        <div className="w-full rounded-xl">
          <Image
            height={250}
            width={250}
            src={item.image}
            alt={item.title}
            className="aspect-[16/9] rounded-t-lg size-full object-cover object-center"
          />
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8 md:px-8 md:py-10 lg:px-8 lg:py-12">
        <CardTitle className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
          {item.title}
        </CardTitle>
        <CardDescription className="mb-3 text-muted-foreground md:mb-4 lg:mb-6 truncate">
          {item.description}{" "}
        </CardDescription>
        <Link
          passHref
          legacyBehavior
          href={`/blog/${item.slug}`}
          className="mt-5 flex items-center hover:underline"
        >
         <a target="_blank">
         <BlogReadMoreButton />
         </a>
        </Link>
      </CardContent>
    </CardLayout>
  );
}
