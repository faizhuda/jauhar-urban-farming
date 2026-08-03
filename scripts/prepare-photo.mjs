/**
 * Proses satu foto asli dari `images/` menjadi aset situs siap pakai:
 * resize + crop pintar (fokus otomatis ke bagian paling "menarik" lewat
 * sharp attention strategy) ke rasio/ dimensi slot target, lalu ditulis ke
 * `src/assets/`. sharp secara default TIDAK menyalin metadata EXIF (termasuk
 * GPS) kecuali diminta lewat .withMetadata() — jadi ini juga otomatis
 * membuang lokasi GPS yang tertanam di foto asal (lihat MAINTENANCE.md).
 *
 * Pemakaian:
 *   node scripts/prepare-photo.mjs <sumber> <tujuan> <lebar> <tinggi>
 *
 * Contoh:
 *   node scripts/prepare-photo.mjs images/PXL_20250912_103553583.jpg src/assets/hero.jpg 1600 900
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [, , src, dest, wArg, hArg] = process.argv;

if (!src || !dest || !wArg || !hArg) {
  console.error('Pemakaian: node scripts/prepare-photo.mjs <sumber> <tujuan> <lebar> <tinggi>');
  process.exit(1);
}

const width = Number(wArg);
const height = Number(hArg);

await mkdir(path.dirname(dest), { recursive: true });

await sharp(src)
  .rotate() // terapkan orientasi EXIF sebelum di-strip, supaya foto tidak kesamping
  .resize(width, height, { fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(dest);

console.log(`✓ ${dest} (${width}×${height}) ← ${src}`);
