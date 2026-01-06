// app/shop/page.tsx
import React from 'react';
import Navbar from '@/app/components/site/landing/Navbar';
import { FeaturedCollections, AvailableProducts, CartProvider, FloatingCart } from '@/app/components/site/shop';
import Footer from '@/app/components/site/landing/Footer';

export default function ShopPage() {
    return (
        <CartProvider>
            <main className="min-h-screen bg-white">
                {/* Navbar - dark variant untuk background putih */}
                <Navbar variant="dark" />
                {/* Spacer untuk navbar fixed */}
                <div className="h-24" />
                {/* Featured Collections Section */}
                <FeaturedCollections />
                {/* Available Products Section */}
                <AvailableProducts />
                {/* Footer */}
                <Footer />
                {/* Floating Cart */}
                <FloatingCart />
            </main>
        </CartProvider>

    );
}