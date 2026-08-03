/**
 * Generates PNG favicon fallbacks from public/favicon.svg.
 * Run again with `npm run favicons` if the logo ever changes.
 * SVG favicons aren't picked up by every crawler/social preview yet, so we
 * ship PNG fallbacks alongside it.
 */
import sharp from 'sharp';

const SOURCE = 'public/favicon.svg';

const jobs = [
  { file: 'public/favicon-16x16.png', size: 16 },
  { file: 'public/favicon-32x32.png', size: 32 },
  { file: 'public/apple-touch-icon.png', size: 180 },
];

for (const job of jobs) {
  await sharp(SOURCE).resize(job.size, job.size).png().toFile(job.file);
  console.log(`✓ ${job.file} (${job.size}×${job.size})`);
}
