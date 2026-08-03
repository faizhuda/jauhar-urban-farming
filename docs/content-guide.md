# Content Guide — jauhar-hub

> **Status: DRAF (Sprint 0).** Dilengkapi penuh di Sprint 3–4 (lihat [PLANNING.md](../PLANNING.md)) dan menjadi bagian dokumen serah terima ke mitra.

Panduan untuk tim Content, Photography, dan pengelola Jauhar Urban Farming dalam mengisi/memperbarui konten website — **tanpa perlu menyentuh kode halaman**.

## 1. Menambah / mengedit produk

Satu produk = satu file di `src/content/products/`, format Markdown dengan frontmatter:

```markdown
---
name: Fresh Cucumber            # Nama produk (tampil di kartu & pesan WhatsApp)
price: 5.0                      # Harga dalam RM, ANGKA SAJA (tanpa "RM")
unit: kg                        # Satuan: kg / jar / pack / person / dst.
description: Deskripsi singkat, 10–200 karakter. Tampil di kartu produk.
image: ../../assets/products/fresh-cucumber.jpg
imageAlt: Deskripsi gambar untuk aksesibilitas & SEO
category: fresh                 # Pilihan: fresh | processed | experience
inStock: true                   # false = tombol order diganti "Out of stock"
featured: true                  # true = tampil di Beranda (maks. 3)
order: 1                        # Urutan tampil (angka kecil = lebih dulu)
---
```

Jika ada isian yang salah (mis. harga bukan angka, foto tidak ada), **build otomatis gagal
dengan pesan error yang jelas** — website live tidak akan rusak.

## 2. Menambah foto galeri

Satu foto = satu file di `src/content/gallery/` dengan frontmatter: `image`, `alt`,
`caption`, `date` (YYYY-MM-DD), `order`.

## 3. Menambah artikel The Harvest Journal

Satu artikel = satu file Markdown di `src/content/journal/`, nama file jadi URL artikel
(mis. `panen-pertama.md` → `/journal/panen-pertama`):

```markdown
---
title: First Harvest of the Season
description: Ringkasan singkat, 10–200 karakter. Tampil di kartu daftar & meta description.
date: 2026-07-20
image: ../../assets/journal/first-harvest-of-the-season.jpg
imageAlt: Deskripsi gambar untuk aksesibilitas & SEO
---

Isi artikel ditulis di sini, di bawah frontmatter, pakai format Markdown biasa
(paragraf, **bold**, sub-judul `## Judul`, dst).
```

Simpan foto sampul di `src/assets/journal/`. Artikel otomatis muncul di `/journal`,
diurutkan dari yang terbaru berdasarkan `date`. Tidak perlu pengumuman rutin — isi kalau
ada cerita yang layak dibagikan (panen, kegiatan, pelajaran baru), lebih baik jarang tapi
berisi daripada sering tapi kosong.

## 4. Standar foto (PRD §10.1, §11.3)

- **Resize maksimal 1600 px sisi terpanjang** sebelum masuk repo
- Rasio seragam: **produk & galeri 4:3** (foto 1:1 juga aman, di-crop otomatis dengan subjek di tengah)
- Pencahayaan natural, latar bersih
- Simpan di `src/assets/products/` atau `src/assets/gallery/` — format JPG
- Mengganti foto: timpa file dengan **nama yang sama persis**. Foto saat ini adalah
  stok Wikimedia Commons ([image-credits.md](image-credits.md)) — setelah menimpa
  dengan foto asli, **hapus baris kreditnya** dari tabel tersebut dan sesuaikan
  `alt`/`imageAlt` dengan isi foto baru

## 5. Menulis teks halaman

- Meta description ≤155 karakter, sertakan kata kunci lokal ("urban farming Gombak", "fresh vegetables Selangor")
- Bahasa situs: **English** (keputusan tim, 5 Juli 2026)
- Data NAP (nama, alamat, telepon) & jam operasional **hanya** diedit di `src/config.ts` — harus persis sama dengan Google Business Profile

## 6. TODO konten asli (deadline 30 Juli — PLANNING.md §8)

- [ ] Ganti seluruh foto stok Wikimedia Commons dengan foto asli mitra — lalu bersihkan
      [image-credits.md](image-credits.md) (foto CC BY/CC BY-SA wajib atribusi selama masih dipakai)
- [ ] **166 foto asli sudah masuk di folder `images/` (belum di-sortir)** — perlu direview
      satu per satu untuk dipilih & dipetakan ke slot produk/galeri/journal yang sesuai
- [ ] Konfirmasi harga & daftar produk final (tim Business, S2-10)
- [ ] Isi teks About dari hasil wawancara mitra (S1-05)
- [ ] Nomor WhatsApp resmi + NAP final di `src/config.ts` (S1-06)
- [ ] Link Instagram resmi mitra di `src/config.ts` (mitra tidak memiliki Facebook)
