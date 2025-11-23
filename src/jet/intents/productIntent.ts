// src/jet/intents/productIntent.ts
import { apiGet } from '../dependencies/net';
import { defaultConfig } from '../dependencies/bag';
import { adaptProduct, type FakeStoreProduct } from '../adapters/productAdapter';
import type { Product } from '../models/product';

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const url = `${defaultConfig.apiBase}/products/${id}`;
        const fakeProduct = await apiGet<FakeStoreProduct>(url);
        return adaptProduct(fakeProduct);
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}
