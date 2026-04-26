import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 0

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://zalada.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
