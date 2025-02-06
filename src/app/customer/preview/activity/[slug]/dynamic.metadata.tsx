import { ActivityAction } from "@/app/actions/activity/action";
import { DetailActivityParamater } from "@/app/paramaters/activity/paramater";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<DetailActivityParamater>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  // Fetch activity data from API
  const response = await ActivityAction.GetPreviewActivityMetadata(slug);

  const activity = response.data;

  return {
    title: activity.meta_title,
    robots: {
      index: true,
      follow: true
    },
    keywords: activity.meta_keyword,
    description: activity.meta_description ?? "", // Default to empty if null
    openGraph: {
      title: activity.og_title ?? activity.meta_title, // Fallback to meta_title if og_title is null
      description: activity.og_description
        ? activity.og_description
        : activity.meta_description ?? "", // Fallback to meta_description if og_description is null
      images: activity.og_image
        ? Array.isArray(activity.og_image)
          ? [activity.og_image]
          : activity.og_image
        : [], // Use og_image or an empty array
    },
    alternates: {
      canonical: activity.canonical_url, // Canonical URL
    },
    twitter: {
      card: "summary_large_image",
      title: activity.meta_title,
      description: activity.og_description
        ? activity.og_description
        : activity.meta_description ?? "",
      images: activity.og_image ? [activity.og_image] : [],
    },
  };
}
