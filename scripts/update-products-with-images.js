/**
 * Script to update products.ts with actual image imports
 * This maps the imported images to the product series structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../src/data/products.ts');
const imageImportsFile = path.join(__dirname, '../src/data/image-imports.ts');

// Read the image imports to understand the structure
const imageImportsContent = fs.readFileSync(imageImportsFile, 'utf8');

// Color mapping - maps color names to keys in productImages
const colorKeyMap = {
  'haruki': {
    'black': 'haruki_black',
    'camel': 'haruki_camel',
    'black-grey': 'haruki_black_grey',
    'candy': 'haruki_candy',
    'khaky': 'haruki_khaky',
    'navy': 'haruki_navy',
  },
  'hikaru': {
    'black': 'hikaru_black',
    'army': 'hikaru_army',
    'black-grey': 'hikaru_black_grey',
    'candy': 'hikaru_candy',
    'khaky': 'hikaru_khaky',
    'tan': 'hikaru_tan',
  },
  'junko': {
    'army': 'junko_army',
    'black': 'junko_black',
    'navy': 'junko_navy',
    'pink-blue': 'junko_pink_blue',
    'tan': 'junko_tan',
  },
  'kaiketsu': {
    'black': 'kaiketsu_black',
    'black-grey': 'kaiketsu_black_grey',
    'blue': 'kaiketsu_blue',
    'navy': 'kaiketsu_navy',
    'tan': 'kaiketsu_tan',
  },
  'kanji': {
    'army': 'kanji_army',
    'black': 'kanji_black',
    'navy': 'kanji_navy',
    'tan': 'kanji_tan',
  },
  'keiko': {
    'army': 'keiko_army',
    'black': 'keiko_black',
    'brown': 'keiko_brown',
    'navy': 'keiko_navy',
    'tan': 'keiko_tan',
  },
  'orca': {
    'army': 'orca_army',
    'black': 'orca_black',
    'navy': 'orca_navy',
    'tan': 'orca_tan',
  },
  'tadashi': {
    'black': 'tadashi_black',
    'camel': 'tadashi_camel',
    'navy': 'tadashi_navy',
  },
  'yoshiro': {
    'navy': 'yoshiro_navy',
    'army': 'yoshiro_army',
    'black': 'yoshiro_black',
    'camel': 'yoshiro_camel',
  },
  'yuki': {
    'camel': 'yuki_camel',
    'black': 'yuki_black',
    'black-grey': 'yuki_black_grey',
    'candy': 'yuki_candy',
    'khaky': 'yuki_khaky',
  },
};

// Generate the updated color variant code
function generateColorVariant(seriesId, variantId, name, color, colorKey) {
  return `      {
        id: '${variantId}',
        name: '${name}',
        color: '${color}',
        images: getColorVariantImages('${seriesId}', '${colorKey}'),
        featuredImage: getColorVariantImages('${seriesId}', '${colorKey}')[0] || null as any,
      }`;
}

// Read products.ts
let productsContent = fs.readFileSync(productsFile, 'utf8');

// Update each series
Object.keys(colorKeyMap).forEach(seriesId => {
  const colors = colorKeyMap[seriesId];
  
  // Find the series block and update color variants
  const seriesRegex = new RegExp(
    `(id: '${seriesId}',[\\s\\S]*?colorVariants: \\[[\\s\\S]*?)(\\],)`,
    'g'
  );
  
  // For each color, generate the updated variant
  const colorVariants = Object.entries(colors).map(([colorName, colorKey]) => {
    const variantId = `${seriesId}-${colorName.replace(/-/g, '-')}`;
    const name = colorName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const color = colorName === 'pink-blue' ? 'pink' : colorName === 'black-grey' ? 'grey' : colorName;
    
    return generateColorVariant(seriesId, variantId, name, color, colorKey);
  }).join(',\n');
  
  // Replace the colorVariants array
  productsContent = productsContent.replace(
    new RegExp(`(id: '${seriesId}',[\\s\\S]*?colorVariants: \\[)([\\s\\S]*?)(\\],)`, 'g'),
    `$1\n${colorVariants}\n    $3`
  );
});

// Write back
fs.writeFileSync(productsFile, productsContent, 'utf8');
console.log('✅ Updated products.ts with image mappings');

