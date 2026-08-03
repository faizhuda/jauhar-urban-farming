/**
 * Generator gambar placeholder (DUMMY) — dijalankan sekali: `npm run placeholders`.
 *
 * Menghasilkan JPG dummy untuk hero, OG image, produk, dan galeri supaya
 * pipeline astro:assets (WebP/AVIF, srcset, width/height) teruji dengan gambar riil.
 * Saat foto asli masuk (lihat TODO.md), cukup timpa file di src/assets/ dengan
 * nama yang sama — resize maks. 1600 px.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// src/assets/ berisi foto stok sementara (Wikimedia Commons, lihat
// MAINTENANCE.md § Kredit Foto) — bukan lagi placeholder hijau. Script ini
// akan MENIMPA semuanya, jadi wajib dijalankan dengan flag --force.
if (!process.argv.includes('--force')) {
  console.error(
    'src/assets/ sudah berisi foto stok (lihat MAINTENANCE.md).\n' +
      'Menjalankan script ini akan menimpanya dengan placeholder hijau.\n' +
      'Jika benar-benar sengaja, jalankan: npm run placeholders -- --force',
  );
  process.exit(1);
}

const PALETTES = [
  ['#2b5a27', '#4a8f3e'],
  ['#1e3c1e', '#35722e'],
  ['#35722e', '#6baa5e'],
  ['#244822', '#4a8f3e'],
  ['#0e2110', '#2b5a27'],
  ['#3f6212', '#65a30d'],
  ['#166534', '#22c55e'],
  ['#14532d', '#16a34a'],
];

function makeSvg(label, w, h, [c1, c2]) {
  const fontSize = Math.round(Math.min(w, h) / 14);
  const subSize = Math.round(fontSize * 0.55);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.85}" cy="${h * 0.2}" r="${Math.min(w, h) * 0.25}" fill="#ffffff" opacity="0.08"/>
  <circle cx="${w * 0.15}" cy="${h * 0.85}" r="${Math.min(w, h) * 0.35}" fill="#000000" opacity="0.10"/>
  <text x="50%" y="48%" text-anchor="middle" font-family="sans-serif" font-weight="bold"
        font-size="${fontSize}" fill="#ffffff">${label}</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="sans-serif"
        font-size="${subSize}" fill="#ffffff" opacity="0.75">DUMMY PLACEHOLDER</text>
</svg>`;
}

const jobs = [
  { file: 'src/assets/hero.jpg', w: 1600, h: 900, label: 'Jauhar Urban Farming' },
  { file: 'src/assets/og-default.jpg', w: 1200, h: 630, label: 'Jauhar Urban Farming' },

  // Produk — rasio 1:1 seragam (PRD §11.3)
  { file: 'src/assets/products/fresh-cucumber.jpg', w: 1200, h: 1200, label: 'Fresh Cucumber' },
  { file: 'src/assets/products/pickled-cucumber.jpg', w: 1200, h: 1200, label: 'Pickled Cucumber' },
  { file: 'src/assets/products/cucumber-chips.jpg', w: 1200, h: 1200, label: 'Cucumber Chips' },
  {
    file: 'src/assets/products/garden-salad-pack.jpg',
    w: 1200,
    h: 1200,
    label: 'Garden Salad Pack',
  },
  {
    file: 'src/assets/products/cucumber-seedlings.jpg',
    w: 1200,
    h: 1200,
    label: 'Cucumber Seedlings',
  },
  { file: 'src/assets/products/farm-tour-workshop.jpg', w: 1200, h: 1200, label: 'Farm Tour' },

  // Galeri — rasio 4:3 seragam
  { file: 'src/assets/gallery/fertigation-rows.jpg', w: 1600, h: 1200, label: 'Fertigation Rows' },
  { file: 'src/assets/gallery/morning-harvest.jpg', w: 1600, h: 1200, label: 'Morning Harvest' },
  { file: 'src/assets/gallery/seedling-nursery.jpg', w: 1600, h: 1200, label: 'Seedling Nursery' },
  { file: 'src/assets/gallery/drip-lines.jpg', w: 1600, h: 1200, label: 'Drip Lines' },
  { file: 'src/assets/gallery/packing-day.jpg', w: 1600, h: 1200, label: 'Packing Day' },
  { file: 'src/assets/gallery/campus-bazaar.jpg', w: 1600, h: 1200, label: 'Campus Bazaar' },
  { file: 'src/assets/gallery/student-workshop.jpg', w: 1600, h: 1200, label: 'Student Workshop' },
  {
    file: 'src/assets/gallery/community-planting.jpg',
    w: 1600,
    h: 1200,
    label: 'Community Planting',
  },
];

for (const [i, job] of jobs.entries()) {
  await mkdir(path.dirname(job.file), { recursive: true });
  const svg = makeSvg(job.label, job.w, job.h, PALETTES[i % PALETTES.length]);
  await sharp(Buffer.from(svg)).jpeg({ quality: 80, mozjpeg: true }).toFile(job.file);
  console.log(`✓ ${job.file} (${job.w}×${job.h})`);
}

console.log(`\nDone — ${jobs.length} placeholder images generated.`);
