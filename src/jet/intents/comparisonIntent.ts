// src/jet/intents/comparisonIntent.ts
import type { Product } from '../models/product';
import { writable } from 'svelte/store';

const MAX_COMPARE_ITEMS = 4;

/**
 * Product comparison store (session-only, no persistence).
 */
export const comparisonStore = writable<Product[]>([]);

/**
 * Add product to comparison list.
 * Returns true if added, false if limit reached.
 */
export function addToComparison(product: Product): boolean {
    let added = false;

    comparisonStore.update((items: Product[]) => {
        // Don't add duplicates
        if (items.find(p => p.id === product.id)) {
            return items;
        }

        // Check limit
        if (items.length >= MAX_COMPARE_ITEMS) {
            added = false;
            return items;
        }

        added = true;
        return [...items, product];
    });

    return added;
}

/**
 * Remove product from comparison list.
 */
export function removeFromComparison(productId: string): void {
    comparisonStore.update((items: Product[]) =>
        items.filter(p => p.id !== productId)
    );
}

/**
 * Clear all comparison products.
 */
export function clearComparison(): void {
    comparisonStore.set([]);
}

/**
 * Check if product is in comparison list.
 */
export function isInComparison(productId: string): boolean {
    let inComparison = false;
    comparisonStore.subscribe((items: Product[]) => {
        inComparison = items.some(p => p.id === productId);
    })();
    return inComparison;
}
