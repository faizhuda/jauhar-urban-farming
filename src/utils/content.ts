/** Missing draft flags in existing content remain published; new CMS entries default to draft. */
export function isPublished(entry: { data: { draft?: boolean } }): boolean {
  return entry.data.draft !== true;
}

export function featuredProducts<
  T extends { data: { draft?: boolean; featured: boolean; order: number } },
>(entries: T[]): T[] {
  return entries
    .filter((entry) => isPublished(entry) && entry.data.featured)
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, 3);
}
