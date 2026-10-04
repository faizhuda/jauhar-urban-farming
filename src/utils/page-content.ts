import { getEntry } from 'astro:content';

export async function pageContent(
  id: 'home' | 'about' | 'products' | 'gallery' | 'contact' | 'journal',
) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing page content: ${id}`);
  return entry.data;
}
