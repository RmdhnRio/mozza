// app/components/site/shop/AvailableProducts.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { ShopSearchFilter } from './ShopSearchFilter';
import { FlashSaleCard } from './FlashSaleCard';
import { ShopProductCard } from './ShopProductCard';
import { PromoBannerCarousel } from './PromoBannerCarousel';
import { getFlashSaleProduct, searchProducts } from './shop-product-data';
import { ShopProduct } from './shop-types';

interface AvailableProductsProps {
    className?: string;
}

export const AvailableProducts: React.FC<AvailableProductsProps> = ({
    className = ''
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const flashSaleProduct = getFlashSaleProduct();

    const filteredProducts = useMemo(() => {
        return searchProducts(searchQuery, activeCategory).filter(
            p => !p.flashSaleMeta
        );
    }, [searchQuery, activeCategory]);

    // Jika ada flash sale: 3 products, jika tidak: 4 products
    const topRowProducts = flashSaleProduct
        ? filteredProducts.slice(0, 3)
        : filteredProducts.slice(0, 4);
    const remainingProducts = flashSaleProduct
        ? filteredProducts.slice(3)
        : filteredProducts.slice(4);

    const handleSearch = (query: string) => setSearchQuery(query);
    const handleCategoryChange = (categoryId: string) => setActiveCategory(categoryId);
    const handleAddToCart = (product: ShopProduct) => {
        console.log('Add to cart:', product);
    };

    return (
        <section className={`w-full py-12 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <h2 className="font-plein font-bold text-2xl md:text-3xl text-gray-900 mb-6">
                    Available Products
                </h2>

                <ShopSearchFilter
                    onSearch={handleSearch}
                    onCategoryChange={handleCategoryChange}
                    className="mb-8"
                />

                {/* === Top Section (Flash Sale + Products + Banner) === */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {/* Flash Sale - Col 1, Spans 2 rows (hanya jika ada) */}
                    {flashSaleProduct && (
                        <div className="md:row-span-2">
                            <FlashSaleCard
                                product={flashSaleProduct}
                                className="h-full"
                            />
                        </div>
                    )}

                    {/* Product Cards - Row 1 (3 atau 4 cards) */}
                    {topRowProducts.map((product) => (
                        <ShopProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            size="small"
                        />
                    ))}

                    {/* Promo Banner - Row 2 (col-span-3 atau col-span-4) */}
                    <div className={flashSaleProduct ? "md:col-span-3" : "md:col-span-4"}>
                        <PromoBannerCarousel />
                    </div>
                </div>

                {/* === Regular Products Grid === */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {remainingProducts.map((product) => (
                        <ShopProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="font-switzer text-gray-500">
                            No products found for "{searchQuery}"
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableProducts;