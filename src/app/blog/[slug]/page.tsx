import React from "react";
import Link from "next/link";

import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO, isValid } from "date-fns";
import { LargeNavbar } from "@/app/global-components/large.navbar";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { allPosts } from ".contentlayer/generated";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  return { title: post.title, description: post.description, keywords: post.keywords ?? "" };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <LargeNavbar />
      <main className="mt-16 pt-11 pb-16 lg:pt-16 lg:pb-24">
        <div className="flex flex-col justify-between px-4 mx-auto max-w-screen-xl">
          <Image
            src={post?.image}
            alt={post.title}
            height={650}
            width={1224}
            className="rounded-t-lg bg-fixed h-[300px] md:h-[650px] w-full bg-origin-content object-cover  bg-cover bg-no-repeat p-2"
          />

          <article className="my-12 prose prose-slate prose-headings:text-primary prose-lead:text-secondary-foreground prose-ol:text-primary prose-ul:text-primary prose-a:text-primary prose-p:text-primary dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
            <h1 className="text-3xl font-extrabold mb-2 lg:text-6xl text-primary">
              {post.title}
            </h1>
            <p className="lead font-bold">{post.description}</p>

            <div className="flex items-center justify-between mt-4 mb-6 not-italic">
              <Link
                href={`#`}
                rel="author"
                className="no-underline"
              >
                Published By {post?.author}
              </Link>

              <time
                dateTime={post.date}
                title={
                  isValid(parseISO(post.date))
                    ? format(parseISO(post.date), "MMM dd, yyyy")
                    : "Invalid date"
                }
                className="text-base text-primary"
              >
                {isValid(parseISO(post.date))
                  ? format(parseISO(post.date), "MMM dd, yyyy")
                  : "Invalid date"}
              </time>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post?.body?.html }} />
          </article>
        </div>
      </main>
      <hr />
      <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
        <LandingPageFooterSection />
      </div>
    </>
  );
}
