// src/jet/models/product.ts
/**
 * Branded type for ProductId to ensure type safety.
 */
export type ProductId = string & { readonly brand: unique symbol };

/**
 * Product domain entity.
 */
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    price: number; // in minor currency units (e.g., cents)
    currency: string; // ISO 4217 code, e.g., "USD"
    imageUrl?: string;
}

/**
 * Helper to create a branded ProductId.
 */
export const makeProductId = (raw: string): ProductId => raw as ProductId;
