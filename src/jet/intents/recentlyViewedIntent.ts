// src/jet/intents/recentlyViewedIntent.ts
import type { Product } from '../models/product';
import { writable } from 'svelte/store';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorage';

const RECENTLY_VIEWED_KEY = 'linkwithmentor_recently_viewed';
const MAX_RECENT_ITEMS = 10;

/**
 * Recently viewed products store with localStorage persistence.
 */
const initialRecent = getFromLocalStorage<Product[]>(RECENTLY_VIEWED_KEY, []);
export const recentlyViewedStore = writable<Product[]>(initialRecent);

// Persist to localStorage
recentlyViewedStore.subscribe((items: Product[]) => {
    setToLocalStorage(RECENTLY_VIEWED_KEY, items);
});

/**
 * Add a product to recently viewed list.
 * Moves to front if already exists, limits to MAX_RECENT_ITEMS.
 */
export function addToRecentlyViewed(product: Product): void {
    recentlyViewedStore.update((items: Product[]) => {
        // Remove if already exists
        const filtered = items.filter(p => p.id !== product.id);

        // Add to front
        const updated = [product, ...filtered];

        // Limit to max items
        return updated.slice(0, MAX_RECENT_ITEMS);
    });
}

/**
 * Clear all recently viewed products.
 */
export function clearRecentlyViewed(): void {
    recentlyViewedStore.set([]);
}
