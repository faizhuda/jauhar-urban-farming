# jauhar-urban-farming

Website resmi **Jauhar Urban Farming** — profil digital, katalog produk, dan kanal
pemesanan via WhatsApp. Dibangun oleh tim KKNT Inovasi IPB University × IIUM 2026.

**Live:** https://jauharurbanfarming.com

**Pengelola konten:** buka `/admin/`, login dengan akun GitHub yang sudah diundang.
Panel Sveltia menyediakan Products, Farm Photos, Farm Stories, Business Information,
dan Page Introductions. Panduan singkat pengelola tersedia di `/admin/help/`.
Perubahan CMS pada 4 Oktober 2026 masih perlu verifikasi login produksi setelah deployment.

Stack: [Astro](https://astro.build) 7 (static) + Tailwind CSS 4, hosting Vercel.

## Menjalankan

```bash
npm ci
npm run dev            # http://localhost:4321
npm test               # regresi draft, validasi CMS, dan keamanan OAuth
npm run check          # pemeriksaan tipe Astro/TypeScript
npm run build          # build produksi ke dist/ + validasi konten
```

## Dokumentasi

Build dan pemeriksaan lokal tidak memerlukan kredensial OAuth. Login GitHub memakai
`OAUTH_GITHUB_CLIENT_ID` dan `OAUTH_GITHUB_CLIENT_SECRET` di environment server Vercel.
Untuk pengujian form tanpa menulis ke GitHub, buka `/admin/?demo=1` saat menjalankan
server development (dialihkan ke `/admin/demo/`). Mode demo tidak tersedia pada build produksi.

Dokumentasi proyek:

- **[PROJECT.md](PROJECT.md)** — requirement, arsitektur, status terkini, definition of done
- **[TODO.md](TODO.md)** — daftar kerjaan yang masih terbuka, per siapa yang mengerjakan
- **[MAINTENANCE.md](MAINTENANCE.md)** — deployment, OAuth, pengujian, pemulihan, dan checklist serah terima
- **[/admin/help/](https://jauharurbanfarming.com/admin/help/)** — panduan singkat berbahasa Inggris untuk pengelola; sumber di `src/pages/admin/help.astro`

`Proposal.md` adalah dokumen proposal resmi KKNT yang disubmit ke IPB (punya lembar pengesahan) — dibiarkan terpisah, bukan dokumentasi teknis yang hidup.
