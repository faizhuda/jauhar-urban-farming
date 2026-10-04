import business from './data/business.json';
import { businessSchema, daysLabel } from './utils/site-settings';

// CMS settings are validated at build time and feed both visible content and JSON-LD.
const settings = businessSchema.parse(business);
export const SITE = {
  ...settings,
  hours: {
    ...settings.hours,
    label: `${daysLabel(settings.hours.days)}, ${settings.hours.opens} – ${settings.hours.closes}`,
  },
};

/** URL alamat lengkap satu baris, dipakai di Footer dan halaman Contact. */
export function fullAddress(): string {
  return `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}, ${SITE.address.region}, Malaysia`;
}

/** Link click-to-order WhatsApp berisi nama produk (PRD F3). */
export function waOrderLink(productName?: string): string {
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
