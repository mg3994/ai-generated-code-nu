// src/jet/adapters/productAdapter.ts
import type { Product } from '../models/product';
import { makeProductId } from '../models/product';

export interface FakeStoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export function adaptProduct(fakeProduct: FakeStoreProduct): Product {
    return {
        id: makeProductId(fakeProduct.id.toString()),
        name: fakeProduct.title,
        description: fakeProduct.description,
        price: Math.round(fakeProduct.price * 100), // Convert to cents
        currency: 'USD',
        imageUrl: fakeProduct.image,
        category: fakeProduct.category,
    };
}
