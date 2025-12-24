/**
 * Bulk update all product series with image imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../src/data/products.ts');

let content = fs.readFileSync(productsFile, 'utf8');

// Mapping: seriesId -> array of [variantId, colorKey]
const mappings = {
  'hikaru': [
    ['hikaru-black', 'black'],
    ['hikaru-army', 'army'],
    ['hikaru-black-grey', 'black-grey'],
    ['hikaru-candy', 'candy'],
    ['hikaru-khaky', 'khaky'],
    ['hikaru-tan', 'tan'],
  ],
  'junko': [
    ['junko-army', 'army'],
    ['junko-black', 'black'],
    ['junko-navy', 'navy'],
    ['junko-pink-blue', 'pink-blue'],
    ['junko-tan', 'tan'],
  ],
  'kaiketsu': [
    ['kaiketsu-black', 'black'],
    ['kaiketsu-black-grey', 'black-grey'],
    ['kaiketsu-blue', 'blue'],
    ['kaiketsu-navy', 'navy'],
    ['kaiketsu-tan', 'tan'],
  ],
  'kanji': [
    ['kanji-army', 'army'],
    ['kanji-black', 'black'],
    ['kanji-navy', 'navy'],
    ['kanji-tan', 'tan'],
  ],
  'keiko': [
    ['keiko-army', 'army'],
    ['keiko-black', 'black'],
    ['keiko-brown', 'brown'],
    ['keiko-navy', 'navy'],
    ['keiko-tan', 'tan'],
  ],
  'orca': [
    ['orca-army', 'army'],
    ['orca-black', 'black'],
    ['orca-navy', 'navy'],
    ['orca-tan', 'tan'],
  ],
  'tadashi': [
    ['tadashi-black', 'black'],
    ['tadashi-camel', 'camel'],
    ['tadashi-navy', 'navy'],
  ],
  'yoshiro': [
    ['yoshiro-navy', 'navy'],
    ['yoshiro-army', 'army'],
    ['yoshiro-black', 'black'],
    ['yoshiro-camel', 'camel'],
  ],
  'yuki': [
    ['yuki-camel', 'camel'],
    ['yuki-black', 'black'],
    ['yuki-black-grey', 'black-grey'],
    ['yuki-candy', 'candy'],
    ['yuki-khaky', 'khaky'],
  ],
};

// Update each series
Object.entries(mappings).forEach(([seriesId, variants]) => {
  variants.forEach(([variantId, colorKey]) => {
    // Find and replace the images and featuredImage lines
    const pattern = new RegExp(
      `(id: '${variantId}',[\\s\\S]*?images: )\\[\\],([\\s\\S]*?featuredImage: )null as any,`,
      'g'
    );
    
    const replacement = `$1getColorVariantImages('${seriesId}', '${colorKey}'),$2getColorVariantImages('${seriesId}', '${colorKey}')[0] || null as any,`;
    
    content = content.replace(pattern, replacement);
  });
});

fs.writeFileSync(productsFile, content, 'utf8');
console.log('✅ Updated all product series with image imports');

