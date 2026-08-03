import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections (PRD NF4): data produk & galeri terpisah dari markup,
 * tervalidasi schema Zod — harga wajib angka, foto & alt text wajib ada.
 * Panduan mengisi: docs/content-guide.md
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      /** Harga dalam MYR (Ringgit Malaysia), angka saja. */
      price: z.number().positive(),
      /** Satuan jual, mis. "kg", "jar", "pack". */
      unit: z.string().default('pack'),
      /** Deskripsi singkat — tampil di kartu produk DAN dipakai di JSON-LD. */
      description: z.string().min(10).max(200),
      image: image(),
      imageAlt: z.string().min(1),
      category: z.enum(['fresh', 'processed', 'experience']),
      /** Sembunyikan dari katalog sepenuhnya (mis. eksperimen yang belum pasti dilanjut). */
      draft: z.boolean().default(false),
      inStock: z.boolean().default(true),
      /** Produk unggulan tampil di Beranda. */
      featured: z.boolean().default(false),
      /** Urutan tampil di katalog (kecil = lebih dulu). */
      order: z.number().int().default(99),
    }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string().min(1),
      caption: z.string().min(1),
      date: z.date(),
      order: z.number().int().default(99),
    }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      /** Ringkasan singkat — tampil di kartu daftar artikel DAN meta description. */
      description: z.string().min(10).max(200),
      date: z.date(),
      image: image(),
      imageAlt: z.string().min(1),
    }),
});

export const collections = { products, gallery, journal };
