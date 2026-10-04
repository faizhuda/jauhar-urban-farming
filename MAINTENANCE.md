# Maintenance & Handover

Diperbarui 4 Oktober 2026. Website publik: https://jauharurbanfarming.com.
Implementasi Sveltia di revisi ini menggantikan Decap; verifikasi login produksi
tetap dilakukan setelah deployment. Riwayat bisnis/proyek ada di [PROJECT.md](PROJECT.md).

## Untuk pengelola konten

Buka `/admin/` dan login dengan akun GitHub yang sudah diberi akses tulis ke repo.
Pengelola tidak perlu mengedit file atau menjalankan perintah. Gunakan **Quick guide**
di panel, atau buka `/admin/help/`. Panduan berbahasa Inggris mengikuti bahasa situs.

| Kebutuhan                                         | Menu                 |
| ------------------------------------------------- | -------------------- |
| Harga, satuan, ketersediaan, foto produk          | Products             |
| Foto kegiatan dan caption                         | Farm Photos          |
| Artikel dan foto sampul                           | Farm Stories         |
| WhatsApp, alamat, jam buka, Instagram, titik peta | Business Information |
| Judul, pengantar, foto hero, deskripsi pencarian  | Page Introductions   |

**Draft — hidden** menyembunyikan konten dari semua halaman. Konten baru dimulai
sebagai draft; lengkapi kolom wajib sebelum menyimpannya. **Published** menampilkan
konten setelah build/deploy selesai. **Unavailable** tetap menampilkan produk dengan
label Out of stock atau Bookings paused. Home menampilkan tiga pilihan published
pertama berdasarkan posisi; nomor posisi kecil tampil lebih dahulu.

**Save tidak sama dengan sudah tayang.** Konten disimpan sebagai commit di `main`,
lalu Vercel membangun website. Biasanya beberapa menit, tergantung antrian/build.
Panel menjelaskan proses ini; indikatornya bukan pemeriksaan status deployment.
Gunakan Visit website untuk memeriksa hasil. Jika belum berubah, cek Visibility,
lalu minta pemilik situs memeriksa deployment Vercel.

Foto JPG/JPEG, PNG, WebP, HEIC/HEIF diterima hingga 12 MB. CMS membatasi dimensi
ke 1600px tanpa membesarkan foto kecil, mengonversi ke WebP jika encoder tersedia,
dan menghapus metadata gambar. Safari bisa menggunakan fallback PNG. HEIC bisa
memerlukan pemrosesan tambahan; jika gagal, ekspor sebagai JPG. Nama upload mendapat
akhiran unik untuk mengurangi tabrakan. Foto website tetap diproses `astro:assets`.
Pertahankan subjek di tengah karena kartu memakai crop 4:3 dan hero lebih lebar.

Pratinjau bawaan CMS menampilkan isian konten dan status publikasi, bukan salinan
persis desain website. Preview khusus berbasis iframe tidak dipakai karena pada
browser tertanam pengujian tampil kosong. Selalu cek halaman lengkap melalui Visit
website setelah publikasi. Tata letak, desain, navigasi, dan isi bagian lain tetap
dikelola developer.

## Arsitektur & sumber data

- Astro 7.3.5 + Tailwind 4, halaman publik dibangun statis. Tidak ada database konten.
- Sveltia CMS **0.227.3**, dikunci di package/lockfile dan dibundel lokal untuk `/admin/`.
  Tidak ada script CMS di layout publik. Sveltia masih beta; upgrade perlu pengujian.
- Produk/galeri/journal: `src/content/{products,gallery,journal}/*.md`.
- Informasi usaha: `src/data/business.json`, divalidasi `businessSchema`.
  `src/config.ts` membaca sumber ini untuk tampilan, tautan, dan JSON-LD.
- Hero dan metadata enam halaman: `src/content/pages/*.json`, memakai collection
  `pages` dan helper `pageContent`. CMS tidak bisa menambah/menghapus route halaman.
- Gambar disimpan di `src/assets/`; URL `/src/assets/...` di konten diproses oleh
  loader image Astro. Jangan pindahkan gambar ke `public/` hanya untuk thumbnail.
- `public/admin/config.yml`: struktur form, media, filter, nama menu.
- `src/admin/customizations.ts`: pilihan boolean dan label preview, validasi sebelum simpan,
  pemberitahuan setelah simpan, dan mode demo development.
