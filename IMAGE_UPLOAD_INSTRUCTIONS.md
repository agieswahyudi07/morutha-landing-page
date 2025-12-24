# Image Upload Instructions

## ✅ Step 1: Implement Astro Image Optimization (DONE)

The code is now set up to use Astro's automatic image optimization!

## 📁 Step 2: Upload Your Product Images

### Where to Put Images

**Location**: `src/images/products/`

```
morutha-landing-page/
└── src/
    └── images/
        └── products/
            ├── dino-stompers.webp
            ├── princess-sparkle.webp
            ├── sunny-days.webp
            └── urban-explorer.webp
```

### Image Requirements

- **Format**: WebP, JPEG, or PNG (WebP recommended)
- **Size**: Any size (Astro will optimize automatically!)
- **Ratio**: Square (1:1) works best for product cards
- **Naming**: Use descriptive names with hyphens: `dino-stompers-blue.webp`

**Note**: You DON'T need to compress/resize manually! Astro will do it automatically.

## 🔧 Step 3: Update Constants File

After uploading images, update `src/data/constants.ts`:

### Option A: Using Local Images (Recommended)

```typescript
// 1. Import images at the top
import dinoStompers from '../images/products/dino-stompers.webp';
import princessSparkle from '../images/products/princess-sparkle.webp';
import sunnyDays from '../images/products/sunny-days.webp';
import urbanExplorer from '../images/products/urban-explorer.webp';

// 2. Update PRODUCTS array
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dino Stompers',
    description: 'Durable & Rugged for active play',
    price: 189000,
    image: dinoStompers, // Use imported image
  },
  {
    id: '2',
    name: 'Princess Sparkle',
    description: 'Soft materials with a touch of magic',
    price: 199000,
    image: princessSparkle,
    tag: 'BEST SELLER',
  },
  // ... etc
];
```

### Option B: Keep External URLs (Temporary)

If you want to keep using external URLs temporarily, that's fine! The code supports both:
- External URLs (like Shopee images) - no optimization
- Local images (imported) - automatic optimization

## 🚀 Step 4: Build and Test

```bash
# Build the site
npm run build

# Astro will automatically:
# ✅ Convert images to WebP/AVIF
# ✅ Generate multiple sizes
# ✅ Optimize file sizes
# ✅ Add lazy loading
```

## 📊 What You Get

**Before** (Manual):
- 2.5 MB image → manually compress → 200 KB
- Time: 3-5 minutes per image

**After** (Astro Automatic):
- 2.5 MB image → Astro optimizes → 150-200 KB
- Time: Just upload and import!

## 💡 Tips

1. **Start with a few images** to test the workflow
2. **Use descriptive filenames**: `product-name-color.webp`
3. **Keep original images** in a backup folder (just in case)
4. **Check the build output** in `dist/_astro/` to see optimized images

## 🎯 Quick Checklist

- [ ] Upload images to `src/images/products/`
- [ ] Import images in `src/data/constants.ts`
- [ ] Update PRODUCTS array with imported images
- [ ] Run `npm run build` to see optimization in action
- [ ] Check `dist/` folder for optimized images

That's it! Astro handles the rest automatically. 🎉

