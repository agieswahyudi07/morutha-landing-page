# Morutha Landing Page

A beautiful, lightweight landing page for Morutha Kids Footwear built with Astro and Tailwind CSS.

## Features

- ✅ **Lightweight**: Built with Astro (ships 0 KB JS by default)
- ✅ **Tailwind CSS**: Modern styling with utility classes
- ✅ **Animations**: Smooth hover effects and scroll animations
- ✅ **Image Optimization**: Ready for product images
- ✅ **Responsive**: Mobile-first design
- ✅ **Static Site**: Perfect for shared hosting

## Project Structure

```
morutha-landing-page/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Logo.astro
│   │   ├── Navigation.astro
│   │   └── ProductCard.astro
│   ├── data/            # Data constants
│   │   └── constants.ts
│   ├── pages/           # Pages
│   │   └── index.astro
│   ├── scripts/         # JavaScript utilities
│   │   └── scroll-animations.ts
│   └── styles/          # Global styles
│       └── global.css
└── public/
    └── images/          # Static images
        └── products/
```

## Development

```bash
# Install dependencies (if not already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Product Images

1. Place product images in `public/images/products/`
2. Update product data in `src/data/constants.ts`
3. Use relative paths: `/images/products/your-image.jpg`

## Customization

### Colors
- Primary Teal: `#00a8a8`
- Background Cream: `#F9F7F2`
- Accent Orange: `#FFE8D1`

### Fonts
- Body: Nunito (400, 600, 700, 800)
- Headings: Quicksand (500, 600, 700)

### Animations
- Hover effects: Built with Tailwind classes
- Scroll animations: Intersection Observer (in `scroll-animations.ts`)

## Deployment

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload `dist/` folder contents to your shared hosting's `public_html` or `www` directory

3. Done! Your static site is live.

## Notes

- All external links (Shopee, WhatsApp) can be updated in `src/pages/index.astro`
- Product data is in `src/data/constants.ts` - easy to update
- Images are optimized automatically by Astro
- The site is fully static - no server needed!
