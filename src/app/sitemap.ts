import type { MetadataRoute } from "next";
import { ActivityAction } from "./actions/activity/action";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //
  const activitySlugs = await ActivityAction.GetActivityDetailSitemap();

  const baseUrl = "https://balisuntours.com";
  return [
    // Halaman statis
    {
      url: process.env.APP_URL ?? baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly", // Pastikan menggunakan salah satu dari tipe yang diizinkan
      priority: 1,
    },
    {
      url: `${process.env.APP_URL ?? baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Sama seperti di atas
      priority: 0.8,
    },
    {
      url: `${process.env.APP_URL ?? baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Sama seperti di atas
      priority: 0.8,
    },
    {
      url: `${process.env.APP_URL ?? baseUrl}/charity`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Sama seperti di atas
      priority: 0.8,
    },
    {
      url: `${process.env.APP_URL ?? baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Sama seperti di atas
      priority: 0.8,
    },
    // Halaman dinamis dengan slug
    ...(activitySlugs.success
      ? activitySlugs.data.map((activity) => ({
          url: `${process.env.APP_URL ?? baseUrl}/experiences/${
            activity.slug
          }`,
          lastModified: new Date(),
          // eslint-disable-next-line @typescript-eslint/prefer-as-const
          changeFrequency: "monthly" as "monthly", // Type assertion jika perlu
          priority: 0.6,
          images: activity.images.map((image) => image.path),
        }))
      : []),
  ];
}
