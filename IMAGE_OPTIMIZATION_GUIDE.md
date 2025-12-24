# Image Optimization Guide for Morutha

## Quick Answer: **YES, compress/optimize first!**

For best performance, you should optimize your product images before adding them to the website.

## Recommended Settings

### Format
- **WebP** (best) - 30-50% smaller than JPEG
- **JPEG** (good) - If WebP not available
- **PNG** (only if transparency needed)

### Dimensions
- **Product Card Images**: 800x800px (square, 1:1 ratio)
- **Hero/Lifestyle Images**: 1200-1600px width
- Max file size: **200-300 KB per image**

### Quality
- **WebP**: 80-85% quality
- **JPEG**: 80-85% quality
- **PNG**: Use compression tools

## Tools for Optimization

### Free Online Tools
1. **Squoosh** (Google) - https://squoosh.app
   - Best for: Quick optimization
   - Drag & drop, adjust quality, download

2. **TinyPNG** - https://tinypng.com
   - Best for: Batch compression
   - Drag multiple images, download all

3. **ImageOptim** (Mac) / **FileOptimizer** (Windows)
   - Best for: Desktop batch processing

### Command Line (Advanced)
```bash
# Using cwebp (WebP converter)
cwebp -q 80 input.jpg -o output.webp

# Using ImageMagick
magick convert input.jpg -quality 85 -resize 800x800 output.jpg
```

## Workflow

1. **Resize** images to correct dimensions (800x800 for products)
2. **Compress** using one of the tools above
3. **Rename** with descriptive names: `dino-stompers-blue.webp`
4. **Place** in `public/images/products/`
5. **Update** `src/data/constants.ts` with new image paths

## Example

**Before**: `product-photo.jpg` (2.5 MB, 3000x3000px)
**After**: `product-photo.webp` (180 KB, 800x800px)

**Result**: 98% smaller file, faster loading! 🚀

## Current Setup

Right now, images are in `public/images/products/` and served as-is. This is fine, but:
- ✅ Works immediately
- ❌ No automatic optimization
- ❌ Larger file sizes = slower loading

**Recommendation**: Optimize before adding for best performance!

## Future Enhancement (Optional)

We could upgrade to use Astro's `<Image>` component for automatic optimization, but that requires:
- Moving images to `src/images/`
- Using imports instead of paths
- More setup complexity

For now, manual optimization is simpler and works great!

