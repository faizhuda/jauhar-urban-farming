/**
 * Generates PNG favicons from the real Jauhar Urban Farming logo.
 * Run again with `npm run favicons` if the logo ever changes.
 */
import sharp from 'sharp';

const SOURCE = 'src/assets/brand/logo.png';

const jobs = [
  { file: 'public/favicon-16x16.png', size: 16 },
  { file: 'public/favicon-32x32.png', size: 32 },
  { file: 'public/apple-touch-icon.png', size: 180 },
];

for (const job of jobs) {
  await sharp(SOURCE).resize(job.size, job.size).png().toFile(job.file);
  console.log(`✓ ${job.file} (${job.size}×${job.size})`);
}
