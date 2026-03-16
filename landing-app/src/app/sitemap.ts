import type { MetadataRoute } from "next";

const SITE_URL = "https://www.agrohubjobs.ge";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/application`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
