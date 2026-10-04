import { z } from 'astro/zod';

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM, for example 09:00.');
const text = z
  .string()
  .trim()
  .min(1, 'Please fill in this field.')
  .max(200, 'Use no more than 200 characters.');

export const businessSchema = z.object({
  name: text,
  tagline: text,
  whatsapp: z.string().regex(/^[1-9]\d{7,14}$/, 'Use a country code and digits only.'),
  address: z.object({
    street: text,
    locality: text,
    region: text,
    postalCode: z.string().regex(/^\d{5}$/, 'Use a five-digit postal code.'),
    country: z.literal('MY'),
  }),
  hours: z
    .object({
      days: z
        .array(z.enum(weekdays))
        .min(1)
        .refine((days) => new Set(days).size === days.length),
      opens: time,
      closes: time,
    })
    .refine((hours) => hours.closes > hours.opens, 'Closing time must be after opening time.'),
  socials: z.object({
    instagram: z
      .url()
      .regex(
        /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/,
        'Use an Instagram profile URL.',
      ),
  }),
  geo: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
});

export function daysLabel(days: readonly string[]): string {
  const sorted = weekdays.filter((day) => days.includes(day));
  const indexes = sorted.map((day) => weekdays.indexOf(day));
  const consecutive = indexes.every(
    (index, position) => position === 0 || index === indexes[position - 1] + 1,
  );
  return sorted.length > 2 && consecutive ? `${sorted[0]} – ${sorted.at(-1)}` : sorted.join(', ');
}
