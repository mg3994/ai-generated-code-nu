// src/jet/intents/searchIntent.ts
import type { Product } from "../models/product";
import { makeProductId } from "../models/product";
// import { apiGet } from "../dependencies/net";
// import { defaultConfig } from "../dependencies/bag";

/**
 * Service that performs product search.
 * Returns a list of products matching the query.
 */
export async function searchProducts(query: string): Promise<Product[]> {
    // Mock data for development
    const mockProducts: Product[] = [
        {
            id: makeProductId('1'),
            name: 'Svelte T-Shirt',
            description: 'A cool t-shirt with the Svelte logo.',
            price: 2500,
            currency: 'USD',
            imageUrl: 'https://via.placeholder.com/300x200?text=Svelte+T-Shirt'
        },
        {
            id: makeProductId('2'),
            name: 'TypeScript Mug',
            description: 'Enjoy your coffee with type safety.',
            price: 1500,
            currency: 'USD',
            imageUrl: 'https://via.placeholder.com/300x200?text=TypeScript+Mug'
        },
        {
            id: makeProductId('3'),
            name: 'Vite Sticker Pack',
            description: 'Fast stickers for fast developers.',
            price: 500,
            currency: 'USD',
            imageUrl: 'https://via.placeholder.com/300x200?text=Vite+Stickers'
        }
    ];

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!query) return mockProducts;

    return mockProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );

    // const url = `${defaultConfig.apiBase}/search?term=${encodeURIComponent(query)}`;
    // return apiGet<Product[]>(url);
}
