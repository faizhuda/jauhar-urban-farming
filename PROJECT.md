# Jauhar Urban Farming — Project Documentation

| | |
|---|---|
| **Program** | KKNT Inovasi IPB University × Jauhar Urban Farming, IIUM Gombak (14 Juli – 11 Agustus 2026) |
| **Repo** | [`faizhuda/jauhar-urban-farming`](https://github.com/faizhuda/jauhar-urban-farming) |
| **Live** | https://jauharurbanfarming.vercel.app *(domain custom belum dibeli — lihat [TODO.md](TODO.md))* |
| **Stack** | Astro 7 (static) + Tailwind CSS 4, hosted di Vercel |
| **Tim teknis** | 1 dari 8 anggota tim KKN (Faiz, Ilmu Komputer) |
| **Dokumen lain** | [TODO.md](TODO.md) · [MAINTENANCE.md](MAINTENANCE.md) · [Proposal.md](Proposal.md) *(proposal resmi KKNT, terpisah)* |

Dokumen ini adalah **satu-satunya sumber kebenaran** untuk requirement, arsitektur, dan status proyek — menggantikan `PRD.md` dan `PLANNING.md` yang sebelumnya terpisah dan mudah jadi tidak sinkron satu sama lain.

---

## 1. Ringkasan

`jauhar-urban-farming` adalah website resmi Jauhar Urban Farming: profil digital, katalog produk, dan kanal pemesanan sederhana via **WhatsApp click-to-order**. Dibangun sebagai **static site** (Astro, tanpa backend/database) supaya hosting gratis selamanya, performa maksimal, dan bisa dirawat mandiri oleh mitra pasca-KKN tanpa perlu developer.

**Konteks yang membentuk keputusan teknis:**
- Hanya 1 dari 8 anggota tim berkompetensi teknis → arsitektur harus sesederhana mungkin
- Durasi pelaksanaan cuma 4 minggu → prioritas kelengkapan konten & kestabilan, bukan fitur canggih berisiko
- Mitra (Jauhar) akan mengelola website ini sendiri setelah KKN selesai → semua keputusan mempertimbangkan kemudahan maintenance jangka panjang

Proker awal ("Jauhar Urban Farming 2.0") mencakup dua pilar: monitoring kebun berbasis **IoT** dan **business sustainability development**. Pilar IoT/Telegram Bot **tidak dikerjakan dalam bentuk apa pun** oleh tim teknis — seluruh bandwidth developer terpusat ke website ini, yang scope-nya diperluas untuk menutup gap tersebut (SEO menyeluruh, optimasi performa, siap ditemukan di pencarian klasik maupun AI search). Visi/Misi di halaman About tetap merefleksikan ambisi *smart farming* berbasis IoT milik program secara keseluruhan, meski website-nya sendiri tidak mengimplementasikan sensor/IoT apa pun.

---

## 2. Status Saat Ini (per 3 Agustus 2026)

### ✅ Sudah selesai
- 8 halaman live: Home, About, Products, Gallery, Contact, Journal (index + detail per artikel), 404
- Design system **Professional Luxury**: palet Material 3 hijau + aksen emas/champagne, tipografi Libre Caslon Text + Hanken Grotesk, hero full-bleed, scroll-reveal progressive enhancement, dan parallax ringan (splash screen overlay dihapus total demi optimasi LCP & touch mobile tanpa halangan z-index)
- Logo asli Jauhar terpasang (header + favicon), diproses jadi lingkaran bersih tanpa shadow
- Nomor WhatsApp order resmi (`+60 13-239 1877`) terpasang di satu sumber kebenaran (`src/config.ts`)
- **Katalog produk mencerminkan realita bisnis**: hanya **Fresh Cucumber** (RM3/kg) dan **Pick-Your-Own Farm Tour** (tur + petik gratis, booking dulu, bayar per kg yang dipetik) yang tampil & bisa dipesan. Pickled Cucumber, Cucumber Chips, Garden Salad Pack, dan Cucumber Seedlings masih eksperimen — disembunyikan total dari katalog (`draft: true`) sampai dipastikan lanjut dijual
- NAP (Name/Address/Phone) disamakan persis dengan listing Google Maps yang sudah ada ("Jauhar Urban Farming's Site") — alamat resmi: Mahallah Halimah, 50728 Kuala Lumpur, WP Kuala Lumpur
- Pin Maps presisi di halaman Contact
- Kredit kolaborasi: Mahallah Halimah · Siddiq · Maryam, CITRA IIUM, dan NAFAS (Persatuan Peladang Malaysia) — lengkap dengan logo asli di halaman About
- SEO on-site lengkap: meta title/description unik & sesuai isi aktual di semua halaman, canonical, Open Graph + Twitter Card, JSON-LD (`LocalBusiness`, `Product` ×2, `BlogPosting` ×2), `sitemap.xml` (8 route), `robots.txt`
- **Keamanan & Stabilitas**: security headers (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`), Dependabot alerts + auto security fixes aktif, branch protection di `main`, CI build-check di setiap push/PR, 0 kerentanan npm
- Vercel Analytics + Speed Insights terpasang dan merekam data
- **Stabilitas produksi & animasi (Progressive Enhancement)**: baseline CSS scroll-reveal dibuat **100% visible by default (`opacity: 1`)**; kelas `.js-reveal` hanya ditambahkan secara dinamis jika JS & `IntersectionObserver` aktif — menjamin konten tidak pernah kosong/hilang meski JS gagal/terhambat. Script tombol hamburger mobile menggunakan `<script is:inline>` agar dapat dijalankan secara instan tanpa bergantung pada module bundler.
- CI berjalan di Node 22 (mengikuti syarat minimum Astro 7)
- The Harvest Journal (`/journal`) — koleksi artikel dengan CRUD siap lewat CMS begitu diaktifkan

### ⏳ Belum selesai (bergantung pihak eksternal/Jauhar)
- **Domain custom belum dibeli** — situs masih di `jauharurbanfarming.vercel.app`
- **Google Business Profile belum diklaim** — listing sudah ada di Maps tapi auto-generated/belum dikuasai pihak Jauhar
- **Foto masih stok Wikimedia Commons** (hero, produk, galeri) — bukan foto asli Jauhar. 166 foto asli sudah ada di folder `images/` (belum di-sortir/dipetakan ke slot produk/galeri/journal)
- Bagian "The team" di About masih placeholder generik ("Student caretakers" dll.) — belum nama & foto pengelola asli dari wawancara profil
- Google Search Console belum di-submit (menunggu domain final)
- **Decap CMS admin panel** — konfigurasi & dokumentasi lengkap sudah siap (lihat [MAINTENANCE.md](MAINTENANCE.md)), tinggal diaktifkan setelah domain final + GitHub OAuth App dibuat
- Sesi pelatihan resmi ke mitra & serah terima dokumen belum dilaksanakan

Rincian aksi per item ada di [TODO.md](TODO.md).

---

## 3. Definition of Done

- [x] Website live (masih di subdomain Vercel, custom domain menyusul)
- [ ] Seluruh halaman inti terisi konten & foto asli — bukan stok/placeholder
- [x] Responsif penuh di mobile/tablet/desktop, tanpa horizontal scroll di 375px
- [ ] Core Web Vitals hijau di domain final (LCP <2.5s, CLS <0.1, INP <200ms)
- [ ] Lighthouse Performance >90 (mobile) di domain final
- [x] Tombol "Pesan/Book via WhatsApp" berfungsi dengan template pesan sesuai produk
- [x] SEO on-site lengkap & konsisten dengan isi aktual halaman
- [x] JSON-LD `LocalBusiness`, `Product`, `BlogPosting` terpasang dan sesuai data yang tampil
- [ ] Google Search Console terverifikasi, sitemap ter-submit
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
- Admin dashboard custom dengan database sendiri — pendekatannya Decap CMS (Git-based, tanpa database) di Section 8

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
├── pages/                  # index, about, products, gallery, journal/, contact, credits, 404, robots.txt.ts
├── layouts/BaseLayout.astro  # <head> bersama: meta, OG/Twitter, font preload
├── components/             # Header, Footer, ProductCard, PageHero, Icon, WhatsAppCta, WhatsAppIcon, JsonLd
├── config.ts                # SATU sumber kebenaran: nomor WA, NAP, jam, sosmed, geo, LocalBusiness JSON-LD
├── content.config.ts        # schema Zod: products, gallery, journal
├── content/products/_drafts/  # produk belum pasti dijual — dikecualikan total dari build
├── content/{products,gallery,journal}/   # 1 file .md per item
├── data/photo-credits.ts    # kredit foto stok Wikimedia, dirender di /credits
├── utils/                    # date.ts (format tanggal), image.ts (sizes grid kartu)
├── styles/global.css        # design tokens + animasi fail-safe
└── assets/                  # gambar sumber (masih stok Commons, lihat Section 2)
public/                      # favicon (dari logo asli)
scripts/                     # generate-placeholders.mjs, generate-favicons.mjs
.github/                     # dependabot.yml, workflows/build-check.yml (npm run check lalu build)
vercel.json                  # security headers (bukan CSP — lihat Section 10)
```

---

## 6. Spesifikasi Fungsional

| ID | Requirement | Status |
|---|---|---|
| F1 | Profil lengkap Jauhar (sejarah, visi-misi, kegiatan) | ✅ (teks tim masih placeholder) |
| F2 | Katalog produk: foto, nama, deskripsi, harga | ✅ |
| F3 | Tombol "Pesan/Book via WhatsApp" dengan pesan template otomatis | ✅ |
| F4 | Galeri dokumentasi kegiatan kebun | ✅ (foto masih stok) |
| F5 | Kontak: lokasi (Maps embed), jam operasional, kontak resmi | ✅ |
| F6 | Custom domain, optimal di mobile | ⏳ domain belum dibeli |
| F7 | Halaman blog/artikel edukasi (The Harvest Journal) | ✅ *(sebelumnya stretch goal, sudah live)* |
| F8 | Admin panel Git-based untuk CRUD produk/galeri/journal tanpa GitHub | 📄 didokumentasikan, belum aktif |

## 7. Spesifikasi Non-Fungsional

| ID | Requirement |
|---|---|
| NF1 | **Fully static** — tanpa backend/database, maintenance minim |
| NF2 | **Zero-JS by default** — JS hanya untuk komponen interaktif |
| NF3 | **Core Web Vitals hijau** — LCP <2.5s, CLS <0.1, INP <200ms mobile |
| NF4 | **Content-first** — data dikelola via Content Collections |
| NF5 | **SEO-ready** — semantic HTML, meta lengkap, structured data, sitemap |
| NF6 | **Dapat dirawat mandiri** — panduan ditulis untuk non-developer |
| NF7 | **Mobile-first** — mayoritas pengunjung diasumsikan dari HP |
| NF8 | **Fail-safe by default** — konten kritis (teks, gambar) tidak boleh bergantung pada JS/animasi untuk terlihat |

---

## 8. Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Astro 7 (static output) | Zero-JS default, Content Collections tervalidasi, jalur ke Decap CMS |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | Styling cepat & konsisten |
| Data | Astro Content Collections + Zod | Validasi otomatis, kurangi human error input non-teknis |
| Gambar | `astro:assets` (`<Image />`) | Auto WebP/AVIF, srcset, dimensi eksplisit → CLS ≈ 0 |
| Sitemap | `@astrojs/sitemap` | Auto-generate saat build |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | Data pengunjung & performa real-user |
| Hosting | Vercel (auto-deploy dari `main`) | Gratis, SSL otomatis |
| Font | Libre Caslon Text + Hanken Grotesk, self-hosted via `@fontsource` | Nol request pihak ketiga, tidak block FCP |
| CMS *(siap, belum aktif)* | `astro-decap-cms-oauth` + `@astrojs/vercel` | Admin panel Git-based, self-hosted OAuth (bukan Netlify) |
| Type checking | TypeScript 6.x + `@astrojs/check` (`npm run check`) | `tsconfig.json` strict sekarang benar-benar ditegakkan, bukan cuma di editor |
| Formatting | Prettier + `prettier-plugin-astro` (`npm run format`, opt-in) | Konsistensi gaya kode; belum dijalankan ke seluruh repo sekaligus |
| CI | GitHub Actions (`build-check.yml`), Node 22 | `npm run check` lalu `npm run build` — cegah type error & build rusak sebelum ke-deploy |
| Dependency hygiene | Dependabot (npm + github-actions, mingguan) | Update keamanan otomatis |

---

## 9. SEO

**On-site (semua halaman):** meta title unik ≤60 karakter, meta description unik ≤155 karakter (dan **harus sesuai isi aktual halaman** — pernah ada bug di mana description masih promosikan produk yang sudah disembunyikan, sudah diperbaiki), canonical tag, semantic HTML, alt text deskriptif, Open Graph + Twitter Card (penting karena kanal promosi utama mitra adalah WhatsApp/Instagram).

**Structured data (JSON-LD):** `LocalBusiness` (dengan `geo`) di Home & Contact, `Product` per item katalog (auto-generate dari Content Collections, hanya produk non-draft), `BlogPosting` per artikel Journal (`og:type` ikut jadi `article`, bukan `website`, khusus halaman ini). Aturan: data JSON-LD wajib persis sama dengan yang tampil di halaman; tidak ada `AggregateRating` sebelum ada ≥3 review asli. Halaman `404` sengaja `noindex` (tidak canonical), tidak masuk sitemap.

**Sinyal eksternal (belum selesai):** Google Business Profile (perlu diklaim), Google Search Console (menunggu domain final), konsistensi NAP di semua platform, link website di bio Instagram mitra.

---

## 10. Keamanan

- **Security headers** (`vercel.json`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` (CSP header dibersihkan dari pemblokiran inline script Astro)
- **Dependabot**: vulnerability alerts + automated security fixes aktif di level repo GitHub, plus `dependabot.yml` untuk PR update mingguan
- **Branch protection** di `main`: force-push dan delete branch diblokir (tanpa wajib PR review, supaya alur edit-langsung-di-GitHub untuk mitra tetap simpel)
- **CI**: `build-check.yml` menjalankan `npm run check` (type checking) lalu `npm run build` di setiap push/PR ke `main` — mendeteksi type error & build rusak sebelum sempat live
- 0 kerentanan npm audit (dicek & dipatch berkala)
- Tidak ada secret di repo; `.env` di-gitignore
- Belum ada form input dari user di situs — attack surface minimal (murni static + WhatsApp deep link)

---

## 11. Performa & Mobile

Target: **Core Web Vitals hijau di mobile** (LCP <2.5s, CLS <0.1, INP <200ms), Lighthouse Performance >90. Implementasi: gambar via `astro:assets` (WebP/AVIF, srcset, dimensi eksplisit, lazy load di bawah lipatan, eager+`fetchpriority=high` untuk hero), font self-hosted, zero-JS default, CSS di-purge otomatis oleh Tailwind.

Mobile: breakpoints `sm/md/lg` (640/768/1024px), target sentuh ≥44×44px, tanpa horizontal scroll di 360-375px (diverifikasi di semua 8 halaman), hamburger menu menggunakan `<script is:inline>` dengan tap-outside + Escape untuk menutup.

---

## 12. Tim & Peran

| Peran | Jumlah | Tanggung jawab |
|---|---|---|
| Web Lead (Faiz) | 1 | Development, SEO teknis, keamanan, performa, deploy, dokumentasi |
| Content & Copywriting | 2 | Teks profil & produk, riset kata kunci lokal |
| Photography & Videography | 2 | Foto produk & kebun, standar resize ≤1600px |
| Community & Mitra Liaison | 2 | Wawancara mitra, pengurusan Google Business Profile, jadwal pelatihan |
| Business & Impact Analysis | 1 | Riset harga, narasi economic empowerment untuk laporan akhir |

## 13. Risiko

| Risiko | Mitigasi |
|---|---|
| Konten asli dari mitra terlambat | Development jalan dengan data dummy/stok ber-schema valid; swap belakangan |
| Mitra kesulitan update pasca-KKN | Panduan non-teknis di MAINTENANCE.md + Decap CMS sebagai solusi jangka panjang |
| Nomor WA berubah pasca-handover | Satu variabel terpusat di `src/config.ts` |
| Domain lupa diperpanjang | Dicatat di checklist serah terima (MAINTENANCE.md) |
| Konten kritis hilang karena bug JS/animasi | Sudah dimitigasi: progressive enhancement `html.js-reveal` (default visible, Section 2) |
| Dependency jadi rentan setelah tim KKN bubar | Dependabot alerts otomatis, tidak perlu ada yang manual cek |

## 14. Anggaran (estimasi KKNT)

| Kategori | Estimasi |
|---|---|
| Domain .com 1 tahun | Rp 200.000 |
| Hosting (Vercel, gratis) | Rp 0 |
| Bahan habis pakai (properti foto, ATK) | Rp 70.000 |
| Perjalanan (wawancara, sesi foto, pelatihan) | Rp 100.000 |
| Lain-lain (stiker QR, kontingensi) | Rp 130.000 |
| **Total** | **Rp 500.000** |

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
