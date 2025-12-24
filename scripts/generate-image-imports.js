/**
 * Script to automatically generate image imports for all products and models
 * Run with: node scripts/generate-image-imports.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OUTPUT_FILE = path.join(__dirname, '../src/data/image-imports.ts');

// Get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      // Only include image files
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

// Generate import name from file path
function generateImportName(filePath) {
  const relativePath = path.relative(IMAGES_DIR, filePath);
  const name = relativePath
    .replace(/\\/g, '/')
    .replace(/\//g, '_')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
  return name;
}

// Generate TypeScript imports
function generateImports() {
  const allFiles = getAllFiles(IMAGES_DIR);
  
  let imports = `// Auto-generated image imports
// Generated on: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run: node scripts/generate-image-imports.js

`;

  // Model images
  const modelFiles = allFiles.filter(f => f.includes('model'));
  imports += '// Model Images\n';
  modelFiles.forEach((file) => {
    const importName = generateImportName(file);
    const relativePath = path.relative(path.join(__dirname, '../src'), file).replace(/\\/g, '/');
    imports += `import ${importName} from '${relativePath}';\n`;
  });

  imports += '\n// Product Images\n';
  
  // Product images by series
  const productFiles = allFiles.filter(f => f.includes('products'));
  const seriesMap = {};

  productFiles.forEach((file) => {
    const parts = path.relative(IMAGES_DIR, file).split(path.sep);
    if (parts.length >= 3) {
      const series = parts[1]; // e.g., 'haruki'
      const color = parts[2]; // e.g., '2 Haruki Black'
      
      if (!seriesMap[series]) {
        seriesMap[series] = {};
      }
      if (!seriesMap[series][color]) {
        seriesMap[series][color] = [];
      }
      
      const importName = generateImportName(file);
      const relativePath = path.relative(path.join(__dirname, '../src'), file).replace(/\\/g, '/');
      seriesMap[series][color].push({ importName, relativePath });
    }
  });

  // Generate imports for products
  Object.keys(seriesMap).forEach((series) => {
    Object.keys(seriesMap[series]).forEach((color) => {
      seriesMap[series][color].forEach(({ importName, relativePath }) => {
        imports += `import ${importName} from '${relativePath}';\n`;
      });
    });
  });

  // Generate exports
  imports += '\n// Exports\n';
  imports += 'export const modelImages = [\n';
  modelFiles.forEach((file) => {
    const importName = generateImportName(file);
    imports += `  ${importName},\n`;
  });
  imports += '];\n\n';

  imports += 'export const productImages = {\n';
  Object.keys(seriesMap).forEach((series) => {
    imports += `  ${series}: {\n`;
    Object.keys(seriesMap[series]).forEach((color) => {
      const cleanColor = color.replace(/^\d+\s*/, '').replace(/\s+/g, '_').toLowerCase();
      imports += `    '${cleanColor}': [\n`;
      seriesMap[series][color].forEach(({ importName }) => {
        imports += `      ${importName},\n`;
      });
      imports += `    ],\n`;
    });
    imports += `  },\n`;
  });
  imports += '};\n';

  return imports;
}

// Write to file
try {
  const content = generateImports();
  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.log(`✅ Generated image imports: ${OUTPUT_FILE}`);
  console.log(`📦 Found ${getAllFiles(IMAGES_DIR).length} image files`);
} catch (error) {
  console.error('❌ Error generating imports:', error);
  process.exit(1);
}