- `/oauth` dan `/oauth/callback`: dua endpoint server kecil untuk login GitHub.
- Domain canonical berada di `astro.config.mjs`; endpoint OAuth produksi memakai
  origin tersebut. `config.yml` harus mengikuti domain bila domain berubah.

## Menjalankan & memeriksa

Node minimal 22.12, CI memakai Node 22.

```bash
npm ci
npm test
npm run check
npm run build
npm run dev
```

Build statis dan CI tidak memerlukan secret OAuth. `npm test` memeriksa pemilihan
konten non-draft, kesesuaian aturan form, validasi usaha, state/PKCE, akses repo,
dan pengamanan handoff popup. Format file yang diedit dengan Prettier.

Untuk mencoba form tanpa menulis ke GitHub, buka `http://localhost:4321/admin/demo/`
pada server development dan pilih Work with Test Repository. Data demo tersimpan
terpisah di browser, bukan repo. Pada build produksi `/admin/demo/` kembali ke admin
dan parameter demo diabaikan.
Demo belum membuktikan login nyata, pembacaan media GitHub lama, atau deployment.

Kriteria mobile: 360/375/390px, tablet 768px, desktop; tanpa horizontal overflow,
tombol utama minimal 44px, input tidak memicu zoom iOS, preview bisa dibuka dari
ponsel, pesan simpan tetap terlihat, dan editor menyesuaikan tinggi header.
Uji perangkat Android/iPhone nyata tetap diperlukan untuk keyboard, pemilih foto,
HEIC, dan koneksi lambat.

Hasil lokal revisi 4 Oktober: instalasi bersih berhasil tanpa legacy peer deps,
8 pengujian regresi lulus, pemeriksaan Astro menghasilkan 0 error/warning/hint,
dan build produksi berhasil tanpa kredensial OAuth. Editor produk diuji pada
360/375/390/768/1280px tanpa overflow horizontal, tombol Save 44px dan header
tetap terlihat. Form informasi usaha, editor artikel dan preview bawaan diperiksa;
enam halaman publik serta panduan diuji pada 375px. HTML produksi diperiksa untuk
satu H1, canonical/OG, asset gambar share, srcset hero, status stok, isolasi bundle
admin, dan pengecualian admin dari sitemap. Ini belum membuktikan login/upload
produksi atau skor PageSpeed.

## Login GitHub di Vercel

Environment **server**, bukan variabel publik:

```text
OAUTH_GITHUB_CLIENT_ID
OAUTH_GITHUB_CLIENT_SECRET
```

Nama sama dengan integrasi lama, sehingga nilai yang sudah terpasang bisa digunakan.
GitHub OAuth App: homepage `https://jauharurbanfarming.com`, callback
`https://jauharurbanfarming.com/oauth/callback`. Undang akun pengelola ke repo
`faizhuda/jauhar-urban-farming` dengan akses Write dan pastikan GitHub menerima undangan.
Jangan membagikan password atau token pribadi antar pengelola.

Implementasi memakai state acak, PKCE S256, cookie HttpOnly/SameSite=Lax berumur
10 menit, penghapusan cookie setelah callback, serta pemeriksaan origin, sumber
jendela dan pesan handshake. Token hanya diserahkan ke opener admin yang benar;
respons OAuth tidak boleh dicache. Akses tulis ke repo diperiksa sebelum token
diserahkan. Scope `public_repo` dipakai karena repo publik; bila repo menjadi private,
scope dan model akses perlu ditinjau. OAuth App masih memiliki cakupan lintas repo
publik milik akun; GitHub App dengan akses per repo merupakan opsi jangka panjang.

Login tanpa kredensial mengembalikan pesan gagal yang jelas; website publik tetap
bisa dibangun. Admin pada preview deployment menampilkan tautan ke admin domain
produksi, karena callback OAuth App tetap terdaftar di domain tersebut. Endpoint
OAuth yang dibuka langsung pada origin preview juga mengarah ke admin produksi.
Untuk pengujian OAuth lokal
nyata gunakan OAuth App development terpisah dengan callback localhost dan `.env`
(lihat `.env.example`). Jangan mengubah callback App produksi untuk tes lokal.

