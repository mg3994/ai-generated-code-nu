// src/jet/intents/searchIntent.ts
import type { Product } from "../models/product";
import { apiGet } from "../dependencies/net";
import { defaultConfig } from "../dependencies/bag";
import { adaptProduct, type FakeStoreProduct } from "../adapters/productAdapter";

/**
 * Service that performs product search.
 * Returns a list of products matching the query.
 */
export async function searchProducts(query: string): Promise<Product[]> {
    try {
        const url = `${defaultConfig.apiBase}/products`;
        const fakeProducts = await apiGet<FakeStoreProduct[]>(url);
        const products = fakeProducts.map(adaptProduct);

        if (!query) return products;

        return products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error('Search failed:', error);
        return [];
    }
}
