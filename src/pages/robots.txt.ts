import type { APIRoute } from 'astro';

/**
 * Endpoint, bukan file statis — Sitemap URL ikut Astro.site otomatis,
 * jadi tidak ada lagi domain yang harus disamakan manual di file ini.
 */
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
