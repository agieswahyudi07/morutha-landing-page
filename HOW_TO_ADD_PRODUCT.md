# Panduan Menambahkan Produk Baru

## Langkah-langkah Menambahkan Produk Baru (Contoh: Kaos)

### 1. Siapkan Folder dan Gambar

Buat folder untuk produk baru di `src/images/products/` dengan struktur:

```
src/images/products/
  └── kaos-morutha-1/          ← ID produk (lowercase, dengan dash)
      ├── white/                ← Nama warna (lowercase)
      │   ├── 1.jpg
      │   ├── 2.jpg
      │   ├── 3.jpg
      │   └── ...
      ├── black/
      │   ├── 1.jpg
      │   └── ...
      └── navy/
          ├── 1.jpg
          └── ...
```

**Catatan:**
- Nama folder series: gunakan lowercase, dengan dash (contoh: `kaos-morutha-1`)
- Nama folder warna: gunakan lowercase (contoh: `white`, `black`, `navy`)
- Format gambar: `.jpg`, `.jpeg`, `.png`, atau `.webp`

### 2. Generate Image Imports

Jalankan script untuk generate image imports otomatis:

```bash
cd morutha-landing-page
node scripts/generate-image-imports.js
```

Script ini akan:
- Scan semua folder di `src/images/products/`
- Generate import statements di `src/data/image-imports.ts`
- Otomatis mapping berdasarkan nama folder

### 3. Tambahkan Data Produk

Buka `src/data/products.ts` dan tambahkan produk baru di array `PRODUCT_SERIES`:

```typescript
{
  id: 'kaos-morutha-1',                    // ← ID unik (harus sama dengan nama folder)
  name: 'Kaos Morutha Classic',            // ← Nama produk
  description: 'Kaos nyaman untuk aktivitas sehari-hari',  // ← Deskripsi
  category: 'kaos',                        // ← Kategori: 'sandal' | 'sepatu' | 'kaos' | 'pakaian' | 'aksesoris'
  price: 89000,                            // ← Harga (dalam rupiah)
  featuredColor: 'white',                  // ← Warna yang ditampilkan pertama kali
  colorVariants: [
    {
      id: 'kaos-morutha-1-white',          // ← ID: {seriesId}-{colorName}
      name: 'White',                        // ← Nama warna
      color: 'white',                       // ← Color key (untuk color dot)
      images: getColorVariantImages('kaos-morutha-1', 'white'),  // ← Auto dari image-imports
      featuredImage: getColorVariantImages('kaos-morutha-1', 'white')[0] || null as any,
    },
    {
      id: 'kaos-morutha-1-black',
      name: 'Black',
      color: 'black',
      images: getColorVariantImages('kaos-morutha-1', 'black'),
      featuredImage: getColorVariantImages('kaos-morutha-1', 'black')[0] || null as any,
    },
    {
      id: 'kaos-morutha-1-navy',
      name: 'Navy',
      color: 'navy',
      images: getColorVariantImages('kaos-morutha-1', 'navy'),
      featuredImage: getColorVariantImages('kaos-morutha-1', 'navy')[0] || null as any,
    },
  ],
},
```

### 4. Contoh Lengkap

Berikut contoh lengkap untuk menambahkan kaos:

```typescript
// Di src/data/products.ts, tambahkan di array PRODUCT_SERIES:

{
  id: 'kaos-morutha-1',
  name: 'Kaos Morutha Classic',
  description: 'Kaos nyaman untuk aktivitas sehari-hari',
  category: 'kaos',
  price: 89000,
  featuredColor: 'white',
  tag: 'NEW',  // Optional: 'TERLARIS', 'NEW', dll
  colorVariants: [
    {
      id: 'kaos-morutha-1-white',
      name: 'White',
      color: 'white',
      images: getColorVariantImages('kaos-morutha-1', 'white'),
      featuredImage: getColorVariantImages('kaos-morutha-1', 'white')[0] || null as any,
    },
    {
      id: 'kaos-morutha-1-black',
      name: 'Black',
      color: 'black',
      images: getColorVariantImages('kaos-morutha-1', 'black'),
      featuredImage: getColorVariantImages('kaos-morutha-1', 'black')[0] || null as any,
    },
  ],
},
```

### 5. Tips Penting

1. **ID harus unik**: Pastikan `id` produk tidak sama dengan produk lain
2. **Nama folder = ID produk**: Nama folder harus sama dengan `id` produk
3. **Color key**: Gunakan color key yang sudah ada di `getColorValue()` di `ProductSeriesCard.astro`:
   - `black`, `navy`, `army`, `green`, `tan`, `camel`, `khaki`, `grey`, `pink`, `blue`, `brown`, `white`
4. **Generate ulang imports**: Setelah menambah gambar, jalankan `generate-image-imports.js` lagi
5. **Urutan produk**: Produk baru akan muncul di akhir list (atau bisa diatur urutannya)

### 6. Verifikasi

Setelah menambahkan produk:
1. ✅ Pastikan folder gambar sudah ada
2. ✅ Jalankan `generate-image-imports.js`
3. ✅ Tambahkan data di `PRODUCT_SERIES`
4. ✅ Build dan test: `npm run build` atau `npm run dev`

### 7. Kategori yang Tersedia

- `'sandal'` - Sandal anak
- `'sepatu'` - Sepatu anak  
- `'kaos'` - Kaos/T-shirt
- `'pakaian'` - Pakaian lainnya
- `'aksesoris'` - Aksesoris

---

**Contoh Quick Start untuk Kaos:**

1. Buat folder: `src/images/products/kaos-morutha-1/white/` dan masukkan gambar
2. Run: `node scripts/generate-image-imports.js`
3. Copy-paste contoh code di atas ke `PRODUCT_SERIES`
4. Done! 🎉

