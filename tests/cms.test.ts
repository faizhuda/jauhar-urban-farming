import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { isPublished, featuredProducts } from '../src/utils/content.ts';
import { businessSchema, daysLabel } from '../src/utils/site-settings.ts';
import { MIN_PRICE, DESCRIPTION_MIN, DESCRIPTION_MAX } from '../src/utils/content-rules.ts';

const config = parse(readFileSync(new URL('../public/admin/config.yml', import.meta.url), 'utf8'));
const business = JSON.parse(
  readFileSync(new URL('../src/data/business.json', import.meta.url), 'utf8'),
);

test('drafts stay hidden, including featured products, without hiding legacy photos', () => {
  assert.equal(isPublished({ data: { draft: true } }), false);
  assert.equal(isPublished({ data: {} }), true);
  const entries = [
    { id: 'hidden', data: { draft: true, featured: true, order: 1 } },
    ...[5, 3, 4, 2].map((order) => ({
      id: String(order),
      data: { draft: false, featured: true, order },
    })),
  ];
  assert.deepEqual(
    featuredProducts(entries).map((entry) => entry.id),
    ['2', '3', '4'],
  );
  assert.equal(entries.length, 5);
});

test('new entries start hidden and price/description rules match build validation', () => {
  for (const name of ['products', 'gallery', 'journal']) {
    const collection = config.collections.find((item: { name: string }) => item.name === name);
    assert.equal(
      collection.fields.find((field: { name: string }) => field.name === 'draft').default,
      true,
    );
  }
  const products = config.collections.find((item: { name: string }) => item.name === 'products');
  assert.equal(
    products.fields.find((field: { name: string }) => field.name === 'price').min,
    MIN_PRICE,
  );
  assert.equal(
    products.fields.some((field: { name: string }) => field.name === 'body'),
    false,
  );
  const pattern = new RegExp(
    products.fields.find((field: { name: string }) => field.name === 'description').pattern[0],
  );
  assert.equal(pattern.test('x'.repeat(DESCRIPTION_MIN - 1)), false);
  assert.equal(pattern.test('x'.repeat(DESCRIPTION_MIN)), true);
  assert.equal(pattern.test('x'.repeat(DESCRIPTION_MAX + 1)), false);
  assert.equal(pattern.test('First line\nsecond line'), true);
});

test('business details reject invalid phones, unsafe links and reversed opening hours', () => {
  assert.equal(businessSchema.safeParse(business).success, true);
  assert.equal(businessSchema.safeParse({ ...business, whatsapp: '+60 123' }).success, false);
  assert.equal(
    businessSchema.safeParse({ ...business, socials: { instagram: 'javascript:alert(1)' } })
      .success,
    false,
  );
  assert.equal(
    businessSchema.safeParse({
      ...business,
      hours: { ...business.hours, opens: '19:00', closes: '09:00' },
    }).success,
    false,
  );
  assert.equal(
    businessSchema.safeParse({ ...business, hours: { ...business.hours, days: [] } }).success,
    false,
  );
  assert.equal(
    daysLabel(['Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']),
    'Monday – Friday',
  );
  assert.equal(daysLabel(['Sunday', 'Saturday']), 'Saturday, Sunday');
});

test('uploads are capped and normalized while page routes cannot be added or deleted', () => {
  assert.equal(config.media_libraries.default.config.max_file_size, 12 * 1024 * 1024);
  assert.equal(config.media_libraries.all.transformations.raster_image.width, 1600);
  assert.equal(config.media_libraries.all.transformations.raster_image.format, 'webp');
  const pages = config.collections.find((item: { name: string }) => item.name === 'pages');
  assert.equal(pages.create, false);
  assert.equal(pages.delete, false);
});
