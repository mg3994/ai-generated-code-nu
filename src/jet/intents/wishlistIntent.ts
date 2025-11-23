// src/jet/intents/wishlistIntent.ts
import type { Product } from '../models/product';
import { writable } from 'svelte/store';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/localStorage';

const WISHLIST_STORAGE_KEY = 'linkwithmentor_wishlist';

/**
 * Wishlist store with localStorage persistence.
 */
const initialWishlist = getFromLocalStorage<Product[]>(WISHLIST_STORAGE_KEY, []);
export const wishlistStore = writable<Product[]>(initialWishlist);

// Subscribe to wishlist changes and persist to localStorage
wishlistStore.subscribe((items: Product[]) => {
    setToLocalStorage(WISHLIST_STORAGE_KEY, items);
});

export function addToWishlist(product: Product): void {
    wishlistStore.update((items: Product[]) => {
        // Don't add duplicates
        if (items.find(p => p.id === product.id)) {
            return items;
        }
        return [...items, product];
    });
}

export function removeFromWishlist(productId: string): void {
    wishlistStore.update((items: Product[]) => items.filter((p: Product) => p.id !== productId));
}

export function isInWishlist(productId: string): boolean {
    let inWishlist = false;
    wishlistStore.subscribe((items: Product[]) => {
        inWishlist = items.some(p => p.id === productId);
    })();
    return inWishlist;
}

export function toggleWishlist(product: Product): boolean {
    let isAdded = false;
    wishlistStore.update((items: Product[]) => {
        const exists = items.find(p => p.id === product.id);
        if (exists) {
            isAdded = false;
            return items.filter(p => p.id !== product.id);
        } else {
            isAdded = true;
            return [...items, product];
        }
    });
    return isAdded;
}
