import type { ImageMetadata } from 'astro';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | ImageMetadata;
  tag?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TrustItem {
  id: string;
  iconName: string;
  text: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dino Stompers',
    description: 'Durable & Rugged for active play',
    price: 189000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7qukw-lht69pq989h0be@resize_w900_nl.webp',
  },
  {
    id: '2',
    name: 'Princess Sparkle',
    description: 'Soft materials with a touch of magic',
    price: 199000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7qukw-lht69pq989h0be@resize_w900_nl.webp',
    tag: 'BEST SELLER',
  },
  {
    id: '3',
    name: 'Sunny Days',
    description: 'Perfect for beach walks and sunshine',
    price: 175000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7qukw-lht69pq989h0be@resize_w900_nl.webp',
  },
  {
    id: '4',
    name: 'Urban Explorer',
    description: 'Clean style for city adventures',
    price: 210000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7qukw-lht69pq989h0be@resize_w900_nl.webp',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'Desain Ramah Anak',
    description: 'Dirancang dengan ujung yang membulat dan bahan lembut untuk mencegah lecet dan tersandung.',
    iconName: 'smile',
    iconColor: 'text-blue-400',
  },
  {
    id: 'f2',
    title: 'Dukungan Ortopedi',
    description: 'Dukungan lengkung kaki dan sol empuk untuk mendukung perkembangan kaki yang sehat.',
    iconName: 'footprints',
    iconColor: 'text-teal-400',
  },
  {
    id: 'f3',
    title: 'Gaya Menyenangkan',
    description: 'Warna dan pola yang memicu kegembiraan dan imajinasi di setiap benak kecil.',
    iconName: 'palette',
    iconColor: 'text-orange-400',
  },
];

export const VALUE_PROPS: ValueProp[] = [
  {
    id: 'v1',
    title: 'Bahan Non-Toksik',
    description: 'Kami hanya menggunakan bahan yang aman untuk anak dan tersertifikasi, bebas dari bahan kimia berbahaya. Aman untuk kulit sensitif.',
    iconName: 'flask-conical',
  },
  {
    id: 'v2',
    title: 'Desain Mudah Dipakai',
    description: 'Tali velcro dan bukaan yang fleksibel memudahkan balita belajar memakai sepatu sendiri.',
    iconName: 'zap',
  },
  {
    id: 'v3',
    title: 'Tahan Lama',
    description: 'Jahitan yang diperkuat dan sol berkualitas tinggi memastikan sandal kami bertahan dari aktivitas bermain yang paling aktif.',
    iconName: 'clock',
  },
];

export const TRUST_BAR: TrustItem[] = [
  { id: 't1', iconName: 'shield-check', text: 'Tersertifikasi Aman' },
  { id: 't2', iconName: 'leaf', text: 'Ramah Lingkungan' },
  { id: 't3', iconName: 'truck', text: 'Pengiriman Cepat' },
  { id: 't4', iconName: 'award', text: '100% Original' },
];

