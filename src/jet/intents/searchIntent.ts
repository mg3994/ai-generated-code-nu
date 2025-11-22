// src/jet/intents/searchIntent.ts
import type { Product } from "../models/product";
import { apiGet } from "../dependencies/net";
import { defaultConfig } from "../dependencies/bag";

/**
 * Service that performs product search.
 * Returns a list of products matching the query.
 */
export async function searchProducts(query: string): Promise<Product[]> {
    const url = `${defaultConfig.apiBase}/search?term=${encodeURIComponent(query)}`;
    return apiGet<Product[]>(url);
}
