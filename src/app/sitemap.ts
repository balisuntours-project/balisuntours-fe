import type { MetadataRoute } from 'next'
import { ActivityAction } from './actions/activity/action'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 
  const activitySlugs = await ActivityAction.GetActivityDetailSitemap()
 
  return [
    // Halaman statis
    {
      url: 'http://localhost:3000',
      lastModified: new Date(),
      changeFrequency: 'yearly', // Pastikan menggunakan salah satu dari tipe yang diizinkan
      priority: 1,
    },
    {
      url: 'http://localhost:3000/about',
      lastModified: new Date(),
      changeFrequency: 'monthly', // Sama seperti di atas
      priority: 0.8,
    },
    // Halaman dinamis dengan slug
    ...activitySlugs.data.map(activity => ({
      url: `http://localhost:3000/customer/preview/activity/${activity.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly', // Type assertion jika perlu
      priority: 0.6,
      images: activity.images.map(image => image.path)
    })),
  ]
}
