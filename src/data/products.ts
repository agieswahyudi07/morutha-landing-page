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

export interface ProductSeries {
  id: string;
  name: string;
  description: string;
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
];

// Helper function to get featured products (first 4-6 series)
export function getFeaturedProducts(count: number = 6): ProductSeries[] {
  return PRODUCT_SERIES.slice(0, count);
}

// Helper function to get product by series ID
export function getProductBySeries(seriesId: string): ProductSeries | undefined {
  return PRODUCT_SERIES.find(series => series.id === seriesId);
}

