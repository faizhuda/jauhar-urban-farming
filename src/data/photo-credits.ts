/**
 * Kredit foto stok Wikimedia Commons yang masih dipakai di src/assets/.
 * Satu sumber kebenaran — dulu hanya tercatat di MAINTENANCE.md (tidak disajikan
 * ke pengunjung), padahal foto CC BY / CC BY-SA mewajibkan atribusi terlihat
 * selama masih dipakai di produksi. Halaman /credits merender daftar ini.
 *
 * Saat sebuah foto diganti foto asli Jauhar, hapus barisnya di sini.
 * Kalau daftar ini kosong, hapus juga src/pages/credits.astro dan tautannya di Footer.
 */
export interface PhotoCredit {
  /** Path relatif di src/assets/ */
  asset: string;
  sourceTitle: string;
  sourceUrl: string;
  photographer: string;
  license: string;
}

export const photoCredits: PhotoCredit[] = [
  {
    asset: 'products/pickled-cucumber.jpg',
    sourceTitle: 'Pickled-cucumbers-1520638',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3APickled-cucumbers-1520638.jpg',
    photographer: 'WDnet',
    license: 'CC0',
  },
  {
    asset: 'products/cucumber-chips.jpg',
    sourceTitle: 'Kale Chips',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3AKale_Chips_(3425805140).jpg',
    photographer: 'Kari Sullivan',
    license: 'CC BY 2.0',
  },
  {
    asset: 'products/garden-salad-pack.jpg',
    sourceTitle: 'Fresh Salad (Unsplash)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3AFresh_Salad_(Unsplash).jpg',
    photographer: 'fireskystudios.com',
    license: 'CC0',
  },
  {
    asset: 'products/cucumber-seedlings.jpg',
    sourceTitle: 'Cucumber Seedlings',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ACucumber_Seedlings_(32108679).jpeg',
    photographer: 'Breanna Larow',
    license: 'CC BY 3.0',
  },
  {
    asset: 'gallery/drip-lines.jpg',
    sourceTitle: 'Button dripper',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3AButton_dripper.JPG',
    photographer: 'Borisshin',
    license: 'CC BY-SA 4.0',
  },
  {
    asset: 'gallery/campus-bazaar.jpg',
    sourceTitle: "InSeason Farmer's Market",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File%3AInSeason_Farmer's_Market%2C_North_Melbourne_Australia_(4570521176).jpg",
    photographer: 'Rexness',
    license: 'CC BY-SA 2.0',
  },
];
