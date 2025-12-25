import type { ImageMetadata } from 'astro';
import { productImages } from './image-imports';

// Helper function to get images for a color variant
function getColorVariantImages(seriesId: string, colorKey: string): ImageMetadata[] {
  const series = productImages[seriesId as keyof typeof productImages];
  if (!series) return [];
  
  // Normalize color key (replace hyphens with underscores for matching)
  const normalizedColorKey = colorKey.replace(/-/g, '_');
  
  // Try multiple key formats:
  // 1. With series prefix: 'junko_army'
  const prefixedKey = `${seriesId}_${normalizedColorKey}`;
  if (series[prefixedKey as keyof typeof series]) {
    return (series[prefixedKey as keyof typeof series] as ImageMetadata[]) || [];
  }
  
  // 2. Direct color key (for Junko and similar): 'army', 'pink-blue'
  const directKey = colorKey; // Keep original with hyphen if present
  if (series[directKey as keyof typeof series]) {
    return (series[directKey as keyof typeof series] as ImageMetadata[]) || [];
  }
  
  // 3. Normalized direct key: 'pink_blue'
  if (series[normalizedColorKey as keyof typeof series]) {
    return (series[normalizedColorKey as keyof typeof series] as ImageMetadata[]) || [];
  }
  
  // 4. Fallback: try to find matching key by partial match
  const colorKeys = Object.keys(series);
  const matchingKey = colorKeys.find(key => {
    const keyLower = key.toLowerCase();
    const colorLower = colorKey.toLowerCase();
    const normalizedColorLower = normalizedColorKey.toLowerCase();
    
    // Match exact color name (e.g., 'army' matches 'army')
    if (keyLower === colorLower || keyLower === normalizedColorLower) return true;
    
    // Match if key ends with color (e.g., 'junko_army' ends with 'army')
    if (keyLower.endsWith('_' + normalizedColorLower) || keyLower.endsWith('_' + colorLower)) return true;
    
    // Match if key contains color
    if (keyLower.includes(normalizedColorLower) || keyLower.includes(colorLower)) return true;
    
    return false;
  });
  
  if (matchingKey && series[matchingKey as keyof typeof series]) {
    return (series[matchingKey as keyof typeof series] as ImageMetadata[]) || [];
  }
  
  return [];
}

export interface ColorVariant {
  id: string;
  name: string;
  color: string;
  images: ImageMetadata[];
  featuredImage: ImageMetadata; // First image as featured
}

// Product categories
export type ProductCategory = 'sandal' | 'sepatu' | 'kaos' | 'pakaian' | 'aksesoris';

export interface ProductSeries {
  id: string;
  name: string;
  description: string;
  category: ProductCategory; // Product category
  colorVariants: ColorVariant[];
  featuredColor?: string; // Default color to show
  price: number;
  tag?: string; // e.g., "BEST SELLER", "NEW"
}

