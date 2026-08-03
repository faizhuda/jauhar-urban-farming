# jauhar-urban-farming

Website resmi **Jauhar Urban Farming** — profil digital, katalog produk, dan kanal
pemesanan via WhatsApp. Dibangun oleh tim KKNT Inovasi IPB University × IIUM 2026.

**Live:** https://jauharurbanfarming.vercel.app *(TODO: custom domain menyusul — S1-02)*

> ⚠️ Domain di atas HARUS identik dengan `site` di `astro.config.mjs`, `SITE.url` di
> `src/config.ts`, dan `Sitemap:` di `public/robots.txt` — kalau salah satu beda,
> `og:image`/canonical/JSON-LD ikut menunjuk ke URL yang salah dan preview link
> (WhatsApp dll.) gagal tampil (insiden 7 Juli 2026, lihat PRD.md v1.8).

## Tech stack

- [Astro](https://astro.build) 7 (fully static, zero-JS by default)
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Design system **Professional Luxury**: palet Material 3 hijau + aksen emas/champagne,
  tipografi Libre Caslon Text (serif) dan Hanken Grotesk (sans), hero full-bleed,
  splash screen sekali per sesi, scroll-reveal & parallax ringan (hormat
  `prefers-reduced-motion`), token terpusat di `src/styles/global.css`
- Font self-hosted via `@fontsource` (bukan CDN Google Fonts) — nol request pihak ketiga
- Content Collections + Zod untuk data produk & galeri
- `@astrojs/sitemap`, JSON-LD (`LocalBusiness` + `Product`)
- Icon: SVG inline (tanpa icon font), gambar via pipeline `astro:assets`
- Hosting: Vercel (auto-deploy dari branch `main`)

## Menjalankan

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # build produksi ke dist/ + validasi konten
npm run placeholders -- --force   # timpa foto dengan placeholder hijau (JANGAN, kecuali sengaja)
```

## Struktur penting

```
src/config.ts              # SATU sumber kebenaran: nomor WhatsApp, NAP, jam, sosmed
src/styles/global.css      # design tokens: warna & tipografi, ubah tampilan dari sini
src/content/products/      # 1 file .md per produk (lihat docs/content-guide.md)
src/content/gallery/       # 1 file .md per foto galeri
src/assets/                # gambar sumber (maks. 1600px, dioptimasi saat build)
src/pages/                 # index, about, products, gallery, contact, 404
docs/                      # content guide & update guide (materi serah terima mitra)
```

## Dokumen proyek

- [PRD.md](PRD.md) — Product Requirements Document (scope, DoD, SEO, performa)
- [PLANNING.md](PLANNING.md) — sprint planning end-to-end (14 Juli – 11 Agustus 2026)
- [docs/content-guide.md](docs/content-guide.md) — cara mengisi/update konten
- [docs/update-guide.md](docs/update-guide.md) — cara deploy & serah terima
- [docs/image-credits.md](docs/image-credits.md) — sumber & lisensi foto stok (wajib dirawat selama foto Commons dipakai)

> **Catatan:** foto saat ini adalah **stok berlisensi bebas dari Wikimedia Commons**
> (daftar & kewajiban atribusi: [docs/image-credits.md](docs/image-credits.md)) dan
> sebagian teks masih draf dummy. Konten asli dari mitra masuk paling lambat
> 30 Juli 2026 (PLANNING.md §8) — timpa file di `src/assets/` dengan nama yang sama.
