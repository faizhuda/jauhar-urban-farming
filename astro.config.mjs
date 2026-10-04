// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Sumber domain untuk canonical/OG/sitemap/robots.txt via Astro.site.
// Config backend CMS di public/admin/config.yml juga harus mengikuti domain ini.
// PENTING: harus PERSIS sama dengan domain Vercel yang benar-benar live —
// beda satu karakter pun membuat og:image/canonical menunjuk ke URL mati,
// dan preview link (WhatsApp dll.) gagal menampilkan gambar (lihat insiden
// 7 Juli 2026: proyek berganti nama dari jauhar-hub ke jauharurbanfarming).
export default defineConfig({
  site: 'https://jauharurbanfarming.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/admin') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
