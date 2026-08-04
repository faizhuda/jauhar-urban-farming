# To-Do List

Status per 5 Agustus 2026. Lihat [PROJECT.md](PROJECT.md) untuk konteks lengkap dan [MAINTENANCE.md](MAINTENANCE.md) untuk cara mengerjakan tiap item teknis.

## 🔴 Faiz / tim teknis

- [ ] **Beli domain custom** (`.com`) — rekomendasi Rumahweb (~Rp129.500 tahun pertama, gratis WHOIS privacy), atau langsung lewat Vercel Domains kalau mau paling simpel
- [ ] Setelah domain aktif: update `site` di `astro.config.mjs` — **sekarang cuma 1 tempat** (bukan 3 lagi; `SITE.url` sudah dihapus dan `robots.txt` sudah jadi endpoint yang otomatis ikut, lihat riwayat perubahan di PROJECT.md)
- [ ] Submit ke **Google Search Console** setelah domain final
- [ ] Aktivasi **Decap CMS** (admin panel `/admin`) — langkah lengkap di [MAINTENANCE.md](MAINTENANCE.md#setup-admin-panel--decap-cms), butuh domain final dulu
- [x] ~~Review & pilah 166 foto asli~~ — selesai 3 Agu 2026: 11 dari 13 slot foto sudah pakai foto asli (hero, about-hero, og-default, 2 produk live, 6 dari 8 galeri), diproses lewat `scripts/prepare-photo.mjs`. 160 foto sisanya jadi arsip untuk konten masa depan.
- [x] ~~Wire foto baru yang ditambahkan Jauhar (Agu 2026)~~ — selesai 4 Agu 2026: seluruh hero halaman, ketiga kartu tim di About, dan 7 galeri baru (kangkung/rockmelon musim ini, donasi panen ke Warung Makan Sahabat, sistem JFI, kunjungan advisor universitas, workshop komunitas & sekolah) sekarang pakai foto asli.
- [x] ~~Tulis teks 2 artikel Journal baru~~ — selesai 4 Agu 2026: "When Our Volunteer Teams First Met" & "Workshopping Our Business Model" sudah live (`draft: false`), foto asli.
- [x] ~~2 slot galeri stok tanpa kandidat foto~~ — selesai 5 Agu 2026: `campus-bazaar` & `drip-lines` dihapus (bukan dipaksain) alih-alih dibiarkan menggantung sebagai stok Wikimedia. Karena itu **semua foto galeri sekarang foto asli**, dan `/credits` + tautan footer-nya sudah dihapus (kredit atribusi CC BY/BY-SA sudah tidak relevan — tidak ada lagi foto stok di situs)
- [x] ~~`iot-demo.jpg` belum dipakai~~ — selesai 5 Agu 2026: konteks dikonfirmasi (sesi pertama mentor IoT menjelaskan cara kerja sistem JFI ke tim), sudah jadi galeri "Learning the JFI system from our IoT mentor"
- [x] ~~4 produk eksperimen di `_drafts/`~~ — selesai 5 Agu 2026: keputusan final **tidak dijual**, file draft dihapus (bukan dibiarkan menggantung); artikel Journal "Workshopping Our Business Model" sudah diberi catatan penutup soal keputusan ini
- [ ] Jalankan Rich Results Test ulang & re-audit PageSpeed di domain final (semua foto asli sudah masuk, tidak ada lagi slot stok yang menunggu)

## 🟡 Pihak Jauhar

- [ ] **Klaim Google Business Profile** — listing "Jauhar Urban Farming's Site" sudah ada di Maps tapi belum diklaim; pakai akun yang dikuasai Jauhar sendiri (bukan akun pribadi mahasiswa KKN), supaya kontrolnya tetap ada pasca-KKN
- [ ] Konfirmasi alamat resmi (sudah disamakan ke listing Maps: Mahallah Halimah, 50728 Kuala Lumpur) — pastikan ini alamat yang memang mau dipakai jangka panjang
- [x] ~~Wawancara profil pengelola asli~~ — diputuskan 5 Agu 2026: **tidak perlu**, label peran generik ("Student caretakers", dst.) memang disengaja karena pengurus berganti tiap season
- [x] ~~Keputusan pickled cucumber / cucumber chips / garden salad pack / cucumber seedlings~~ — diputuskan 5 Agu 2026: **tidak dijual**, file draft sudah dihapus dari repo
- [ ] Pastikan link Instagram di bio sudah mengarah ke website

## 🟢 Bersama (menjelang akhir KKN)

- [ ] Sesi pelatihan resmi ke Jauhar: cara update konten via GitHub, cara baca Vercel Analytics dasar
- [ ] Serah terima akses: repo GitHub, dashboard Vercel, akun registrar domain, Google Business Profile
- [ ] Catat tanggal expired domain + reminder perpanjangan di dokumen serah terima
- [ ] Uji multi-perangkat fisik terakhir (Android 4G, iPhone, tablet, desktop 1366/1920px) sebelum dianggap selesai

## 💡 Opsional / nice-to-have

- [ ] Isi The Harvest Journal secara rutin — hanya kalau ada yang benar-benar niat nulis, lebih baik jarang tapi berisi
- [ ] Multi-bahasa (ID/MY/EN) — Astro punya dukungan i18n bawaan, belum jadi prioritas
