import { StaticImageData } from "next/image";

export interface FoodItem {
    name: string;
    category: string;
    rating: number;
    image: StaticImageData | string;
}

export interface Testimonial {
    id: number;
    quote: string;
    name: string;
    date: string;
    image: StaticImageData | string;
    foodItem: FoodItem;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "The food was so good, i recommend the Soto",
        name: "Anya G.",
        date: "February, 24",
        image: "/images/gallery/mel-elias-2_KjpNXFl5M-unsplash.jpg", // Pastikan import ini valid atau ganti string url
        foodItem: {
            name: "Soto Betawi Sedep",
            category: "Foods",
            rating: 4.5,
            image: "/images/gallery/rafly-alfaridzy-9JC5KK9amxA-unsplash.jpg", // Pastikan import ini valid atau ganti string url
        },
    },
    {
        id: 2,
        quote: "Best coffee in town! The atmosphere is amazing.",
        name: "Vicky Hladynets",
        date: "March, 10",
        image: "/images/gallery/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg", // Placeholder
        foodItem: {
            name: "Kopi Susu Gula Aren",
            category: "Beverages",
            rating: 5.0,
            image: "/images/gallery/nathan-dumlao-6VhPY27jdps-unsplash.jpg", // Placeholder
        },
    },
    {
        id: 3,
        quote: "Love the pastries here. Very fresh and tasty.",
        name: "Citra L.",
        date: "April, 05",
        image: "/images/gallery/noemi-macavei-katocz-or6mrFMVmHM-unsplash.jpg", // Placeholder
        foodItem: {
            name: "Croissant Butter",
            category: "Pastry",
            rating: 4.8,
            image: "/images/gallery/rj-trazona-7ATqt8Z-02Q-unsplash.jpg", // Placeholder
        },
    },
];