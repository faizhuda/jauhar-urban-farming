// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SATU-SATUNYA tempat domain situs ditulis — canonical/OG/sitemap/robots.txt
// semuanya membaca `site` ini via Astro.site, tidak ada salinan manual lain.
// PENTING: harus PERSIS sama dengan domain Vercel yang benar-benar live —
// beda satu karakter pun membuat og:image/canonical menunjuk ke URL mati,
// dan preview link (WhatsApp dll.) gagal menampilkan gambar (lihat insiden
// 7 Juli 2026: proyek berganti nama dari jauhar-hub ke jauharurbanfarming).
export default defineConfig({
  site: 'https://jauharurbanfarming.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