// Product Series Data
// This will be populated with actual image imports
export const PRODUCT_SERIES: ProductSeries[] = [
  {
    id: 'haruki',
    name: 'Haruki',
    description: 'Kenyamanan klasik dengan gaya modern',
    category: 'sandal',
    price: 189000,
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'haruki-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('haruki', 'black'),
        featuredImage: getColorVariantImages('haruki', 'black')[0] || null as any,
      },
      {
        id: 'haruki-camel',
        name: 'Camel',
        color: 'camel',
        images: getColorVariantImages('haruki', 'camel'),
        featuredImage: getColorVariantImages('haruki', 'camel')[0] || null as any,
      },
      {
        id: 'haruki-black-grey',
        name: 'Black Grey',
        color: 'grey',
        images: getColorVariantImages('haruki', 'black-grey'),
        featuredImage: getColorVariantImages('haruki', 'black-grey')[0] || null as any,
      },
      {
        id: 'haruki-candy',
        name: 'Candy',
        color: 'pink',
        images: getColorVariantImages('haruki', 'candy'),
        featuredImage: getColorVariantImages('haruki', 'candy')[0] || null as any,
      },
      {
        id: 'haruki-khaky',
        name: 'Khaky',
        color: 'khaki',
        images: getColorVariantImages('haruki', 'khaky'),
        featuredImage: getColorVariantImages('haruki', 'khaky')[0] || null as any,
      },
      {
        id: 'haruki-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('haruki', 'navy'),
        featuredImage: getColorVariantImages('haruki', 'navy')[0] || null as any,
      },
    ],
  },
  {
    id: 'hikaru',
    name: 'Hikaru',
    description: 'Desain berani dan petualang',
    category: 'sandal',
    price: 199000,
    tag: 'TERLARIS',
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'hikaru-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('hikaru', 'black'),
        featuredImage: getColorVariantImages('hikaru', 'black')[0] || null as any,
      },
      {
        id: 'hikaru-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('hikaru', 'army'),
        featuredImage: getColorVariantImages('hikaru', 'army')[0] || null as any,
      },
      {
        id: 'hikaru-black-grey',
        name: 'Black Grey',
        color: 'grey',
        images: getColorVariantImages('hikaru', 'black-grey'),
        featuredImage: getColorVariantImages('hikaru', 'black-grey')[0] || null as any,
      },
      {
        id: 'hikaru-candy',
        name: 'Candy',
        color: 'pink',
        images: getColorVariantImages('hikaru', 'candy'),
        featuredImage: getColorVariantImages('hikaru', 'candy')[0] || null as any,
      },
      {
        id: 'hikaru-khaky',
        name: 'Khaky',
        color: 'khaki',
        images: getColorVariantImages('hikaru', 'khaky'),
        featuredImage: getColorVariantImages('hikaru', 'khaky')[0] || null as any,
      },
      {
        id: 'hikaru-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('hikaru', 'tan'),
        featuredImage: getColorVariantImages('hikaru', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'junko',
    name: 'Junko',
    description: 'Menyenangkan dan penuh warna',
    category: 'sandal',
    price: 175000,
    featuredColor: 'pink-blue',
    colorVariants: [
      {
        id: 'junko-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('junko', 'army'),
        featuredImage: getColorVariantImages('junko', 'army')[0] || null as any,
      },
      {
        id: 'junko-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('junko', 'black'),
        featuredImage: getColorVariantImages('junko', 'black')[0] || null as any,
      },
      {
        id: 'junko-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('junko', 'navy'),
        featuredImage: getColorVariantImages('junko', 'navy')[0] || null as any,
      },
      {
        id: 'junko-pink-blue',
        name: 'Pink Blue',
        color: 'pink',
        images: getColorVariantImages('junko', 'pink-blue'),
        featuredImage: getColorVariantImages('junko', 'pink-blue')[0] || null as any,
      },
      {
        id: 'junko-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('junko', 'tan'),
        featuredImage: getColorVariantImages('junko', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaiketsu',
    name: 'Kaiketsu',
    description: 'Tahan lama dan kokoh',
    category: 'sandal',
    price: 210000,
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'kaiketsu-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('kaiketsu', 'black'),
        featuredImage: getColorVariantImages('kaiketsu', 'black')[0] || null as any,
      },
      {
        id: 'kaiketsu-black-grey',
        name: 'Black Grey',
        color: 'grey',
        images: getColorVariantImages('kaiketsu', 'black-grey'),
        featuredImage: getColorVariantImages('kaiketsu', 'black-grey')[0] || null as any,
      },
      {
        id: 'kaiketsu-blue',
        name: 'Blue',
        color: 'blue',
        images: getColorVariantImages('kaiketsu', 'blue'),
        featuredImage: getColorVariantImages('kaiketsu', 'blue')[0] || null as any,
      },
      {
        id: 'kaiketsu-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('kaiketsu', 'navy'),
        featuredImage: getColorVariantImages('kaiketsu', 'navy')[0] || null as any,
      },
      {
        id: 'kaiketsu-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('kaiketsu', 'tan'),
        featuredImage: getColorVariantImages('kaiketsu', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'kanji',
    name: 'Kanji',
    description: 'Elegan abadi',
    category: 'sandal',
    price: 195000,
    featuredColor: 'navy',
    colorVariants: [
      {
        id: 'kanji-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('kanji', 'army'),
        featuredImage: getColorVariantImages('kanji', 'army')[0] || null as any,
      },
      {
        id: 'kanji-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('kanji', 'black'),
        featuredImage: getColorVariantImages('kanji', 'black')[0] || null as any,
      },
      {
        id: 'kanji-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('kanji', 'navy'),
        featuredImage: getColorVariantImages('kanji', 'navy')[0] || null as any,
      },
      {
        id: 'kanji-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('kanji', 'tan'),
        featuredImage: getColorVariantImages('kanji', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'keiko',
    name: 'Keiko',
    description: 'Kenyamanan bertemu gaya',
    category: 'sandal',
    price: 185000,
    featuredColor: 'navy',
    colorVariants: [
      {
        id: 'keiko-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('keiko', 'army'),
        featuredImage: getColorVariantImages('keiko', 'army')[0] || null as any,
      },
      {
        id: 'keiko-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('keiko', 'black'),
        featuredImage: getColorVariantImages('keiko', 'black')[0] || null as any,
      },
      {
        id: 'keiko-brown',
        name: 'Brown',
        color: 'brown',
        images: getColorVariantImages('keiko', 'brown'),
        featuredImage: getColorVariantImages('keiko', 'brown')[0] || null as any,
      },
      {
        id: 'keiko-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('keiko', 'navy'),
        featuredImage: getColorVariantImages('keiko', 'navy')[0] || null as any,
      },
      {
        id: 'keiko-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('keiko', 'tan'),
        featuredImage: getColorVariantImages('keiko', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'orca',
    name: 'Orca',
    description: 'Berani dan modern',
    category: 'sandal',
    price: 200000,
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'orca-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('orca', 'army'),
        featuredImage: getColorVariantImages('orca', 'army')[0] || null as any,
      },
      {
        id: 'orca-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('orca', 'black'),
        featuredImage: getColorVariantImages('orca', 'black')[0] || null as any,
      },
      {
        id: 'orca-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('orca', 'navy'),
        featuredImage: getColorVariantImages('orca', 'navy')[0] || null as any,
      },
      {
        id: 'orca-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('orca', 'tan'),
        featuredImage: getColorVariantImages('orca', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'tadashi',
    name: 'Tadashi',
    description: 'Klasik dan elegan',
    category: 'sandal',
    price: 190000,
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'tadashi-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('tadashi', 'black'),
        featuredImage: getColorVariantImages('tadashi', 'black')[0] || null as any,
      },
      {
        id: 'tadashi-camel',
        name: 'Camel',
        color: 'camel',
        images: getColorVariantImages('tadashi', 'camel'),
        featuredImage: getColorVariantImages('tadashi', 'camel')[0] || null as any,
      },
      {
        id: 'tadashi-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('tadashi', 'navy'),
        featuredImage: getColorVariantImages('tadashi', 'navy')[0] || null as any,
      },
    ],
  },
  {
    id: 'yoshiro',
    name: 'Yoshiro',
    description: 'Desain siap petualangan',
    category: 'sandal',
    price: 205000,
    featuredColor: 'navy',
    colorVariants: [
      {
        id: 'yoshiro-navy',
        name: 'Navy',
        color: 'navy',
        images: getColorVariantImages('yoshiro', 'navy'),
        featuredImage: getColorVariantImages('yoshiro', 'navy')[0] || null as any,
      },
      {
        id: 'yoshiro-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('yoshiro', 'army'),
        featuredImage: getColorVariantImages('yoshiro', 'army')[0] || null as any,
      },
      {
        id: 'yoshiro-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('yoshiro', 'black'),
        featuredImage: getColorVariantImages('yoshiro', 'black')[0] || null as any,
      },
      {
        id: 'yoshiro-camel',
        name: 'Camel',
        color: 'camel',
        images: getColorVariantImages('yoshiro', 'camel'),
        featuredImage: getColorVariantImages('yoshiro', 'camel')[0] || null as any,
      },
    ],
  },
  {
    id: 'yuki',
    name: 'Yuki',
    description: 'Lembut dan menyenangkan',
    category: 'sandal',
    price: 180000,
    featuredColor: 'candy',
    colorVariants: [
      {
        id: 'yuki-camel',
        name: 'Camel',
        color: 'camel',
        images: getColorVariantImages('yuki', 'camel'),
        featuredImage: getColorVariantImages('yuki', 'camel')[0] || null as any,
      },
      {
        id: 'yuki-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('yuki', 'black'),
        featuredImage: getColorVariantImages('yuki', 'black')[0] || null as any,
      },
      {
        id: 'yuki-black-grey',
        name: 'Black Grey',
        color: 'grey',
        images: getColorVariantImages('yuki', 'black-grey'),
        featuredImage: getColorVariantImages('yuki', 'black-grey')[0] || null as any,
      },
      {
        id: 'yuki-candy',
        name: 'Candy',
        color: 'pink',
        images: getColorVariantImages('yuki', 'candy'),
        featuredImage: getColorVariantImages('yuki', 'candy')[0] || null as any,
      },
      {
        id: 'yuki-khaky',
        name: 'Khaky',
        color: 'khaki',
        images: getColorVariantImages('yuki', 'khaky'),
        featuredImage: getColorVariantImages('yuki', 'khaky')[0] || null as any,
      },
    ],
  },
  // Kaos Products
  {
    id: 'kaos-chio',
    name: 'Kaos Chio',
    description: 'Kaos nyaman dengan desain modern',
    category: 'kaos',
    price: 89000,
    featuredColor: 'blue',
    colorVariants: [
      {
        id: 'kaos-chio-blue',
        name: 'Blue',
        color: 'blue',
        images: getColorVariantImages('kaos-chio', 'blue'),
        featuredImage: getColorVariantImages('kaos-chio', 'blue')[0] || null as any,
      },
      {
        id: 'kaos-chio-yellow',
        name: 'Yellow',
        color: 'yellow',
        images: getColorVariantImages('kaos-chio', 'yellow'),
        featuredImage: getColorVariantImages('kaos-chio', 'yellow')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaos-daiki',
    name: 'Kaos Daiki',
    description: 'Kaos casual untuk aktivitas sehari-hari',
    category: 'kaos',
    price: 95000,
    featuredColor: 'red',
    colorVariants: [
      {
        id: 'kaos-daiki-red',
        name: 'Red',
        color: 'red',
        images: getColorVariantImages('kaos-daiki', 'red'),
        featuredImage: getColorVariantImages('kaos-daiki', 'red')[0] || null as any,
      },
      {
        id: 'kaos-daiki-steel-blue',
        name: 'Steel Blue',
        color: 'blue',
        images: getColorVariantImages('kaos-daiki', 'steel-blue'),
        featuredImage: getColorVariantImages('kaos-daiki', 'steel-blue')[0] || null as any,
      },
      {
        id: 'kaos-daiki-brown',
        name: 'Brown',
        color: 'brown',
        images: getColorVariantImages('kaos-daiki', 'brown'),
        featuredImage: getColorVariantImages('kaos-daiki', 'brown')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaos-fumio',
    name: 'Kaos Fumio',
    description: 'Kaos klasik dengan kualitas premium',
    category: 'kaos',
    price: 92000,
    featuredColor: 'white',
    colorVariants: [
      {
        id: 'kaos-fumio-white',
        name: 'White',
        color: 'white',
        images: getColorVariantImages('kaos-fumio', 'white'),
        featuredImage: getColorVariantImages('kaos-fumio', 'white')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaos-ken',
    name: 'Kaos Ken',
    description: 'Kaos dengan warna unik dan menarik',
    category: 'kaos',
    price: 88000,
    featuredColor: 'blue-green',
    colorVariants: [
      {
        id: 'kaos-ken-blue-green',
        name: 'Blue Green',
        color: 'blue',
        images: getColorVariantImages('kaos-ken', 'blue-green'),
        featuredImage: getColorVariantImages('kaos-ken', 'blue-green')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaos-kibatsu',
    name: 'Kaos Kibatsu',
    description: 'Kaos dengan desain berani dan stylish',
    category: 'kaos',
    price: 90000,
    featuredColor: 'black',
    colorVariants: [
      {
        id: 'kaos-kibatsu-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('kaos-kibatsu', 'black'),
        featuredImage: getColorVariantImages('kaos-kibatsu', 'black')[0] || null as any,
      },
      {
        id: 'kaos-kibatsu-maroon',
        name: 'Maroon',
        color: 'brown',
        images: getColorVariantImages('kaos-kibatsu', 'maroon'),
        featuredImage: getColorVariantImages('kaos-kibatsu', 'maroon')[0] || null as any,
      },
    ],
  },
  // New Sandal Products
  {
    id: 'zero',
    name: 'Zero',
    description: 'Desain modern dan fungsional',
    category: 'sandal',
    price: 185000,
    featuredColor: 'blue',
    colorVariants: [
      {
        id: 'zero-blue',
        name: 'Blue',
        color: 'blue',
        images: getColorVariantImages('zero', 'blue'),
        featuredImage: getColorVariantImages('zero', 'blue')[0] || null as any,
      },
      {
        id: 'zero-red',
        name: 'Red',
        color: 'red',
        images: getColorVariantImages('zero', 'red'),
        featuredImage: getColorVariantImages('zero', 'red')[0] || null as any,
      },
      {
        id: 'zero-tosca',
        name: 'Tosca',
        color: 'tosca',
        images: getColorVariantImages('zero', 'tosca'),
        featuredImage: getColorVariantImages('zero', 'tosca')[0] || null as any,
      },
    ],
  },
  {
    id: 'goru',
    name: 'Goru',
    description: 'Kuat dan tahan lama',
    category: 'sandal',
    price: 195000,
    featuredColor: 'army',
    colorVariants: [
      {
        id: 'goru-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('goru', 'army'),
        featuredImage: getColorVariantImages('goru', 'army')[0] || null as any,
      },
      {
        id: 'goru-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('goru', 'black'),
        featuredImage: getColorVariantImages('goru', 'black')[0] || null as any,
      },
      {
        id: 'goru-blue',
        name: 'Blue',
        color: 'blue',
        images: getColorVariantImages('goru', 'blue'),
        featuredImage: getColorVariantImages('goru', 'blue')[0] || null as any,
      },
      {
        id: 'goru-red',
        name: 'Red',
        color: 'red',
        images: getColorVariantImages('goru', 'red'),
        featuredImage: getColorVariantImages('goru', 'red')[0] || null as any,
      },
    ],
  },
  {
    id: 'hiro',
    name: 'Hiro',
    description: 'Klasik dan elegan',
    category: 'sandal',
    price: 190000,
    featuredColor: 'tan',
    colorVariants: [
      {
        id: 'hiro-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('hiro', 'tan'),
        featuredImage: getColorVariantImages('hiro', 'tan')[0] || null as any,
      },
    ],
  },
  {
    id: 'kaizen',
    name: 'Kaizen',
    description: 'Kontinyu improvement dalam desain',
    category: 'sandal',
    price: 200000,
    featuredColor: 'army',
    colorVariants: [
      {
        id: 'kaizen-army',
        name: 'Army',
        color: 'green',
        images: getColorVariantImages('kaizen', 'army'),
        featuredImage: getColorVariantImages('kaizen', 'army')[0] || null as any,
      },
      {
        id: 'kaizen-black',
        name: 'Black',
        color: 'black',
        images: getColorVariantImages('kaizen', 'black'),
        featuredImage: getColorVariantImages('kaizen', 'black')[0] || null as any,
      },
      {
        id: 'kaizen-blue',
        name: 'Blue',
        color: 'blue',
        images: getColorVariantImages('kaizen', 'blue'),
        featuredImage: getColorVariantImages('kaizen', 'blue')[0] || null as any,
      },
      {
        id: 'kaizen-red',
        name: 'Red',
        color: 'red',
        images: getColorVariantImages('kaizen', 'red'),
        featuredImage: getColorVariantImages('kaizen', 'red')[0] || null as any,
      },
      {
        id: 'kaizen-tan',
        name: 'Tan',
        color: 'tan',
        images: getColorVariantImages('kaizen', 'tan'),
        featuredImage: getColorVariantImages('kaizen', 'tan')[0] || null as any,
      },
      {
        id: 'kaizen-tosca',
        name: 'Tosca',
        color: 'tosca',
        images: getColorVariantImages('kaizen', 'tosca'),
        featuredImage: getColorVariantImages('kaizen', 'tosca')[0] || null as any,
      },
    ],
  },
];

// Helper function to normalize color names for comparison
function normalizeColorName(color: string): string {
  const normalized = color.toLowerCase();
  // Map similar colors to a common name
  if (normalized.includes('army') || normalized.includes('green')) return 'green';
  if (normalized.includes('candy') || normalized.includes('pink')) return 'pink';
  if (normalized.includes('navy') || normalized.includes('blue')) return 'blue';
  if (normalized.includes('grey') || normalized.includes('gray')) return 'grey';
  return normalized;
}

// Helper function to get unique color for each series
function getUniqueFeaturedColor(series: ProductSeries, usedColors: Set<string>): string {
  // Priority order of colors to display (most visually distinct first)
  const colorPriority = ['pink', 'candy', 'army', 'green', 'blue', 'navy', 'camel', 'tan', 'khaki', 'brown', 'grey', 'black'];
  
  // First, try to find a color from priority list that's available and not used
  for (const priorityColor of colorPriority) {
    const availableVariant = series.colorVariants.find(v => {
      const variantColor = normalizeColorName(v.color);
      const variantName = normalizeColorName(v.name);
      const priorityNormalized = normalizeColorName(priorityColor);
      
      return variantColor === priorityNormalized || 
             variantName.includes(priorityNormalized) ||
             v.id.toLowerCase().includes(priorityColor);
    });
    
    if (availableVariant) {
      const normalizedColor = normalizeColorName(availableVariant.color);
      if (!usedColors.has(normalizedColor)) {
        usedColors.add(normalizedColor);
        return availableVariant.color; // Return original color value
      }
    }
  }
  
  // If no priority color available, find any unused color
  for (const variant of series.colorVariants) {
    const normalizedColor = normalizeColorName(variant.color);
    if (!usedColors.has(normalizedColor)) {
      usedColors.add(normalizedColor);
      return variant.color;
    }
  }
  
  // Fallback: use the first available color or default
  return series.colorVariants[0]?.color || series.featuredColor || 'black';
}

// Helper function to get featured products with unique colors
export function getFeaturedProducts(count: number = 6): ProductSeries[] {
  const series = PRODUCT_SERIES.slice(0, count);
  const usedColors = new Set<string>();
  
  // Assign unique colors to each series
  // Note: getUniqueFeaturedColor already adds to usedColors internally
  return series.map(s => {
    const uniqueColor = getUniqueFeaturedColor(s, usedColors);
    
    // Return a copy of the series with updated featuredColor
    return {
      ...s,
      featuredColor: uniqueColor
    };
  });
}

// Helper function to get all products with unique colors
export function getAllProductsWithUniqueColors(): ProductSeries[] {
  const usedColors = new Set<string>();
  
  // Assign unique colors to each series
  // Note: getUniqueFeaturedColor already adds to usedColors internally
  return PRODUCT_SERIES.map(s => {
    const uniqueColor = getUniqueFeaturedColor(s, usedColors);
    
    // Return a copy of the series with updated featuredColor
    return {
      ...s,
      featuredColor: uniqueColor
    };
  });
}

// Helper function to get product by series ID
export function getProductBySeries(seriesId: string): ProductSeries | undefined {
  return PRODUCT_SERIES.find(series => series.id === seriesId);
}

// Helper function to get all available categories
export function getAllCategories(): ProductCategory[] {
  const categories = new Set<ProductCategory>();
  PRODUCT_SERIES.forEach(series => {
    if (series.category) {
      categories.add(series.category);
    }
  });
  return Array.from(categories);
}

// Helper function to get products by category
export function getProductsByCategory(category: ProductCategory): ProductSeries[] {
  return PRODUCT_SERIES.filter(series => series.category === category);
}

// Helper function to get products by category with unique colors
export function getProductsByCategoryWithUniqueColors(category: ProductCategory): ProductSeries[] {
  const products = getProductsByCategory(category);
  const usedColors = new Set<string>();
  
  return products.map(s => {
    const uniqueColor = getUniqueFeaturedColor(s, usedColors);
    return {
      ...s,
      featuredColor: uniqueColor
    };
  });
}

