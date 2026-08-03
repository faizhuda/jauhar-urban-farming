# Maintenance Guide

Panduan praktis mengelola website Jauhar Urban Farming — untuk pengelola non-teknis (isi konten) maupun developer (deploy, teknis). Lihat [PROJECT.md](PROJECT.md) untuk requirement/arsitektur, [TODO.md](TODO.md) untuk daftar kerjaan yang masih terbuka.

---

## Cara kerja publikasi

1. Konten diedit di repo GitHub `faizhuda/jauhar-urban-farming` (bisa langsung dari browser github.com, tidak perlu install apa pun)
2. Setiap perubahan di branch `main` otomatis memicu **build & deploy di Vercel** (±2 menit)
3. Tidak ada server/database yang perlu dirawat — hosting gratis selamanya

## Perubahan yang paling sering dibutuhkan

| Kebutuhan | Yang diedit |
|---|---|
| Tambah/edit produk, harga, stok | 1 file di `src/content/products/` — lihat [format produk](#1-menambaheditsembunyikan-produk) di bawah |
| Sembunyikan produk (mis. eksperimen belum lanjut) | Set `draft: true` di file produk terkait |
| Tambah foto galeri | 1 file di `src/content/gallery/` + foto di `src/assets/gallery/` |
| Tulis artikel The Harvest Journal | 1 file di `src/content/journal/` |
| **Ganti nomor WhatsApp** | `src/config.ts` → `whatsapp` (satu-satunya tempat) |
| Ganti jam operasional / alamat / sosmed | `src/config.ts` |
| Ganti warna atau font situs | `src/styles/global.css` → blok `@theme` (design tokens) |
| Ganti foto (produk/galeri/hero) | Timpa file di `src/assets/` dengan nama sama, lihat [Foto](#foto) |
| Atur animasi & micro-interactions | `src/styles/global.css` (micro-interactions) + `src/layouts/BaseLayout.astro` (splash screen overlay telah dihapus total demi FCP/LCP & touch mobile) |

## Menjalankan secara lokal (developer)

```bash
npm install        # sekali saja
npm run dev        # dev server di http://localhost:4321
npm run build      # build produksi + validasi seluruh konten
```

---

## Konten

### 1. Menambah/edit/sembunyikan produk

Satu produk = satu file Markdown di `src/content/products/`:

```markdown
---
name: Fresh Cucumber
price: 3.0                      # Harga dalam RM, ANGKA SAJA
unit: kg                        # kg / jar / pack / person / kg picked / dst.
description: 10–200 karakter. Tampil di kartu produk & meta description.
image: ../../assets/products/fresh-cucumber.jpg
imageAlt: Deskripsi gambar untuk aksesibilitas & SEO
category: fresh                 # fresh | processed | experience
draft: false                    # true = sembunyikan TOTAL dari katalog
inStock: true                   # false = tombol jadi "Coming soon"
featured: true                  # true = tampil di Beranda (maks. 3)
order: 1                        # urutan tampil, angka kecil = lebih dulu
---
```

Kalau ada isian salah (harga bukan angka, foto tidak ada), **build otomatis gagal dengan pesan error jelas** — website live tidak akan rusak.

### 2. Menambah foto galeri

Satu foto = satu file di `src/content/gallery/`: field `image`, `alt`, `caption`, `date` (YYYY-MM-DD), `order`.

### 3. Menulis artikel The Harvest Journal

Satu artikel = satu file Markdown di `src/content/journal/`, nama file jadi URL (mis. `panen-pertama.md` → `/journal/panen-pertama`):

```markdown
---
title: First Harvest of the Season
description: 10–200 karakter, tampil di kartu daftar & meta description.
date: 2026-07-20
image: ../../assets/journal/first-harvest-of-the-season.jpg
imageAlt: Deskripsi gambar untuk aksesibilitas & SEO
---

Isi artikel di sini, format Markdown biasa (paragraf, **bold**, `## Sub-judul`, dst).
```

Simpan foto sampul di `src/assets/journal/`. Artikel muncul otomatis di `/journal`, urut dari terbaru. Tidak perlu jadwal rutin — isi kalau ada cerita layak dibagikan, lebih baik jarang tapi berisi daripada sering tapi kosong.

### Foto

- Resize maksimal **1600px** sisi terpanjang sebelum masuk repo
- Rasio seragam: produk & galeri **4:3** (foto 1:1 juga aman, otomatis di-crop tengah)
- Pencahayaan natural, latar bersih
- Mengganti foto: timpa file dengan **nama yang sama persis** di `src/assets/`

**Status saat ini: seluruh foto situs (hero, produk, galeri) adalah stok berlisensi bebas dari Wikimedia Commons**, bukan foto asli — lihat tabel kredit & kewajiban atribusi di bagian [Kredit Foto](#kredit-foto-sementara) di bawah. Ada **166 foto asli** menunggu di-review di folder `images/` (di root repo, belum masuk `src/assets/`) — perlu dipetakan satu per satu ke slot produk/galeri/journal yang sesuai, baru dipindah & ganti nama sesuai konvensi di atas. Setelah foto asli dipasang, **hapus baris terkait** di tabel kredit (foto CC BY/CC BY-SA wajib atribusi selama masih dipakai, CC0/Public Domain tidak wajib tapi tetap dicatat demi keterlacakan).

### Teks

- Meta description ≤155 karakter, **harus sesuai isi aktual halaman** (pernah ada bug: description promosikan produk yang sudah disembunyikan — selalu cek ulang kalau ubah katalog)
- Bahasa situs: English (keputusan tim)
- NAP (nama, alamat, telepon) & jam operasional **hanya** diedit di `src/config.ts` — harus persis sama dengan Google Business Profile

---

## Setup admin panel — Decap CMS

> **Status: BELUM AKTIF, siap diaktifkan.** Ini bikin mitra bisa edit produk/foto/artikel lewat form web di `/admin`, tanpa perlu sentuh GitHub sama sekali.

**Kenapa belum jalan sekarang:** package `astro-decap-cms-oauth` butuh domain final untuk GitHub OAuth App (callback URL harus URL production, tidak bisa preview URL), dan begitu integrasinya dipasang, **build akan gagal total** sampai 2 env var di bawah diisi di Vercel. Urutan wajib: **domain dulu**, baru CMS ini.

Langkah aktivasi (setelah domain final live):

1. Install: `npm install astro-decap-cms-oauth @astrojs/vercel`
2. Di `astro.config.mjs`, tambahkan adapter & integrasi:

   ```js
   import vercel from '@astrojs/vercel';
   import decapCmsOauth from 'astro-decap-cms-oauth';

   export default defineConfig({
     // ...konfigurasi yang sudah ada
     adapter: vercel(),
     integrations: [sitemap(), decapCmsOauth()],
   });
   ```

3. Buat file `public/admin/config.yml`:

   ```yml
   backend:
     name: github
     branch: main
     repo: faizhuda/jauhar-urban-farming
     site_domain: <domain-final-tanpa-https>
     base_url: https://<domain-final>
     auth_endpoint: oauth

   media_folder: ""
   public_folder: ""

   collections:
     - name: products
       label: Products
       folder: src/content/products
       create: true
       slug: "{{fields.name}}"
       format: frontmatter
       extension: md
       identifier_field: name
       fields:
         - { label: Name, name: name, widget: string }
         - { label: "Price (MYR)", name: price, widget: number, value_type: float, min: 0 }
         - { label: Unit, name: unit, widget: string, default: pack, hint: "mis. kg, jar, pack, person" }
         - { label: Description, name: description, widget: text, pattern: ['^.{10,200}$', "Harus 10-200 karakter"] }
         - { label: Image, name: image, widget: image, media_folder: "/src/assets/products", public_folder: "/src/assets/products" }
         - { label: "Image alt text", name: imageAlt, widget: string, hint: "Deskripsi gambar untuk aksesibilitas & SEO" }
         - label: Category
           name: category
           widget: select
           options:
             - { label: "Fresh Harvest", value: fresh }
             - { label: "Farm Made", value: processed }
             - { label: "Learn & Grow", value: experience }
         - { label: "Hide from catalogue (draft)", name: draft, widget: boolean, default: false, hint: "Nyalakan untuk sembunyikan produk sepenuhnya, mis. eksperimen yang belum pasti dilanjut" }
         - { label: "In stock", name: inStock, widget: boolean, default: true }
         - { label: "Featured on homepage (max 3)", name: featured, widget: boolean, default: false }
         - { label: "Display order (kecil = lebih dulu)", name: order, widget: number, value_type: int, default: 99 }
         - { label: Body, name: body, widget: markdown, required: false }

     - name: gallery
       label: Gallery
       folder: src/content/gallery
       create: true
       slug: "{{fields.alt}}"
       format: frontmatter
       extension: md
       identifier_field: alt
       fields:
         - { label: Image, name: image, widget: image, media_folder: "/src/assets/gallery", public_folder: "/src/assets/gallery" }
         - { label: "Alt text", name: alt, widget: string, hint: "Deskripsi gambar untuk aksesibilitas & SEO" }
         - { label: Caption, name: caption, widget: string }
         - { label: Date, name: date, widget: datetime, date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }
         - { label: "Display order (kecil = lebih dulu)", name: order, widget: number, value_type: int, default: 99 }

     - name: journal
       label: The Harvest Journal
       folder: src/content/journal
       create: true
       slug: "{{fields.title}}"
       format: frontmatter
       extension: md
       identifier_field: title
       fields:
         - { label: Title, name: title, widget: string }
         - { label: Description, name: description, widget: text, pattern: ['^.{10,200}$', "Harus 10-200 karakter"] }
         - { label: Date, name: date, widget: datetime, date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }
         - { label: Image, name: image, widget: image, media_folder: "/src/assets/journal", public_folder: "/src/assets/journal" }
         - { label: "Image alt text", name: imageAlt, widget: string, hint: "Deskripsi gambar untuk aksesibilitas & SEO" }
         - { label: Body, name: body, widget: markdown }
   ```

4. Buat GitHub OAuth App: [github.com/settings/applications/new](https://github.com/settings/applications/new)
   - Homepage URL = domain final
   - Authorization callback URL = domain final + `/oauth/callback`
5. Di Vercel dashboard → Project → Settings → Environment Variables, set `OAUTH_GITHUB_CLIENT_ID` dan `OAUTH_GITHUB_CLIENT_SECRET` (didapat dari OAuth App di langkah 4)
6. Deploy, lalu tes login di `https://<domain-final>/admin`
7. Field `image` di CMS akan nulis path relatif ke frontmatter — cek 1 kali hasil commit pertama sesuai format `../../assets/products/nama-file.jpg` yang dibaca schema di `src/content.config.ts`; kalau beda, sesuaikan `media_folder`/`public_folder` di atas

Catatan: preview thumbnail gambar di admin UI bisa saja tidak muncul (folder `src/assets` bukan folder public yang bisa diakses browser) — kosmetik saja, tidak mempengaruhi isi file yang dicommit.

---

## Catatan teknis penting

### Skrip Inline dan Responsivitas Mobile

Script penanganan hamburger menu pada `src/components/Header.astro` sengaja ditulis menggunakan tag `<script is:inline>`. Ini menjamin script dieksekusi secara instan dan unconditionally oleh peramban seluler tanpa bergantung pada penundaan bundler ES Module atau restriksi header CSP pada CDN Edge Vercel.

### Animasi Progressive Enhancement (Zero Blank Space)

Semua animasi entrance (`.hero-enter`, `[data-reveal]`) di `src/styles/global.css` dan `src/layouts/BaseLayout.astro` menggunakan pola **Progressive Enhancement**:
- Baseline CSS default untuk elemen `[data-reveal]` adalah **100% visible (`opacity: 1; transform: none;`)**.
- Kelas `.js-reveal` dan efek sembunyi `opacity: 0` **hanya ditambahkan secara dinamis di runtime JavaScript** apabila browser mendukung `IntersectionObserver` dan script berhasil berjalan.
- **Hasilnya**: Jika JavaScript terhambat, diblokir extension, atau mengalami delay jaringan, seluruh konten halaman tetap 100% langsung terlihat tanpa ada area kosong atau jeda animasi 12 detik ("plop"). Konten kritis tidak pernah tersembunyi secara prematur.

---

## Kredit Foto (sementara)

Seluruh foto di `src/assets/` saat ini adalah **stok berlisensi bebas dari Wikimedia Commons** — pengganti sementara sampai foto asli dari `images/` masuk (lihat [TODO.md](TODO.md)).

> **Kewajiban lisensi:** foto CC BY / CC BY-SA mewajibkan atribusi selama masih dipakai di produksi. Karena itu tabel kredit **hidup di kode, bukan cuma di dokumen ini** — lihat `src/data/photo-credits.ts`, dirender publik di halaman **`/credits`** (tertaut dari footer setiap halaman). Foto CC0/Public Domain tidak wajib atribusi, tetap dicatat demi keterlacakan.

**Saat menimpa sebuah foto stok dengan foto asli: hapus entri terkait di `src/data/photo-credits.ts`.** Kalau array-nya sudah kosong (semua foto sudah asli), hapus juga `src/pages/credits.astro` dan tautan "Photo credits" di `src/components/Footer.astro`.

Semua file di-crop & di-resize (maks. 1600px, JPEG q82) lalu dikonversi otomatis ke WebP oleh pipeline `astro:assets` saat build.

---

## Checklist serah terima

- [ ] Akses GitHub repo diserahkan ke pengelola
- [ ] Akses dashboard Vercel diserahkan
- [ ] Akses registrar domain diserahkan
- [ ] **Tanggal expired domain: __________** — pasang reminder perpanjangan!
- [ ] Vercel Web Analytics dikonfirmasi aktif, cara membacanya sudah didemokan
- [ ] Status Google Business Profile + langkah lanjutan dicatat
- [ ] `site` di `astro.config.mjs`, `SITE.url` di `src/config.ts`, `Sitemap:` di `public/robots.txt` sudah ke domain final
