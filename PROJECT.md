# Jauhar Urban Farming — Project Documentation

|                  |                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Program**      | KKNT Inovasi IPB University × Jauhar Urban Farming, IIUM Gombak (14 Juli – 11 Agustus 2026)                          |
| **Repo**         | [`faizhuda/jauhar-urban-farming`](https://github.com/faizhuda/jauhar-urban-farming)                                  |
| **Live**         | https://jauharurbanfarming.com                                                                                       |
| **Stack**        | Astro 7 (static) + Tailwind CSS 4, hosted di Vercel                                                                  |
| **Tim teknis**   | 1 dari 8 anggota tim KKN (Faiz, Ilmu Komputer)                                                                       |
| **Dokumen lain** | [TODO.md](TODO.md) · [MAINTENANCE.md](MAINTENANCE.md) · [Proposal.md](Proposal.md) _(proposal resmi KKNT, terpisah)_ |

Dokumen ini adalah **satu-satunya sumber kebenaran** untuk requirement, arsitektur, dan status proyek — menggantikan `PRD.md` dan `PLANNING.md` yang sebelumnya terpisah dan mudah jadi tidak sinkron satu sama lain.

---

## 1. Ringkasan

`jauhar-urban-farming` adalah website resmi Jauhar Urban Farming: profil digital, katalog produk, dan kanal pemesanan sederhana via **WhatsApp click-to-order**. Halaman publik dibangun statis dengan Astro; dua endpoint server menangani login CMS, tanpa database konten. Biaya hosting mengikuti paket dan pemakaian penyedia, bukan jaminan gratis selamanya.

**Konteks yang membentuk keputusan teknis:**

- Hanya 1 dari 8 anggota tim berkompetensi teknis → arsitektur harus sesederhana mungkin
- Durasi pelaksanaan cuma 4 minggu → prioritas kelengkapan konten & kestabilan, bukan fitur canggih berisiko
- Mitra (Jauhar) akan mengelola website ini sendiri setelah KKN selesai → semua keputusan mempertimbangkan kemudahan maintenance jangka panjang

Proker awal ("Jauhar Urban Farming 2.0") mencakup dua pilar: monitoring kebun berbasis **IoT** dan **business sustainability development**. Pilar IoT/Telegram Bot **tidak dikerjakan dalam bentuk apa pun** oleh tim teknis — seluruh bandwidth developer terpusat ke website ini, yang scope-nya diperluas untuk menutup gap tersebut (SEO menyeluruh, optimasi performa, siap ditemukan di pencarian klasik maupun AI search). Visi/Misi di halaman About tetap merefleksikan ambisi _smart farming_ berbasis IoT milik program secara keseluruhan, meski website-nya sendiri tidak mengimplementasikan sensor/IoT apa pun.

---

## 2. Status Saat Ini (per 4 Oktober 2026)

Revisi CMS untuk pengelola non-teknis mengganti Decap dengan **Sveltia 0.227.3**,
form mobile, pilihan Draft/Published, preview, optimasi upload, informasi usaha dan
pengantar halaman yang bisa diedit. Build tidak lagi bergantung pada secret OAuth.
Implementasi dan pengujian lokal selesai pada revisi ini; login/upload/publikasi nyata
tetap perlu diperiksa setelah deployment. Panduan pengelola berada di `/admin/help/`;
detail teknis dan checklist produksi berada di [MAINTENANCE.md](MAINTENANCE.md).

### ✅ Sudah selesai

- 8 halaman live: Home, About, Products, Gallery, Contact, Journal (index + detail per artikel), 404
- Design system **Professional Luxury**: palet Material 3 hijau + aksen emas/champagne, tipografi Libre Caslon Text + Hanken Grotesk, hero full-bleed, scroll-reveal progressive enhancement, dan parallax ringan (splash screen overlay dihapus total demi optimasi LCP & touch mobile tanpa halangan z-index)
- Logo asli Jauhar terpasang (header + favicon), diproses jadi lingkaran bersih tanpa shadow
- Nomor WhatsApp, alamat, jam buka dan Instagram berada di `src/data/business.json`; `src/config.ts` membaca data tervalidasi tersebut untuk seluruh tampilan dan JSON-LD.
- **Katalog saat ini**: Fresh Cucumber (RM3/kg), Pick-Your-Own Farm Tour (RM3/kg yang dipetik; tur dan petik gratis), serta Fresh Rock Melon (RM13/kg, ditambahkan pengelola lewat CMS). Ketiganya published tetapi sedang unavailable pada data terbaru; perubahan ini mempertahankan status tersebut. Produk eksperimen yang diputuskan tidak dijual pada 5 Agustus sudah dihapus dari repo.
- NAP (Name/Address/Phone) disamakan persis dengan listing Google Maps yang sudah ada ("Jauhar Urban Farming's Site") — alamat resmi: Mahallah Halimah, 50728 Kuala Lumpur, WP Kuala Lumpur
- Pin Maps presisi di halaman Contact
- Kredit kolaborasi: Mahallah Halimah · Siddiq · Maryam, CITRA IIUM, dan NAFAS (Persatuan Peladang Malaysia) — lengkap dengan logo asli di halaman About
- SEO on-site: meta title/description unik, canonical, Open Graph + Twitter Card, JSON-LD (`LocalBusiness`, `Product` per produk published, `BlogPosting` ×3), sitemap halaman publik, `robots.txt`, serta header keamanan di `vercel.json`. Halaman admin dan panduan noindex dan tidak masuk sitemap.
- **Keamanan & Stabilitas**: security headers (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`), Dependabot alerts + auto security fixes aktif, branch protection di `main`, CI build-check di setiap push/PR. Hasil audit dependency harus diukur ulang setelah setiap perubahan paket.
- Vercel Analytics + Speed Insights terpasang dan merekam data
- **Stabilitas produksi & animasi (Progressive Enhancement)**: baseline CSS scroll-reveal dibuat **100% visible by default (`opacity: 1`)**; kelas `.js-reveal` hanya ditambahkan secara dinamis jika JS & `IntersectionObserver` aktif — menjamin konten tidak pernah kosong/hilang meski JS gagal/terhambat. Script tombol hamburger mobile menggunakan `<script is:inline>` agar dapat dijalankan secara instan tanpa bergantung pada module bundler.
- CI berjalan di Node 22 (mengikuti syarat minimum Astro 7)
- **The Harvest Journal (`/journal`) berisi 3 artikel asli & live** (`draft: false`), semua ditulis dari fakta sungguhan (foto asli + caption Instagram resmi Jauhar): "When Our Volunteer Teams First Met" (15 Jul, tim KKN-T IPB University 2026 bertemu student caretakers), "An IoT Farming Technology Workshop" (16 Jul, Dr. Mohd Shahrin Abu Hanifah, Kulliyyah of Engineering), "Workshopping Our Rock Melon Business Model" (23 Jul, Prof. Dr. Nurazzura binti Mohamad Diah, AHAS Kulliyyah). Artikel dummy lama sudah dihapus dari repo. Koleksi dikelola melalui Farm Stories.
- **Seluruh foto di situs sekarang foto asli Jauhar** (hero tiap halaman, ketiga kartu tim About, dan 13 galeri) — dipilih & di-crop lewat `scripts/prepare-photo.mjs` / sharp langsung, EXIF/GPS otomatis terbuang. Galeri mendokumentasikan sistem JFI (IoT monitoring & kontrol pompa milik Jauhar sendiri, termasuk sesi mentor IoT menjelaskannya), kangkung/rockmelon musim ini, donasi hasil panen ke Warung Makan Sahabat, kunjungan advisor universitas, dan kegiatan komunitas/sekolah. Dua slot galeri yang tadinya stok Wikimedia (`campus-bazaar`, `drip-lines`) dihapus 5 Agu 2026 alih-alih dipaksa dipertahankan tanpa foto asli yang layak — halaman `/credits` & kredit atribusinya ikut dihapus karena sudah tidak ada lagi foto stok di situs. About "Our story" sekarang pakai foto lahan kosong yang cocok temanya, dan kartu tim "Community volunteers" menyebut eksplisit **KKN-T IPB University 2026**

### ⏳ Belum selesai (bergantung pihak eksternal/Jauhar)

- **Domain custom aktif** sejak 6 Agustus 2026: `jauharurbanfarming.com`.
- **Google Business Profile belum diklaim** — listing sudah ada di Maps tapi auto-generated/belum dikuasai pihak Jauhar
- Google Search Console terverifikasi dan sitemap disubmit 6 Agustus 2026, berdasarkan catatan TODO.
- **Migrasi Sveltia CMS** — implementasi siap; verifikasi login, media lama dan publikasi produksi masih diperlukan setelah deployment.
- Sesi pelatihan resmi ke mitra & serah terima dokumen belum dilaksanakan

Rincian aksi per item ada di [TODO.md](TODO.md).

---

## 3. Definition of Done

- [x] Website live di domain custom
- [x] Seluruh halaman inti terisi konten & foto asli — bukan stok/placeholder
- [x] Responsif penuh di mobile/tablet/desktop, tanpa horizontal scroll di 375px
- [ ] Core Web Vitals hijau di domain final (LCP <2.5s, CLS <0.1, INP <200ms)
- [ ] Lighthouse Performance >90 (mobile) di domain final
- [x] Tombol "Pesan/Book via WhatsApp" berfungsi dengan template pesan sesuai produk
- [x] SEO on-site lengkap & konsisten dengan isi aktual halaman
- [x] JSON-LD `LocalBusiness`, `Product`, `BlogPosting` terpasang dan sesuai data yang tampil
- [x] Google Search Console terverifikasi, sitemap ter-submit (catatan 6 Agustus 2026)
- [ ] Google Business Profile diklaim & terverifikasi
- [x] Analytics terpasang (Vercel Analytics + Speed Insights)
- [ ] Minimal 1 sesi pelatihan resmi ke mitra
- [x] Dokumentasi lengkap di repo (dokumen ini + TODO.md + MAINTENANCE.md)

---

## 4. Ruang Lingkup

**In scope:** website profil 5+ halaman inti, katalog produk dengan WhatsApp ordering, galeri, The Harvest Journal, SEO menyeluruh (on-site + structured data + sinyal eksternal), optimasi performa & mobile, pelatihan & serah terima ke mitra.

**Out of scope (siklus ini):**

- E-commerce penuh (keranjang belanja, payment gateway) — WhatsApp ordering adalah pengganti proporsional untuk skala UMKM ini
- Sistem IoT dalam bentuk apa pun di dalam website — dihentikan sepenuhnya dari proker teknis
- Multi-bahasa (situs 100% English, keputusan tim 5 Juli 2026)
- Admin dashboard dengan database sendiri — pendekatannya Sveltia CMS (Git-based, tanpa database) di Section 8

---

## 5. Arsitektur

Static site murni — Astro meng-compile seluruh halaman jadi HTML statis saat build, di-serve langsung oleh Vercel CDN. Tidak ada server, database, atau proses backend yang perlu dirawat.

```
/                 Home       — hero, produk unggulan, cara order   [JSON-LD LocalBusiness]
/about            About      — sejarah, visi-misi, tim, partners
/products         Products   — katalog, tombol WhatsApp per item   [JSON-LD Product]
/gallery          Gallery    — dokumentasi kegiatan + lightbox
/journal          Journal    — daftar artikel The Harvest Journal
/journal/[slug]   Journal    — detail artikel                      [JSON-LD BlogPosting]
/contact          Contact    — Maps embed, jam operasional, WhatsApp
/404              Not Found
```

**Prinsip:** konten (produk, galeri, artikel) dikelola lewat **Astro Content Collections** dengan schema Zod — terpisah dari markup, tervalidasi otomatis saat build (harga wajib angka, foto & alt text wajib ada). Kesalahan input gagal build dengan pesan jelas, bukan merusak situs live.

### Struktur repo

```
src/
├── pages/                  # index, about, products, gallery, journal/, contact, 404, robots.txt.ts
├── layouts/BaseLayout.astro  # <head> bersama: meta, OG/Twitter, font preload
├── components/             # Header, Footer, ProductCard, PageHero, Icon, WhatsAppCta, WhatsAppIcon, JsonLd
├── config.ts                # SATU sumber kebenaran: nomor WA, NAP, jam, sosmed, geo, LocalBusiness JSON-LD
├── content.config.ts        # schema Zod: products, gallery, journal
├── content/products/_drafts/  # kosong saat ini — mekanisme exclude siap dipakai lagi kalau ada produk eksperimen baru
├── content/{products,gallery,journal}/   # 1 file .md per item
├── utils/                    # date.ts (format tanggal), image.ts (sizes grid kartu)
├── styles/global.css        # design tokens + animasi fail-safe
└── assets/                  # gambar sumber — seluruhnya foto asli Jauhar sejak 5 Agu 2026
public/                      # favicon (dari logo asli)
scripts/                     # prepare-photo.mjs (resize/crop foto baru), generate-favicons.mjs
.github/                     # dependabot.yml, workflows/build-check.yml (npm run check lalu build)
vercel.json                  # security headers (bukan CSP — lihat Section 10)
```

---

## 6. Spesifikasi Fungsional

| ID  | Requirement                                                            | Status                                                  |
| --- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| F1  | Profil lengkap Jauhar (sejarah, visi-misi, kegiatan)                   | ✅                                                      |
| F2  | Katalog produk: foto, nama, deskripsi, harga                           | ✅                                                      |
| F3  | Tombol "Pesan/Book via WhatsApp" dengan pesan template otomatis        | ✅                                                      |
| F4  | Galeri dokumentasi kegiatan kebun                                      | ✅ (13 foto, semuanya asli)                             |
| F5  | Kontak: lokasi (Maps embed), jam operasional, kontak resmi             | ✅                                                      |
| F6  | Custom domain, optimal di mobile                                       | Domain aktif; uji perangkat fisik tetap masuk checklist |
| F7  | Halaman blog/artikel edukasi (The Harvest Journal)                     | ✅ (3 artikel asli live)                                |
| F8  | Admin panel Git-based untuk produk/galeri/journal, pengaturan dan hero | Sveltia diimplementasikan; uji produksi setelah deploy  |

## 7. Spesifikasi Non-Fungsional

| ID  | Requirement                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------- |
| NF1 | **Fully static** — tanpa backend/database, maintenance minim                                                  |
| NF2 | **Zero-JS by default** — JS hanya untuk komponen interaktif                                                   |
| NF3 | **Core Web Vitals hijau** — LCP <2.5s, CLS <0.1, INP <200ms mobile                                            |
| NF4 | **Content-first** — data dikelola via Content Collections                                                     |
| NF5 | **SEO-ready** — semantic HTML, meta lengkap, structured data, sitemap                                         |
| NF6 | **Dapat dirawat mandiri** — panduan ditulis untuk non-developer                                               |
| NF7 | **Mobile-first** — mayoritas pengunjung diasumsikan dari HP                                                   |
| NF8 | **Fail-safe by default** — konten kritis (teks, gambar) tidak boleh bergantung pada JS/animasi untuk terlihat |

---

## 8. Tech Stack

| Layer              | Teknologi                                                         | Alasan                                                                       |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Framework          | Astro 7 (static output)                                           | Content Collections tervalidasi; CMS dibundel hanya di admin                 |
| Styling            | Tailwind CSS 4 (`@tailwindcss/vite`)                              | Styling cepat & konsisten                                                    |
| Data               | Astro Content Collections + Zod                                   | Validasi otomatis, kurangi human error input non-teknis                      |
| Gambar             | `astro:assets` (`<Image />`)                                      | Auto WebP/AVIF, srcset, dimensi eksplisit → CLS ≈ 0                          |
| Sitemap            | `@astrojs/sitemap`                                                | Auto-generate saat build                                                     |
| Analytics          | `@vercel/analytics` + `@vercel/speed-insights`                    | Data pengunjung & performa real-user                                         |
| Hosting            | Vercel (auto-deploy dari `main`)                                  | Gratis, SSL otomatis                                                         |
| Font               | Libre Caslon Text + Hanken Grotesk, self-hosted via `@fontsource` | Nol request pihak ketiga, tidak block FCP                                    |
| CMS                | `@sveltia/cms` 0.227.3 + dua endpoint OAuth Astro                 | GitHub login dengan state, PKCE dan validasi opener; tanpa paket OAuth lama  |
| Type checking      | TypeScript 6.x + `@astrojs/check` (`npm run check`)               | `tsconfig.json` strict sekarang benar-benar ditegakkan, bukan cuma di editor |
| Formatting         | Prettier + `prettier-plugin-astro` (`npm run format`, opt-in)     | Konsistensi gaya kode; belum dijalankan ke seluruh repo sekaligus            |
| CI                 | GitHub Actions (`build-check.yml`), Node 22                       | `npm test`, `npm run check`, `npm run build`; tanpa secret di build          |
| Dependency hygiene | Dependabot (npm + github-actions, mingguan)                       | Update keamanan otomatis                                                     |

---

## 9. SEO

**On-site (semua halaman):** meta title unik ≤60 karakter, meta description unik ≤155 karakter (dan **harus sesuai isi aktual halaman** — pernah ada bug di mana description masih promosikan produk yang sudah disembunyikan, sudah diperbaiki), canonical tag, semantic HTML, alt text deskriptif, Open Graph + Twitter Card (penting karena kanal promosi utama mitra adalah WhatsApp/Instagram).

**Structured data (JSON-LD):** `LocalBusiness` (dengan `geo`) di Home & Contact, `Product` per item katalog (auto-generate dari Content Collections, hanya produk non-draft), `BlogPosting` per artikel Journal non-draft (3 artikel saat ini) (`og:type` ikut jadi `article`, bukan `website`, khusus halaman ini). Aturan: data JSON-LD wajib persis sama dengan yang tampil di halaman; tidak ada `AggregateRating` sebelum ada ≥3 review asli. Halaman `404` sengaja `noindex` (tidak canonical), tidak masuk sitemap.

**Sinyal eksternal:** Search Console dan link bio Instagram selesai berdasarkan catatan 6 Agustus; klaim Google Business Profile dan konsistensi NAP tetap diperiksa saat serah terima.

---

## 10. Keamanan

- **Security headers** (`vercel.json`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` (CSP header dibersihkan dari pemblokiran inline script Astro)
- **Dependabot**: vulnerability alerts + automated security fixes aktif di level repo GitHub, plus `dependabot.yml` untuk PR update mingguan
- **Branch protection** di `main`: force-push dan delete branch diblokir (tanpa wajib PR review, supaya alur edit-langsung-di-GitHub untuk mitra tetap simpel)
- **CI**: `build-check.yml` menjalankan `npm test`, `npm run check`, dan `npm run build` di setiap push/PR ke `main`. Secret OAuth hanya diperlukan pada runtime login Vercel.
- Audit npm 4 Oktober: tidak ada critical setelah patch kompatibel; 3 high masih berasal dari satu advisory upstream `http-cache-semantics`, dengan penilaian pemakaian dan tindak lanjut di MAINTENANCE.
- Tidak ada secret di repo; `.env` di-gitignore
- Halaman publik tidak menerima form pelanggan; endpoint login CMS tetap perlu perawatan keamanan. State/PKCE, cookie HttpOnly, validasi akses repo dan origin popup diuji otomatis.

---

## 11. Performa & Mobile

Target: **Core Web Vitals hijau di mobile** (LCP <2.5s, CLS <0.1, INP <200ms), Lighthouse Performance >90. Implementasi: gambar via `astro:assets` (WebP/AVIF, srcset, dimensi eksplisit, lazy load di bawah lipatan, eager+`fetchpriority=high` untuk hero), font self-hosted, zero-JS default, CSS di-purge otomatis oleh Tailwind.

Mobile: breakpoints `sm/md/lg` (640/768/1024px), target sentuh ≥44×44px, tanpa horizontal scroll di 360-375px (diverifikasi di semua 8 halaman), hamburger menu menggunakan `<script is:inline>` dengan tap-outside + Escape untuk menutup.

---

## 12. Tim & Peran

| Peran                      | Jumlah | Tanggung jawab                                                        |
| -------------------------- | ------ | --------------------------------------------------------------------- |
| Web Lead (Faiz)            | 1      | Development, SEO teknis, keamanan, performa, deploy, dokumentasi      |
| Content & Copywriting      | 2      | Teks profil & produk, riset kata kunci lokal                          |
| Photography & Videography  | 2      | Foto produk & kebun, standar resize ≤1600px                           |
| Community & Mitra Liaison  | 2      | Wawancara mitra, pengurusan Google Business Profile, jadwal pelatihan |
| Business & Impact Analysis | 1      | Riset harga, narasi economic empowerment untuk laporan akhir          |

## 13. Risiko

| Risiko                                       | Mitigasi                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| Konten asli dari mitra terlambat             | Development jalan dengan data dummy/stok ber-schema valid; swap belakangan              |
| Mitra kesulitan update pasca-KKN             | Form Sveltia + panduan singkat `/admin/help/` + pelatihan nyata                         |
| Nomor WA berubah pasca-handover              | Menu Business Information; data tunggal `src/data/business.json`                        |
| Domain lupa diperpanjang                     | Dicatat di checklist serah terima (MAINTENANCE.md)                                      |
| Konten kritis hilang karena bug JS/animasi   | Sudah dimitigasi: progressive enhancement `html.js-reveal` (default visible, Section 2) |
| Dependency jadi rentan setelah tim KKN bubar | Dependabot alerts otomatis, tidak perlu ada yang manual cek                             |

## 14. Anggaran (estimasi KKNT)

| Kategori                                     | Estimasi       |
| -------------------------------------------- | -------------- |
| Domain .com 1 tahun                          | Rp 200.000     |
| Hosting (Vercel, gratis)                     | Rp 0           |
| Bahan habis pakai (properti foto, ATK)       | Rp 70.000      |
| Perjalanan (wawancara, sesi foto, pelatihan) | Rp 100.000     |
| Lain-lain (stiker QR, kontingensi)           | Rp 130.000     |
| **Total**                                    | **Rp 500.000** |

---

## 15. Riwayat Perubahan Utama

- **7 Jul 2026** — Proyek dialihkan sepenuhnya dari sistem monitoring IoT (`kebun-pulse`) ke website; tech stack difinalisasi ke Astro; desain berevolusi ke "Professional Luxury"; domain Vercel berganti nama dari `jauhar-hub` ke `jauharurbanfarming` (sempat merusak social share preview, sudah diperbaiki)
- **Akhir Jul – awal Agu 2026** — Foto placeholder hijau diganti stok Wikimedia Commons (sementara, menunggu foto asli); font self-hosted; skala responsif diperbaiki di berbagai viewport
- **3 Agu 2026** — Audit & optimasi menyeluruh:
  1. Security headers & Dependabot aktif, CI Node 22, WhatsApp/NAP/domain disamakan dengan Google Maps asli, katalog produk disamakan dengan realita bisnis (hanya Fresh Cucumber + Farm Tour), logo asli terpasang, kredit kolaborasi (CITRA IIUM, NAFAS) ditambahkan, The Harvest Journal diluncurkan.
  2. Perbaikan stabilitas UI & Mobile: Layar splash screen overlay (`#splash`) dihapus total demi performa LCP & kenyamanan touch mobile. Animasi scroll-reveal diubah menjadi **progressive enhancement (`html.js-reveal`)** sehingga baseline CSS adalah 100% visible — menjamin tidak ada layar kosong / animasi "plop" 12s jika JS terhambat. Script hamburger menu dikonversi ke `<script is:inline>` agar dapat dijalankan secara instan di peramban seluler tanpa bergantung pada module bundler atau restriksi CSP. Dokumentasi proyek terpusat di `PROJECT.md`, `TODO.md`, dan `MAINTENANCE.md`.
- **3 Agu 2026 (lanjutan)** — Audit produksi menyeluruh + perbaikan pre-flight sebelum lanjut ke domain/GBP/foto:
  1. **Blocker konten**: 2 artikel Journal dengan teks `DUMMY PLACEHOLDER` di meta description (sudah ter-index di sitemap) disembunyikan lewat field `draft` baru di schema journal/gallery; NAP "Selangor" yang bertabrakan dengan JSON-LD diselaraskan ke "Kuala Lumpur"; halaman `404` di-`noindex`; tabrakan `order` di katalog produk diperbaiki; folder `images/` (369MB, 166 foto asli belum ditriase) masuk `.gitignore` sebelum sempat ter-commit.
  2. **Kewajiban lisensi**: tabel kredit foto Wikimedia (CC BY/BY-SA) dipindah dari `MAINTENANCE.md` (tidak pernah disajikan ke pengunjung) ke `src/data/photo-credits.ts`, dirender publik di halaman `/credits` baru, tertaut dari footer.
  3. **Satu sumber URL**: `SITE.url` yang mati (tidak pernah dibaca) dihapus dari `config.ts`; `public/robots.txt` statis diganti endpoint `src/pages/robots.txt.ts` yang membaca `Astro.site` — `astro.config.mjs` kini satu-satunya tempat domain situs ditulis.
  4. **Hardening teknis**: `astro check` + TypeScript masuk CI (tsconfig strict yang sudah ada akhirnya benar-benar ditegakkan); Prettier terpasang (belum dijalankan ke seluruh repo); 4 produk eksperimen (belum pasti dijual) dipindah ke `src/content/products/_drafts/`, dikecualikan total dari pipeline gambar astro:assets (−1MB build); font kritis di-preload; focus-visible ditambahkan ke semua varian tombol; bug `src=""` di lightbox galeri (memicu request ganda ke dokumen HTML) diperbaiki; `og:type` & dimensi `og:image` kini akurat per halaman (termasuk artikel Journal).
  5. **Dedup**: tombol WhatsApp di Header (2 lokasi) yang ditulis tangan tanpa ikon kini pakai komponen `WhatsAppCta`; `fullAddress` dan `dateFormatter` yang terduplikasi di 2 file masing-masing disatukan ke `config.ts`/`src/utils/date.ts`; JSON-LD `LocalBusiness` disatukan jadi satu fungsi `localBusinessLd()`, sekarang juga dipasang di halaman Contact (sebelumnya cuma Home) lengkap dengan `geo` coordinates.
  6. **Refactor komponen**: hero full-bleed yang identik di 5 dari 6 halaman disatukan jadi `<PageHero>`; ikon check-circle/arrow-right/close yang berulang (10 kemunculan) disatukan jadi `<Icon>`; string `sizes` grid kartu yang terduplikasi di 3 file disatukan jadi `CARD_GRID_SIZES`. Diverifikasi byte-identik terhadap HTML sebelum-refactor di ke-8 halaman.
- **3 Agu 2026 (foto asli)** — 166 foto asli di `images/` ditinjau satu per satu (8 batch paralel, tiap foto benar-benar dibuka bukan ditebak dari nama file). 11 dari 13 slot foto mendapat kandidat kuat dan langsung dipasang: `hero.jpg`, `about-hero.jpg`, `og-default.jpg`, 2 produk live, dan 6 dari 8 galeri. Script baru `scripts/prepare-photo.mjs` (sharp: resize + crop + buang EXIF/GPS otomatis) dipakai untuk semua 11 — beberapa hasil crop otomatis (attention-strategy) salah fokus ke bangunan/langit alih-alih subjek utama, jadi 8 dari 11 dikerjakan ulang dengan crop manual. `src/data/photo-credits.ts` dan seluruh alt text terkait (About, Home, product frontmatter, gallery frontmatter) disinkronkan ke isi foto yang sebenarnya. 2 slot galeri (`campus-bazaar`, `drip-lines`) tidak punya kandidat kuat di antara 166 foto dan tetap pakai stok — perlu sesi foto baru.
- **4 Agu 2026 (foto baru dari Jauhar)** — Jauhar menambahkan ~18 foto baru ke `src/assets/`. Setiap foto ditinjau langsung (termasuk 2 file `.HEIC` yang tidak bisa dibuka `sharp`, dikonversi lewat pipeline PowerShell + Windows Runtime imaging API). Hasilnya: seluruh hero halaman (Gallery/Products/Contact), ketiga kartu tim di About, dan 7 galeri baru (kangkung/rockmelon musim ini, donasi panen ke Warung Makan Sahabat, sistem JFI, kunjungan advisor universitas, workshop komunitas & sekolah) diganti ke foto asli — menghapus pola pemakaian 1 foto galeri untuk banyak slot berbeda (`morning-harvest.jpg` & `fertigation-rows.jpg` yang sebelumnya dipakai di 3 halaman sekaligus). 2 artikel Journal draf baru ditulis dengan foto asli, About diperbarui menyebut rockmelon/kangkung musim ini.
- **5 Agu 2026 (audit produksi & keputusan final)** — Audit kesiapan produksi menyeluruh sebelum beli domain: header `Strict-Transport-Security` yang sempat kelewat di Fase 0 ditambahkan; script `generate-placeholders.mjs` yang sudah berbahaya (bisa menimpa foto asli dengan placeholder hijau, menunjuk file yang sudah dihapus) dihapus total; `.gitattributes` ditambahkan supaya `npm run format` tidak lagi salah tandai puluhan file akibat drift CRLF di checkout Windows; bug render nyata di Footer (spasi hilang di baris copyright, imbas reformat Prettier) ditemukan & diperbaiki sebelum sempat live. Keputusan final dari Jauhar: 2 slot galeri stok (`campus-bazaar`, `drip-lines`) dihapus alih-alih dipaksa dipertahankan; 4 produk eksperimen (Pickled Cucumber dkk.) **tidak jadi dijual**, filenya dihapus; label tim di About ("Student caretakers" dll.) sengaja generik, tidak perlu nama individu karena pengurus berganti tiap season. Menyusul itu, konten Journal disempurnakan berdasarkan foto & caption Instagram asli Jauhar: artikel "Workshopping Our Business Model" ditulis ulang total (ternyata soal marketing rock melon bareng Prof. Dr. Nurazzura, bukan surplus cucumber seperti draf awal), artikel baru "An IoT Farming Technology Workshop" ditambahkan, hero Journal diganti ke foto seremoni kerja sama, foto "Our story" di About diganti ke foto lahan kosong yang lebih pas temanya (membebaskan `community-planting.jpg` sepenuhnya sehingga galeri-nya dihapus), dan foto kartu "University support" ditukar ke versi indoor.
