// app/components/site/shop/shop-product-data.ts
import { ShopProduct, PromoVoucher } from "./shop-types";

/**
 * Helper function untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
 */
export const getTodayDateString = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

/**
 * Dummy data untuk shop products
 * Produk dengan featuredMeta akan tampil di Featured Collections
 * berdasarkan range tanggal startDate - endDate
 */
export const shopProducts: ShopProduct[] = [
    // === FEATURED PRODUCTS (akan tampil di carousel hari ini) ===
    {
        id: 'prod-001',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Premium toys and treats bundle specially curated for Shiba Inu lovers',
        price: 89000,
        category: 'toys',
        rating: 4.8,
        reviewCount: 245,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    {
        id: 'prod-002',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Deluxe toy collection with premium organic treats',
        price: 125000,
        category: 'toys',
        rating: 4.7,
        reviewCount: 189,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    {
        id: 'prod-003',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Interactive puzzle toys with reward treats',
        price: 156000,
        category: 'toys',
        rating: 4.9,
        reviewCount: 312,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    {
        id: 'prod-004',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Complete starter kit for new Shiba owners',
        price: 199000,
        category: 'toys',
        rating: 4.6,
        reviewCount: 156,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    {
        id: 'prod-005',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Premium chew toys collection for active dogs',
        price: 78000,
        category: 'toys',
        rating: 4.5,
        reviewCount: 98,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    {
        id: 'prod-006',
        coverImage: '/images/shop/product-1.png',
        title: 'Shiba Inu Toys and Treats',
        description: 'Seasonal limited edition treats bundle',
        price: 145000,
        category: 'toys',
        rating: 4.8,
        reviewCount: 203,
        featuredMeta: {
            startDate: '2026-01-01',
            endDate: '2026-01-07',
            badgeLabel: '#1 most purchased',
            soldInfo: '5K+ Sold in a month'
        }
    },
    // === REGULAR PRODUCTS (tidak tampil di featured) ===
    {
        id: 'prod-007',
        coverImage: '/images/shop/product-3.png',
        title: 'Bone chew toy for dogs',
        description: 'Regular dog bone chew toy',
        price: 36000,
        category: 'toys',
        rating: 4.5,
        reviewCount: 127
    },
    {
        id: 'prod-008',
        coverImage: '/images/shop/cat-snack.png',
        title: 'Jajanan kucing premium',
        description: 'Premium cat snacks',
        price: 36000,
        category: 'snack',
        rating: 4.3,
        reviewCount: 89
    },
    {
        id: 'prod-009',
        coverImage: '/images/shop/pet-food.png',
        title: 'Pet food',
        description: 'Nutritious pet food',
        price: 36000,
        category: 'dog food',
        rating: 4.6,
        reviewCount: 234
    },
    {
        id: 'prod-010',
        coverImage: '/images/shop/flash-sale-item.png',
        title: 'Judul Product Flash Sale bombastis!',
        description: 'Limited time flash sale item',
        originalPrice: 30000,
        price: 20000,
        category: 'promo',
        rating: 4.2,
        reviewCount: 567,
        isPromo: true,
        promoLabel: 'SAVE 33%',
        flashSaleMeta: {
            endTime: '2026-01-06T23:59:59+07:00', // Set to end of today
            carouselImages: [
                '/images/shop/goon-shampoo.png',
                '/images/shop/flash-sale-item-2.png',
                '/images/shop/flash-sale-item-3.png',
            ]
        }
    },
    {
        id: 'prod-011',
        coverImage: '/images/shop/premium-dog-collar.png',
        title: 'Premium Dog Collar',
        description: 'Adjustable leather dog collar',
        price: 45000,
        category: 'toys',
        rating: 4.4,
        reviewCount: 156
    },
    {
        id: 'prod-012',
        coverImage: '/images/shop/cat-scratching-post.png',
        title: 'Cat Scratching Post',
        description: 'Durable sisal scratching post',
        price: 125000,
        category: 'toys',
        rating: 4.6,
        reviewCount: 89
    },
    {
        id: 'prod-013',
        coverImage: '/images/shop/unicorn-cat-shampoo.png',
        title: 'Pet Shampoo Organic',
        description: 'Natural organic pet shampoo',
        price: 55000,
        category: 'snack',
        rating: 4.3,
        reviewCount: 234
    },
];

// Promo Vouchers Data
export const promoVouchers: PromoVoucher[] = [
    {
        id: 'voucher-1',
        title: 'Get 15% off your first toys order!',
        code: 'PLAYTIME',
        image: '/images/shop/various.png'
    },
    {
        id: 'voucher-2',
        title: 'Free shipping on orders above Rp. 100.000',
        code: 'FREESHIP',
        image: '/images/shop/goon-shampoo.png'
    },
    {
        id: 'voucher-3',
        title: 'Buy 2 Get 1 Free on all snacks!',
        code: 'SNACK3X',
        image: '/images/shop/cat-snack.png'
    }
];

/**
 * Filter produk yang tampil di Featured Collections berdasarkan tanggal hari ini
 * @returns Array of products yang memiliki featuredMeta valid untuk hari ini
 */
export const getFeaturedProducts = (): ShopProduct[] => {
    const today = getTodayDateString();

    return shopProducts.filter(product => {
        if (!product.featuredMeta) return false;

        const { startDate, endDate } = product.featuredMeta;
        return today >= startDate && today <= endDate;
    });
}

/**
 * Filter produk berdasarkan kategori
 * @param category - Kategori yang ingin difilter
 * @returns Array of products yang sesuai kategori
 */
export const getProductsByCategory = (category: string): ShopProduct[] => {
    if (category === 'all') return shopProducts;
    return shopProducts.filter(product => product.category === category);
};

/**
 * Get current flash sale product
 */
export const getFlashSaleProduct = (): ShopProduct | null => {
    const now = new Date();
    return shopProducts.find(product => {
        if (!product.flashSaleMeta) return false;
        const endTime = new Date(product.flashSaleMeta.endTime);
        return endTime > now;
    }) || null;
};

/**
 * Get regular products (non-featured, non-flash-sale)
 */
export const getRegularProducts = (): ShopProduct[] => {
    return shopProducts.filter(product =>
        !product.featuredMeta && !product.flashSaleMeta
    );
};


/**
 * Search products by title
 */
export const searchProducts = (query: string, category: string = 'all'): ShopProduct[] => {
    let filtered = shopProducts;

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
    }

    return filtered;
};


