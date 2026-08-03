/**
 * Single source of truth untuk identitas situs.
 *
 * PENTING (PRD §9.3 & §14):
 * - Nomor WhatsApp HANYA boleh diganti di sini — semua tombol order membacanya.
 * - NAP (Name, Address, Phone) harus PERSIS sama dengan Google Business Profile
 *   dan sosial media mitra.
 */
export const SITE = {
  name: 'Jauhar Urban Farming',
  tagline: 'Fresh, campus-grown produce from IIUM Gombak',

  // Format: kode negara + nomor, angka saja, tanpa "+" (dipakai untuk link wa.me).
  whatsapp: '60132391877',

  // Disamakan persis dengan listing Google Maps "Jauhar Urban Farming's Site"
  // (lihat catatan NAP di chat/handover). Nama kampus tetap "Gombak" secara
  // geografis, tapi alamat pos resminya terdaftar di bawah Kuala Lumpur.
  address: {
    street: 'International Islamic University Malaysia (IIUM), Mahallah Halimah',
    locality: 'Kuala Lumpur',
    region: 'Wilayah Persekutuan Kuala Lumpur',
    postalCode: '50728',
    country: 'MY',
  },

  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
    label: 'Monday – Friday, 9:00 AM – 5:00 PM',
  },

  // TODO(S1-06): link sosial media resmi mitra. Mitra hanya punya Instagram (tidak ada Facebook).
  socials: {
    instagram: 'https://instagram.com/jauharurbanfarming',
  },

  // Pin persis dari listing Maps "Jauhar Urban Farming's Site" (lihat catatan NAP di README/chat).
  // Satu-satunya tempat koordinat ditulis — mapsEmbedUrl() dan JSON-LD geo (localBusinessLd)
  // berasal dari sini, supaya tidak ada dua angka lat/lng yang bisa berbeda.
  geo: { lat: 3.2576273, lng: 101.7337326 },
} as const;

/** URL alamat lengkap satu baris, dipakai di Footer dan halaman Contact. */
export function fullAddress(): string {
  return `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}, ${SITE.address.region}, Malaysia`;
}

/** Link click-to-order WhatsApp berisi nama produk (PRD F3). */
export function waOrderLink(productName?: string): string {
  // TODO(S0-08): finalkan template pesan bersama tim Content.
  const message = productName
    ? `Hello Jauhar Urban Farming! I would like to order: *${productName}*. Is it available?`
    : 'Hello Jauhar Urban Farming! I would like to ask about your products.';
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Google Maps embed URL, diturunkan dari SITE.geo (satu sumber koordinat). */
export function mapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&output=embed`;
}

/** JSON-LD LocalBusiness — dipakai di Home & Contact (PRD §9.2), data dari NAP tunggal. */
export function localBusinessLd(imageUrl: string, siteUrl?: string) {
  return {
    '@type': 'LocalBusiness',
    name: SITE.name,
    image: imageUrl,
    url: siteUrl,
    telephone: `+${SITE.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    sameAs: [SITE.socials.instagram],
  };
}
