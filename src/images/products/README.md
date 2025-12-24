# Product Images Folder

Upload your product images here!

## Instructions

1. **Upload images** to this folder (`src/images/products/`)
2. **Format**: WebP, JPEG, or PNG (WebP recommended)
3. **Naming**: Use descriptive names like `dino-stompers-blue.webp`
4. **Size**: Any size - Astro will optimize automatically!

## Example Structure

```
products/
├── dino-stompers.webp
├── princess-sparkle.webp
├── sunny-days.webp
└── urban-explorer.webp
```

## After Uploading

Update `src/data/constants.ts` to import and use your images:

```typescript
import dinoStompers from '../images/products/dino-stompers.webp';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dino Stompers',
    image: dinoStompers, // Use imported image
    // ...
  },
];
```

See `IMAGE_UPLOAD_INSTRUCTIONS.md` in the root folder for detailed instructions.

