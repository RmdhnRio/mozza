// app/components/site/shop/shop-types.ts
/**
 * Metadata untuk featured collections scheduling
 * Setiap produk bisa dijadwalkan tampil di featured pada tanggal tertentu
 */
export interface FeaturedCollectionMeta {
    /** Tanggal mulai tampil di featured (format: YYYY-MM-DD) */
    startDate: string
    /** Tanggal akhir tampil di featured (format: YYYY-MM-DD) */
    endDate: string
    /** Label badge untuk featured (e.g., "#1 most purchased") */
    badgeLabel?: string;
    /** Info penjualan (e.g., "5K+ Sold in a month") */
    soldInfo?: string;
}

/**
 * Metadata untuk Flash Sale
 */
export interface FlashSaleMeta {
    /** Timestamp akhir flash sale (ISO string) */
    endTime: string;
    /** Gambar carousel untuk flash sale (multiple images) */
    carouselImages?: string[];
}

/**
 * Interface untuk Promo Voucher Banner
 */
export interface PromoVoucher {
    id: string;
    /** Judul promo */
    title: string;
    /** Kode voucher */
    code: string;
    /** Gambar background/ilustrasi */
    image?: string;
}

/**
 * Kategori produk untuk filter
 */
export type ProductCategory =
    | 'all'
    | 'promo'
    | 'snack'
    | 'toys'
    | 'dog food'
    | 'cat food';

/**
 * Interface utama untuk Shop Product
 */
export interface ShopProduct {
    /** ID unik produk */
    id: string;
    /** Path gambar produk */
    coverImage: string;
    /** Nama produk */
    title: string;
    /** Deskripsi singkat produk */
    description: string;
    /** Harga asli (sebelum diskon) */
    originalPrice?: number;
    /** Harga jual */
    price: number;
    /** Kategori produk */
    category: ProductCategory;
    /** Rating produk (0-5) */
    rating?: number;
    /** Jumlah review */
    reviewCount?: number;
    /** Metadata untuk featured collections (opsional) */
    featuredMeta?: FeaturedCollectionMeta;
    /** Apakah sedang promo/flash sale */
    isPromo?: boolean;
    /** Label promo (e.g., "SAVE 15%") */
    promoLabel?: string;
    /** Stock tersedia */
    stock?: number;
    /** Metadata untuk flash sale (opsional) */
    flashSaleMeta?: FlashSaleMeta;
}