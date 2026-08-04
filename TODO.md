# To-Do List

Status per 3 Agustus 2026. Lihat [PROJECT.md](PROJECT.md) untuk konteks lengkap dan [MAINTENANCE.md](MAINTENANCE.md) untuk cara mengerjakan tiap item teknis.

## 🔴 Faiz / tim teknis

- [ ] **Beli domain custom** (`.com`) — rekomendasi Rumahweb (~Rp129.500 tahun pertama, gratis WHOIS privacy), atau langsung lewat Vercel Domains kalau mau paling simpel
- [ ] Setelah domain aktif: update `site` di `astro.config.mjs` — **sekarang cuma 1 tempat** (bukan 3 lagi; `SITE.url` sudah dihapus dan `robots.txt` sudah jadi endpoint yang otomatis ikut, lihat riwayat perubahan di PROJECT.md)
- [ ] Submit ke **Google Search Console** setelah domain final
- [ ] Aktivasi **Decap CMS** (admin panel `/admin`) — langkah lengkap di [MAINTENANCE.md](MAINTENANCE.md#setup-admin-panel--decap-cms), butuh domain final dulu
- [x] ~~Review & pilah 166 foto asli~~ — selesai 3 Agu 2026: 11 dari 13 slot foto sudah pakai foto asli (hero, about-hero, og-default, 2 produk live, 6 dari 8 galeri), diproses lewat `scripts/prepare-photo.mjs`. 160 foto sisanya jadi arsip untuk konten masa depan.
- [x] ~~Wire foto baru yang ditambahkan Jauhar (Agu 2026)~~ — selesai 4 Agu 2026: seluruh hero halaman, ketiga kartu tim di About, dan 7 galeri baru (kangkung/rockmelon musim ini, donasi panen ke Warung Makan Sahabat, sistem JFI, kunjungan advisor universitas, workshop komunitas & sekolah) sekarang pakai foto asli. Draf journal baru ("first-meet-volunteers", "workshop-business-model") disiapkan dengan foto asli, masih `draft: true` menunggu teks cerita sungguhan.
- [ ] **2 slot galeri masih perlu foto baru**: `campus-bazaar.jpg` (belum ada foto stan/pasar) dan `drip-lines.jpg` (belum ada close-up teknis irigasi) — tidak ada kandidat layak di antara foto yang ada
- [ ] **1 foto (`iot-demo.jpg`)** belum dipakai — sesi demo/pelatihan di halaman Mahallah, konteks pastinya belum jelas; tanyakan ke Jauhar sebelum dipasang
- [ ] Jalankan Rich Results Test ulang & re-audit PageSpeed di domain final (foto asli sudah masuk, tinggal 2 slot di atas)

## 🟡 Pihak Jauhar

- [ ] **Klaim Google Business Profile** — listing "Jauhar Urban Farming's Site" sudah ada di Maps tapi belum diklaim; pakai akun yang dikuasai Jauhar sendiri (bukan akun pribadi mahasiswa KKN), supaya kontrolnya tetap ada pasca-KKN
- [ ] Konfirmasi alamat resmi (sudah disamakan ke listing Maps: Mahallah Halimah, 50728 Kuala Lumpur) — pastikan ini alamat yang memang mau dipakai jangka panjang
- [ ] Wawancara profil pengelola asli — nama, foto, cerita tim (halaman About masih placeholder generik: "Student caretakers", "Community volunteers", dst.)
- [ ] Konfirmasi harga final & keputusan: pickled cucumber / cucumber chips / garden salad pack / cucumber seedlings — lanjut dijual beneran atau tetap eksperimen? (file-nya sekarang di `src/content/products/_drafts/`; kalau jadi dijual, pindahkan kembali ke `src/content/products/` — lihat [MAINTENANCE.md](MAINTENANCE.md))
- [ ] Kalau ada kesempatan foto baru: ambil foto stan/pasar bazaar dan close-up drip line — 2 slot galeri yang belum ketemu foto cocoknya dari 166 foto lama
- [ ] Pastikan link Instagram di bio sudah mengarah ke website

## 🟢 Bersama (menjelang akhir KKN)

- [ ] Sesi pelatihan resmi ke Jauhar: cara update konten via GitHub, cara baca Vercel Analytics dasar
- [ ] Serah terima akses: repo GitHub, dashboard Vercel, akun registrar domain, Google Business Profile
- [ ] Catat tanggal expired domain + reminder perpanjangan di dokumen serah terima
- [ ] Uji multi-perangkat fisik terakhir (Android 4G, iPhone, tablet, desktop 1366/1920px) sebelum dianggap selesai

## 💡 Opsional / nice-to-have

- [ ] Isi The Harvest Journal secara rutin — hanya kalau ada yang benar-benar niat nulis, lebih baik jarang tapi berisi
- [ ] Multi-bahasa (ID/MY/EN) — Astro punya dukungan i18n bawaan, belum jadi prioritas