Setelah deployment, uji: login akun berakses → baca produk/foto yang ada → simpan
produk lengkap sebagai draft → pastikan tidak muncul → publish → cek commit dan
deployment → kembalikan perubahan uji. Uji akun tanpa akses serta pembatalan login.
Nilai secret harus tetap hanya di Vercel; jangan salin ke repo atau screenshot.
Pastikan akun pengelola dapat menyimpan commit konten ke `main`. Branch tersebut
protected, tetapi detail aturan tidak dapat dibaca melalui koneksi GitHub sesi ini.
Jangan menganggap akses Write otomatis melewati seluruh aturan branch. Jika aturan
mewajibkan PR, sesuaikan alur penerbitan bersama pemilik repo dan uji akun pengelola;
jangan mematikan proteksi hanya untuk meloloskan pengujian.

## Pemulihan & perawatan

Jika edit konten membuat build gagal, deployment publik sebelumnya tetap dilayani
Vercel. Baca error, perbaiki field lewat CMS, lalu save lagi. Untuk mengembalikan
konten gunakan GitHub history/revert commit; hindari force push. Riwayat Git bukan
pengganti arsip foto sumber—simpan foto asli di arsip Jauhar sebelum upload.

Untuk rollback migrasi CMS, revert commit migrasi secara utuh melalui PR, install
kembali dependency sesuai lockfile yang direvert, lalu deploy ulang. Jangan hanya
mengembalikan panel tanpa endpoint/config yang cocok. Uji login setelah rollback.

Developer masih dapat memakai `scripts/prepare-photo.mjs` untuk foto arsip, crop
khusus atau gambar OG; pengelola tidak memerlukan script itu untuk upload rutin.
Folder `images/` berisi foto mentah lokal dan diabaikan Git. Jangan menambahkan
seluruh arsip tersebut ke repository.

Audit dependency 4 Oktober 2026: Astro diperbarui ke 7.3.5, Sharp ke 0.35.5 dan
dependency kompatibel lainnya dipatch. Override `path-to-regexp ^6.3.0` khusus
`@vercel/routing-utils` menangani ReDoS tanpa downgrade adapter/Astro.
`npm audit` masih melaporkan **3 high** dalam satu rantai
`@astrojs/vercel → astro → http-cache-semantics 4.2.0`.
[GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp)
belum mempunyai versi patched. Pada kode Astro yang terpasang, pemakaiannya berada
di cache gambar remote saat build. Situs ini memakai asset lokal, tidak mempunyai
shared cache respons pengguna, dan endpoint OAuth memakai `no-store`. Ini penilaian
terhadap pemakaian saat ini, bukan jaminan bahwa paket tersebut aman untuk semua
skenario. Pantau patch upstream; jangan memakai `npm audit fix --force` yang saat
ini menawarkan downgrade besar. Tinjau ulang sebelum memakai gambar remote privat
atau shared cache untuk respons berautentikasi.

## Performa & SEO

CMS menambah bundle khusus admin; warning chunk besar saat build berasal dari
aplikasi pengelolaan (entry sekitar 2,34 MB minified / 702 KB gzip pada build lokal).
Loading awal admin pada koneksi seluler bisa lebih lama. Halaman publik mempertahankan responsive WebP, dimensi gambar,
lazy loading dan prioritas hero. Optimasi sebelum upload mengurangi ukuran sumber
dan beban build; manfaatnya berbeda dari ukuran gambar yang diunduh pengunjung.
Pemrosesan foto besar dapat menambah waktu tunggu di ponsel pengelola.

Heading utama tetap satu per halaman, metadata berasal dari konten tervalidasi,
alt text wajib, dan informasi usaha mengalir ke JSON-LD yang sama. `/admin/` dan
panduannya noindex serta dikecualikan dari sitemap. Ukur PageSpeed setelah deploy;
skor Lighthouse historis bukan hasil verifikasi revisi ini.

## Checklist serah terima

- [ ] Migrasi terdeploy dan login produksi berhasil dengan akun pengelola.
- [ ] Pengelola mempraktikkan harga/stok, foto, artikel, informasi usaha.
- [ ] Uji Android/iPhone dengan foto nyata dan koneksi seluler.
- [ ] Akses repo, Vercel, GitHub OAuth App dan registrar domain dipindahkan/dicatat.
- [ ] Pemilik akun, pemulihan akses, tanggal kedaluwarsa domain dan biaya paket dicatat.
- [ ] Status Google Business Profile dan akses Search Console dicatat.
- [ ] Sumber foto asli dan prosedur pemulihan diserahkan.
- [ ] PageSpeed dan tampilan website publik dicek ulang setelah deploy.

Referensi: [Sveltia migration](https://sveltiacms.app/en/docs/migration/netlify-decap-cms),
[media](https://sveltiacms.app/en/docs/media),
[GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).
