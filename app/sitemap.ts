import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-data";

const routes = [
  "",
  "/particuliers",
  "/particuliers/isolation",
  "/particuliers/chauffage",
  "/particuliers/fenetres",
  "/particuliers/regulation",
  "/particuliers/renovation-globale",
  "/professionnels",
  "/professionnels/tertiaire",
  "/professionnels/industrie",
  "/professionnels/collectif",
  "/collectivites",
  "/grands-comptes",
  "/aides",
  "/contact",
  "/simulateur",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cgu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
