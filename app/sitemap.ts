import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getServiceSlugs } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl;
  const now  = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/pricing`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`,        lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    // Note: /book intentionally excluded — funnel step, noindexed.
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getServiceSlugs().map(({ slug }) => ({
    url:             `${base}/services/${slug}`,
    lastModified:    now,
    changeFrequency: "monthly",
    priority:        0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
