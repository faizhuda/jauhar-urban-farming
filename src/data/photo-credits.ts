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
    asset: 'hero.jpg',
    sourceTitle: 'Cucumber in the greenhouse',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ACucumber_in_the_greenhouse.jpg',
    photographer: 'Pascal Kings',
    license: 'CC BY 4.0',
  },
  {
    asset: 'og-default.jpg',
    sourceTitle: 'Cucumber in the greenhouse',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ACucumber_in_the_greenhouse.jpg',
    photographer: 'Pascal Kings',
    license: 'CC BY 4.0',
  },
  {
    asset: 'about-hero.jpg',
    sourceTitle: 'Working in the garden DVIDS169759',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Working_in_the_garden_DVIDS169759.jpg',
    photographer: 'Petty Officer 2nd Class Adam Cole',
    license: 'Public domain',
  },
  {
    asset: 'products/fresh-cucumber.jpg',
    sourceTitle: 'Fresh green cucumbers',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3AFresh_green_cucumbers.jpg',
    photographer: 'Rukkyah',
    license: 'CC BY-SA 4.0',
  },
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
    asset: 'products/farm-tour-workshop.jpg',
    sourceTitle: 'Rolla Community Garden',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File%3ADaniel_Oerther_working_with_neighbors_to_install_a_fence_at_the_Rolla_Community_Garden.jpg',
    photographer: 'Oertherdb',
    license: 'CC BY-SA 4.0',
  },
  {
    asset: 'gallery/fertigation-rows.jpg',
    sourceTitle: 'Tomato P5260299b',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ATomato_P5260299b.jpg',
    photographer: 'Goldlocki',
    license: 'CC BY-SA 3.0',
  },
  {
    asset: 'gallery/morning-harvest.jpg',
    sourceTitle: 'Basket with vegetables 2017 G1',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3ABasket_with_vegetables_2017_G1.jpg',
    photographer: 'George Chernilevsky',
    license: 'Public domain',
  },
  {
    asset: 'gallery/seedling-nursery.jpg',
    sourceTitle: 'Farm Ready Seedling Facility',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File%3A5904Farm_Ready_Seedling_Facility_East_West_Seed_Philippines_02.jpg',
    photographer: 'Judgefloro',
    license: 'CC0',
  },
  {
    asset: 'gallery/drip-lines.jpg',
    sourceTitle: 'Button dripper',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File%3AButton_dripper.JPG',
    photographer: 'Borisshin',
    license: 'CC BY-SA 4.0',
  },
  {
    asset: 'gallery/packing-day.jpg',
    sourceTitle: 'RMA-Urban Roots St Paul',
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File%3ARMA-Urban_Roots_St_Paul-Ag_in_the_city_(20220929-RMA-CDP-0105).jpg",
    photographer: 'USDA',
    license: 'Public domain',
  },
  {
    asset: 'gallery/campus-bazaar.jpg',
    sourceTitle: "InSeason Farmer's Market",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File%3AInSeason_Farmer's_Market%2C_North_Melbourne_Australia_(4570521176).jpg",
    photographer: 'Rexness',
    license: 'CC BY-SA 2.0',
  },
  {
    asset: 'gallery/student-workshop.jpg',
    sourceTitle: "2016 People's Garden Planting 0063",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File%3A2016_People's_Garden_Planting_(20160405-AMS-SLS-0063).jpg",
    photographer: 'USDA',
    license: 'Public domain',
  },
  {
    asset: 'gallery/community-planting.jpg',
    sourceTitle: "2016 People's Garden Planting 0092",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File%3A2016_People's_Garden_Planting_(20160405-AMS-SLS-0092).jpg",
    photographer: 'USDA',
    license: 'Public domain',
  },
];
