# Update Guide — jauhar-hub

> **Status: DRAF (Sprint 0).** Dilengkapi penuh di Sprint 3–4 dan dipakai sebagai materi
> sesi pelatihan mitra (S4-07, lihat [PLANNING.md](../PLANNING.md)).

Panduan teknis mengelola website Jauhar Urban Farming pasca-KKN.

## Cara kerja publikasi

1. Konten diedit di repo GitHub `faizhuda/jauhar-urban-farming` (bisa langsung dari browser github.com)
2. Setiap perubahan di branch `main` otomatis memicu **build & deploy di Vercel** (±2 menit)
3. Tidak ada server/database yang perlu dirawat — hosting gratis selamanya

## Perubahan yang paling sering dibutuhkan

| Kebutuhan | Yang diedit |
|---|---|
| Tambah/edit produk, harga, stok | 1 file di `src/content/products/` — lihat [content-guide.md](content-guide.md) |
| Tambah foto galeri | 1 file di `src/content/gallery/` + foto di `src/assets/gallery/` |
| Tulis artikel The Harvest Journal | 1 file di `src/content/journal/` — lihat [content-guide.md](content-guide.md) |
| **Ganti nomor WhatsApp** | `src/config.ts` → `whatsapp` (satu-satunya tempat) |
| Ganti jam operasional / alamat / sosmed | `src/config.ts` |
| Ganti warna atau font situs | `src/styles/global.css` → blok `@theme` (design tokens) |
| Ganti foto (produk/galeri/hero) | Timpa file di `src/assets/` dengan nama sama + rapikan [image-credits.md](image-credits.md) |
| Matikan/atur splash screen & animasi | `src/styles/global.css` (blok `#splash` & micro-interactions) + `src/layouts/BaseLayout.astro` |

## Menjalankan secara lokal (opsional, untuk developer)

```bash
npm install        # sekali saja
npm run dev        # dev server di http://localhost:4321
npm run build      # build produksi + validasi seluruh konten
```

## (Stretch) Setup admin panel — Decap CMS

> **Status: BELUM AKTIF, disiapkan untuk nanti.** Ini bikin mitra bisa edit produk/foto
> lewat form web di `/admin`, tanpa perlu sentuh GitHub sama sekali (PRD §17).

**Kenapa belum jalan sekarang:** package `astro-decap-cms-oauth` butuh domain final untuk
GitHub OAuth App (callback URL harus URL production, tidak bisa preview URL), dan begitu
integrasinya dipasang, **build akan gagal total** sampai 2 env var di bawah diisi di
Vercel. Jadi urutannya wajib: domain dulu (S1-02) → baru CMS ini, bukan sebaliknya.

Langkah kalau mau aktifkan (setelah domain final live):

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
5. Di Vercel dashboard → Project → Settings → Environment Variables, set:
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
   (Client ID & Secret didapat dari OAuth App di langkah 4)
6. Deploy, lalu tes login di `https://<domain-final>/admin`.
7. Field `image` di CMS akan nulis path relatif ke frontmatter — cek 1 kali hasil commit
   pertama sesuai format `../../assets/products/nama-file.jpg` yang dibaca schema di
   `src/content.config.ts`; kalau beda, sesuaikan `media_folder`/`public_folder` di atas.

Catatan: preview thumbnail gambar di admin UI bisa saja tidak muncul (folder `src/assets`
bukan folder public yang bisa diakses browser) — ini kosmetik saja, tidak mempengaruhi isi
file yang dicommit.

## Checklist serah terima (dilengkapi Sprint 4)

- [ ] Akses GitHub repo diserahkan ke pengelola
- [ ] Akses dashboard Vercel diserahkan
- [ ] Akses registrar domain diserahkan
- [ ] **Tanggal expired domain: __________ (TODO S1-02)** — pasang reminder perpanjangan!
- [ ] Analytics: aktifkan **Vercel Web Analytics** di dashboard Vercel (Project → Analytics → Enable), lalu catat cara membacanya di sini
- [ ] Status Google Business Profile + langkah lanjutan (jika verifikasi belum selesai)
- [ ] Update `site` di `astro.config.mjs`, `SITE.url` di `src/config.ts`, dan URL Sitemap di `public/robots.txt` ke domain final
