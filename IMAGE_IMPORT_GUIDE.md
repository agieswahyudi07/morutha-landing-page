# Image Import Guide - Quick Setup

## Overview

You have **10 product series** with multiple color variants each. This guide will help you quickly import all images.

## Product Series Structure

1. **Haruki** - 6 colors (Black, Camel, Black Grey, Candy, Khaky, Navy)
2. **Hikaru** - 6 colors (Black, Army, Black Grey, Candy, Khaky, Tan)
3. **Junko** - 5 colors (Army, Black, Navy, Pink-Blue, Tan)
4. **Kaiketsu** - 5 colors (Black, Black Grey, Blue, Navy, Tan)
5. **Kanji** - 4 colors (Army, Black, Navy, Tan)
6. **Keiko** - 5 colors (Army, Black, Brown, Navy, Tan)
7. **Orca** - 4 colors (Army, Black, Navy, Tan)
8. **Tadashi** - 3 colors (Black, Camel, Navy)
9. **Yoshiro** - 4 colors (Navy, Army, Black, Camel)
10. **Yuki** - 5 colors (Camel, Black, Black Grey, Candy, Khaky)

## Quick Import Template

Create a file `src/data/image-imports.ts` with this structure:

```typescript
// Model Images
import model1 from '../images/model/DSCF6137-W.jpg';
import model2 from '../images/model/DSCF6166-W.jpg';
import model3 from '../images/model/DSCF6178-W.jpg';
import model4 from '../images/model/DSCF6194-W.jpg';
import model5 from '../images/model/DSCF6198-W.jpg';
import model6 from '../images/model/DSCF6240-W.jpg';

// Haruki Series
import harukiBlack1 from '../images/products/haruki/2 Haruki Black/1.png';
import harukiBlack2 from '../images/products/haruki/2 Haruki Black/2.png';
// ... continue for all images

// Then export them in organized structure
export const modelImages = [model1, model2, model3, model4, model5, model6];

export const harukiImages = {
  black: [harukiBlack1, harukiBlack2, /* ... */],
  camel: [/* ... */],
  // ... etc
};
```

## Automated Approach (Recommended)

I can create a script that:
1. Scans all image folders
2. Generates import statements automatically
3. Updates the product data structure

Would you like me to create this automated script?

## Manual Approach

For each series, import the first image of the featured color:

```typescript
// Example for Haruki (featured color: black)
import harukiBlackFeatured from '../images/products/haruki/2 Haruki Black/1.png';

// Then in products.ts, update:
{
  id: 'haruki',
  // ...
  colorVariants: [
    {
      id: 'haruki-black',
      name: 'Black',
      color: 'black',
      images: [], // Can add more later
      featuredImage: harukiBlackFeatured,
    },
    // ...
  ],
}
```

## Model Images Setup

Update `src/data/models.ts`:

```typescript
import model1 from '../images/model/DSCF6137-W.jpg';
import model2 from '../images/model/DSCF6166-W.jpg';
// ... etc

export const MODEL_IMAGES: ModelImage[] = [
  {
    id: 'model-1',
    image: model1,
    alt: 'Child wearing Morutha sandals',
  },
  // ... etc
];
```

## Next Steps

1. **Option A**: I create an automated script to import all images
2. **Option B**: You manually import featured images (first image of each color)
3. **Option C**: Start with just a few series to test, then expand

Which approach would you prefer?

