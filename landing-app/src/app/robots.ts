import type { MetadataRoute } from "next";

const SITE_URL = "https://www.agrohubjobs.ge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/application"],
      disallow: ["/api/", "/thank-you/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
