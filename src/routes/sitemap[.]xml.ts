import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/tjanster/bemanning", priority: "0.8", changefreq: "monthly" as const },
          { path: "/tjanster/rekrytering", priority: "0.8", changefreq: "monthly" as const },
          { path: "/tjanster/utbildning", priority: "0.8", changefreq: "monthly" as const },
          { path: "/tjanster/change", priority: "0.8", changefreq: "monthly" as const },
          { path: "/karriar", priority: "0.9", changefreq: "monthly" as const },
          { path: "/integritet", priority: "0.3", changefreq: "yearly" as const },
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map(
            (e) =>
              `  <url><loc>${absoluteUrl(e.path)}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
