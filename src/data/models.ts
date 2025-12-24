import type { ImageMetadata } from 'astro';
import { modelImages } from './image-imports';

// Model/Lifestyle images for hero and lifestyle sections
export interface ModelImage {
  id: string;
  image: ImageMetadata;
  alt: string;
}

export const MODEL_IMAGES: ModelImage[] = [
  {
    id: 'model-1',
    image: modelImages[0],
    alt: 'Child wearing Morutha sandals',
  },
  {
    id: 'model-2',
    image: modelImages[1],
    alt: 'Happy child in Morutha sandals',
  },
  {
    id: 'model-3',
    image: modelImages[2],
    alt: 'Morutha sandals lifestyle',
  },
  {
    id: 'model-4',
    image: modelImages[3],
    alt: 'Kids playing in Morutha sandals',
  },
  {
    id: 'model-5',
    image: modelImages[4],
    alt: 'Comfortable Morutha sandals',
  },
  {
    id: 'model-6',
    image: modelImages[5],
    alt: 'Morutha sandals for active kids',
  },
];

// Get random model image for hero
export function getRandomModelImage(): ModelImage {
  const randomIndex = Math.floor(Math.random() * MODEL_IMAGES.length);
  return MODEL_IMAGES[randomIndex];
}

// Get model images for lifestyle section
export function getLifestyleImages(count: number = 3): ModelImage[] {
  return MODEL_IMAGES.slice(0, count);
}

