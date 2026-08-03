const dateFormatter = new Intl.DateTimeFormat('en-MY', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Format tanggal artikel Journal, mis. "20 July 2026". Dipakai di /journal & /journal/[slug]. */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
